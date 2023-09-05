import './profile.scss';
import showMainContent from '../../components/mainContent/mainContent';
import { ProfilePageParam } from './profileTypes';
import { createElement } from '../../utils/elementCreator';

export function showProfPage(root: HTMLElement): void {
  const mainPage = createElement(ProfilePageParam, root);
  showMainContent(mainPage);
}
