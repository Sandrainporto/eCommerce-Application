import './header.scss';
import { HeaderContainerParam, HeaderParam } from '../../types/types';
import { createElement } from '../../utils/elementCreator';
import showLogo from '../Logo/logoView';
import showNavigation from '../Navigaition/navigationView';

export default function showHeader(root: HTMLElement): HTMLElement {
  const header = createElement(HeaderParam, root);
  const headerContainer = createElement(HeaderContainerParam, header);
  showLogo(headerContainer);
  showNavigation(headerContainer);
  return header;
}
