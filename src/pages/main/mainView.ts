import { Category } from '@commercetools/platform-sdk';
import './main.scss';
import showHeader from '../../components/Header/headerView';
import showFooter from '../../components/Footer/footerView';
import { MainPageParam } from '../../types/types';
import { createElement } from '../../utils/elementCreator';
import { Routes } from '../../router/routes';
import showBreadcrumb from '../../components/Breadcrumb/breadcrumbsView';

let categoryData: void | Category[];
let mainWrapper: HTMLElement;

export default function showMainPage(currentPage: string, id?:string): void {
  const activePage = Routes[currentPage] || Routes['404'];
  mainWrapper.innerHTML = '';
  showBreadcrumb(mainWrapper);
  if(id){
      activePage(mainWrapper, id);

  }else
  activePage(mainWrapper, categoryData);
}

export const setData = (wrapper: HTMLElement, data: void | Category[]): void => {
  categoryData = data;
  showHeader(wrapper, categoryData);
  mainWrapper = createElement(MainPageParam, wrapper);
  showMainPage('');
  showFooter(wrapper);
};
