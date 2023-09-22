/* eslint-disable max-lines-per-function */
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

export default function showMainPage(value?: string): void {
  let activePage;
  let id = '';
  mainWrapper.innerHTML = '';
  const url = new URL(window.location.href);
  const page = url.pathname.split('/').slice(-1)[0];

  Data.forEach((el) => {
    if (el.category.key === page) {
      id = el.category.id;
    } else {
      el.subcategory.forEach((elem) => {
        if (elem.key === page) {
          id = elem.id;
        }
      });
    }
  });
  if (id) {
    activePage = Routes.products;
  } else if (Routes[page]) {
    activePage = Routes[page];
  } else if (value) {
    id = value;
    activePage = Routes.details;
  } else {
    activePage = Routes['404'];
  }
  showBreadcrumb(mainWrapper);
  activePage(mainWrapper, id || categoryData);
}


export const setData = (wrapper: HTMLElement, data: DataType[]): void => {
  if (data) {
    Data = data;
    categoryData = data.map((el) => el.category);
  }
  showHeader(wrapper, Data);
  mainWrapper = createElement(MainPageParam, wrapper);
  showFooter(wrapper);
};
