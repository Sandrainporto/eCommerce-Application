import { Category } from '@commercetools/platform-sdk';
import './main.scss';
import showHeader from '../../components/Header/headerView';
import showFooter from '../../components/Footer/footerView';
import { DataType, MainPageParam } from '../../types/types';
import { createElement } from '../../utils/elementCreator';
import { Routes } from '../../router/routes';
import showBreadcrumb from '../../components/Breadcrumb/breadcrumbsView';

let Data: DataType[];
let categoryData: Category[];
let mainWrapper: HTMLElement;

export default function showMainPage(currentPage: string): void {
  const url = currentPage.split('/').filter((el) => el.length !== 0);
  let activePage = Routes[currentPage] || Routes['404'];
  console.log(url.length)
  let id = '';
  if (url.length === 0) {
    activePage = Routes[''];
  } else if (url.length === 1) {
    activePage = Routes[url[0]] || Routes['404'];
  } else if (url.length === 2) {
    Data.map((el) => {
      if (el.category.key === url[1]) {
        id = el.category.id;
      }
      return undefined;
    });
  } else if (url.length === 3) {
    Data.forEach((el) => {
      el.subcategory.forEach((elem) => {
        if (elem.key === url[2]) id = elem.id;
      });
    });
  }
  mainWrapper.innerHTML = '';
  showBreadcrumb(mainWrapper);
  if (id) {
    console.log(id);
    activePage = Routes.products;
    activePage(mainWrapper, id);
  } else activePage(mainWrapper, categoryData);
}

export const setData = (wrapper: HTMLElement, data: DataType[]): void => {
  if (data) {
    Data = data;
    categoryData = data.map((el) => el.category);
  }
  showHeader(wrapper, Data);
  mainWrapper = createElement(MainPageParam, wrapper);
  showMainPage('');
  showFooter(wrapper);
};
