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

export default function showMainPage(currentPage: string, key?: string): void {
  const url = currentPage.split('/').filter((el) => el.length !== 0);
  let id = '';
  let activePage;
  if (url.length === 0 || !currentPage) {
    activePage = Routes[''];
  } else if (url.length === 1) {
    activePage = Routes[url[0]] || Routes['404'];
  } else if (url.length === 2) {
    Data.forEach((el) => {
      if (el.category.key === url[1]) {
        id = el.category.id;
        activePage = Routes.products;
        return;
      }
      if (!id) {
        activePage = Routes['404'];
      }
    });
  } else if (url.length === 3 && !key) {
    Data.forEach((el) => {
      el.subcategory.forEach((elem) => {
        if (elem.key === url[2]) {
          id = elem.id;
          activePage = Routes.products;
        }
        if (!id) {
          activePage = Routes['404'];
        }
      });
    });
  } else if (key) {
    activePage = Routes.details;
  }
  // if (url.length === 0) {
  //   activePage = Routes[currentPage];
  // } else if (url.length === 1) {
  //   activePage = Routes[url[0]] || Routes['404'];
  // } else if (url.length === 2) {

  // } else if (url.length > 2) {
  // Data.forEach((el) => {
  //   el.subcategory.forEach((elem) => {
  //     if (elem.key === url[2]) id = elem.id;
  //   });
  // });
  // }
  // console.log(activePage);
  // console.log(url);
  // console.log(currentPage);
  // if (id) {
  //   activePage = Routes.products;
  //   activePage(mainWrapper, id);
  // } else if (key && url.length === 3) {
  // activePage = Routes.details;
  //   activePage(mainWrapper, key);
  // } else if (!id && activePage === Routes['404']) {
  //   activePage(mainWrapper, categoryData);
  // } else {
  //   console.log(123123);
  //   activePage(mainWrapper, categoryData);
  // }
  mainWrapper.innerHTML = '';
  if (activePage === Routes['404']) {
    const path = window.location.host;
    window.location.href = `http://${path}/404`;
  }
  showBreadcrumb(mainWrapper);
  activePage(mainWrapper, key || id || categoryData);
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
