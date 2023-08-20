import '../login/authContent.scss';
import showFooter from '../../components/Footer/footerView';
import showHeader from '../../components/Header/headerView';
import showMainContent from '../../components/mainContent/mainContent';
import { RegPageParam } from './regTypes';
import { createElement } from '../../utils/elementCreator';

export function showRegPage(root: HTMLElement): void {
  showHeader(root);
  const mainPage = createElement(RegPageParam, root);
  showMainContent(mainPage);
  showFooter(root);
}
