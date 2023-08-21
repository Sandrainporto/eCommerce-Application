import './main.scss';
import showFooter from '../../components/Footer/footerView';
import showHeader from '../../components/Header/headerView';
import showMainContent from '../../components/mainContent/mainContent';
import { MainPageParam } from '../../types/types';
import { createElement } from '../../utils/elementCreator';

export default function showMainPage(root: HTMLElement): void {
  showHeader(root);
  const mainPage = createElement(MainPageParam, root);
  showMainContent(mainPage);
  showFooter(root);
}
