import './main.scss';
import showFooter from '../../components/Footer/footerView';
import showHeader from '../../components/Header/headerView';
import showMainContent from '../../components/mainContent/mainContent';
import { MainPageParam } from '../../types/types';
import { createElement } from '../../utils/elementCreator';
import { Category } from '@commercetools/platform-sdk';

export default function showMainPage(root: HTMLElement, categoryData: void | Category[]): void {
  showHeader(root, categoryData);
  const mainPage = createElement(MainPageParam, root);
  showMainContent(mainPage);
  // console.log(categoryData)
  showFooter(root);
}
