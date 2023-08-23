import showMainPage from '../pages/main/mainView';
import showErrorPage from '../pages/error/error';
import { categoriesData } from '../components/mainContent/Categories/categoriesTypes';
import { OpacityParam } from '../types/types';
import { createElement } from '../utils/elementCreator';
import { showAuthPage } from '../pages/login/authView';
import { showRegPage } from '../pages/registration/regView';

const Routes = {
  '/': showMainPage,
  '/login': showAuthPage,
  '/register': showRegPage,
  '404': showErrorPage,
};

let pageUrl = '/';
let activePage = Routes[pageUrl];
let currentWrapper: HTMLElement;

export const onNavigate = (pathname: string): void => {
  let currentUrl = window.location.origin;
  if (categoriesData.find((category) => category.href === `/${pathname}`)?.href) {
    currentUrl += `/catalog/${pathname}`;
  } else if (pathname === pageUrl) {
    currentUrl = pathname;
  } else {
    currentUrl += `/${pathname}`;
  }
  window.history.pushState({}, pathname, `${currentUrl}`);
};

export const RenderPage = (): void => {
  currentWrapper.innerHTML = '';
  const background = createElement(OpacityParam, currentWrapper);
  currentWrapper.prepend(background);
  pageUrl = `/${window.location.pathname.split('/').slice(-1)}`;
  activePage = Routes[pageUrl] || Routes['404'];
  activePage(currentWrapper);
};

export function addEventListener(): void {
  const links = document.querySelectorAll('a');
  links.forEach((el) => {
    if (el.id) {
      const pathname = el.id;
      if (pathname)
        el.addEventListener('click', (event) => {
          event.preventDefault();
          onNavigate(pathname);
          RenderPage();
          addEventListener();
        });
    }
  });
}

export const initRouter = (wrapper: HTMLElement): void => {
  currentWrapper = wrapper;
  window.onpopstate = (): void => {
    RenderPage();
  };
  RenderPage();
  addEventListener();
};

export const redirect = (): void => {
  pageUrl = '/';
  onNavigate(pageUrl);
  RenderPage();
  addEventListener();
};
