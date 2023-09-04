import './authContent.scss';
import showMainContent from '../../components/mainContent/mainContent';
import { AuthPageParam } from './authTypes';
import { createElement } from '../../utils/elementCreator';

export function showAuthPage(root: HTMLElement): void {
  const mainPage = createElement(AuthPageParam, root);
  showMainContent(mainPage);
}
