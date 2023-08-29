import './authContent.scss';
import showFooter from '../../components/Footer/footerView';
import showHeader from '../../components/Header/headerView';
import showMainContent from '../../components/mainContent/mainContent';
import { AuthPageParam } from './authTypes';
import { createElement } from '../../utils/elementCreator';
import { Category } from '@commercetools/platform-sdk';

export function showAuthPage(root: HTMLElement, categoryData: void | Category[]): void {
  showHeader(root, categoryData);
  const mainPage = createElement(AuthPageParam, root);
  showMainContent(mainPage);
  // console.log(categoryData)
  showFooter(root);
}
