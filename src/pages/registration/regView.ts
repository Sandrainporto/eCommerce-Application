import '../login/authContent.scss';
import showMainContent from '../../components/mainContent/mainContent';
import { RegPageParam } from './regTypes';
import { createElement } from '../../utils/elementCreator';

export function showRegPage(root: HTMLElement): void {
  const mainPage = createElement(RegPageParam, root);
  showMainContent(mainPage);
}
