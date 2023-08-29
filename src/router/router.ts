import { Category } from '@commercetools/platform-sdk';
import showFooter from '../components/Footer/footerView';
import showHeader from '../components/Header/headerView';
import showCatalogPage from '../pages/catalog/catalogView';
import showErrorPage from '../pages/error/error';
import { showAuthPage } from '../pages/login/authView';
import showMainPage from '../pages/main/mainView';
import { showRegPage } from '../pages/registration/regView';
import { MainPageParam } from '../types/types';
import { createElement } from '../utils/elementCreator';

const Routes = {
  '': showMainPage,
  login: showAuthPage,
  register: showRegPage,
  catalog: showCatalogPage,
  '404': showErrorPage,
};

let mainWrapper: HTMLElement;
let categoryData: void | Category[];

const renderPage = (path: string): void => {
  const currentPage = path.split('/').slice(-1).join('');
  const activePage = Routes[currentPage] || Routes['404'];
  mainWrapper.innerHTML = '';
  activePage(mainWrapper, categoryData);
  window.history.pushState({}, currentPage, `${path}`);
};

const addListener = (): void => {
  window.onpopstate = (): void => {
    const path = window.location.href;
    renderPage(path);
  };
  window.addEventListener(
    'click',
    (event) => {
      event.preventDefault();
      const target = event.target as HTMLLinkElement;
      if (target.tagName === 'A') {
        renderPage(target.href);
      }
    },
    false,
  );
};

export const init = (element: HTMLElement, data: void | Category[]): void => {
  categoryData = data;
  showHeader(element, categoryData);
  mainWrapper = createElement(MainPageParam, element);
  showFooter(element);
  showMainPage(mainWrapper, categoryData);
  addListener();
};
