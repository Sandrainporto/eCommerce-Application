import './authContent.scss';
import showFooter from '../../components/Footer/footerView';
import showHeader from '../../components/Header/headerView';
import showMainContent from '../../components/mainContent/mainContent';
import { AuthPageParam } from './authTypes';
import { createElement } from '../../utils/elementCreator';

export function showAuthPage(root: HTMLElement): void {
  const mainPage = createElement(AuthPageParam, root);
  showMainContent(mainPage);
}
