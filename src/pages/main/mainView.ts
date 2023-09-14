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
  // console.log(value);
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

// export default function showMainPage(currentPage: string, value?: string): void {
//   const url1 = new URL(window.location.href);
//   console.log(url1);
//   mainWrapper.innerHTML = '';
//   let id = '';
//   let key = value || '';
//   let activePage;
//   let url: string[] = [];
//   if (currentPage.includes('?')) {
//     url = currentPage
//       .split('?')[0]
//       .split('/')
//       .filter((el) => el.length !== 0);
//   } else {
//     url = currentPage.split('/').filter((el) => el.length !== 0);
//   }
//   if (url.length === 0 || !currentPage) {
//     activePage = Routes[''];
//   } else if (url.length === 1) {
//     key = '';
//     activePage = Routes[url[0]] || Routes['404'];
//   } else if (url.length === 2) {
//     Data.forEach((el) => {
//       if (el.category.key === url[1]) {
//         id = el.category.id;
//         activePage = Routes.products;
//         return;
//       }
//       if (!id) {
//         activePage = Routes['404'];
//       }
//     });
//   } else if ((url.length === 3 && !key) || url.length === 4) {
//     Data.forEach((el) => {
//       el.subcategory.forEach((elem) => {
//         if (elem.key === url[3]) {
//           id = elem.id;
//           activePage = Routes.products;
//         }
//         if (!id) {
//           activePage = Routes['404'];
//         }
//       });
//     });
//   } else if (key) {
//     activePage = Routes.details;
//   }
//   showBreadcrumb(mainWrapper);
//   if (activePage === Routes['404']) {
//     window.history.replaceState({}, '', `/404`);
//     activePage(mainWrapper, key || id || categoryData);
//   }
//   if (activePage !== Routes['404']) {
//     activePage(mainWrapper, key || id || categoryData);
//   }
// }

export const setData = (wrapper: HTMLElement, data: DataType[]): void => {
  if (data) {
    Data = data;
    categoryData = data.map((el) => el.category);
  }
  showHeader(wrapper, Data);
  mainWrapper = createElement(MainPageParam, wrapper);
  showFooter(wrapper);
};
