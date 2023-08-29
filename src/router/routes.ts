import showMainPage from '../pages/main/mainView';
import showErrorPage from '../pages/error/error';
// import { categoriesData } from '../api/getCatalog';
import { OpacityParam } from '../types/types';
import { createElement } from '../utils/elementCreator';
import { showAuthPage } from '../pages/login/authView';
import { showRegPage } from '../pages/registration/regView';
import showCatalogPage from '../pages/catalog/catalogView';

import { categoryPathes } from '../components/Categories/categoryCard';
import { getCategoriesList } from '../api/getCatalog';
import { Category } from '@commercetools/platform-sdk';



const Routes = {
  '/': showMainPage,
  '/login': showAuthPage,
  '/register': showRegPage,
  '/catalog': showCatalogPage,
  '404': showErrorPage,
};

let pageUrl = '/';
let activePage = Routes[pageUrl];
let currentWrapper: HTMLElement;




export const onNavigate = (pathname: string): void => {
  let currentUrl = window.location.origin;
  if (categoryPathes.find((category) => category.href === `/${pathname}`)?.href) {
    currentUrl += `/catalog/${pathname}`;
  } else if (pathname === pageUrl) {
    currentUrl = pathname;
  } else {
    currentUrl += `/${pathname}`;
  }
  window.history.pushState({}, pathname, `${currentUrl}`);
};

export const RenderPage = (categoryData: void | Category[]): void => {
  currentWrapper.innerHTML = '';
  const background = createElement(OpacityParam, currentWrapper);
  currentWrapper.prepend(background);
  pageUrl = `/${window.location.pathname.split('/').slice(-1)}`;
  activePage = Routes[pageUrl] || Routes['404'];
  activePage(currentWrapper, categoryData);
};

export async function addEventListener(categoryData: void | Category[]): Promise<void> {


  const links = document.querySelectorAll('a');

  links.forEach((el) => {
    if (el.id) {
      const pathname = el.id;
      if (pathname)
        el.addEventListener('click', (event) => {
          event.preventDefault();
          onNavigate(pathname);
          RenderPage(categoryData);
          addEventListener(categoryData);
        });
    }
  });
}

export const initRouter = (wrapper: HTMLElement, categoryData: void | Category[]): void => {
  currentWrapper = wrapper;
  window.onpopstate = (): void => {
    RenderPage(categoryData);
  };
  RenderPage(categoryData);
  addEventListener(categoryData);
};

export const redirect = (categoryData: void | Category[]): void => {
  pageUrl = '/';
  onNavigate(pageUrl);
  RenderPage(categoryData);
  addEventListener(categoryData);
};
