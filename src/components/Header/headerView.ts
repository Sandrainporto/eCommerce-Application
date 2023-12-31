import './header.scss';
import { DataType, HeaderContainerParam, HeaderParam } from '../../types/types';
import { createElement } from '../../utils/elementCreator';
import showLogo from '../Logo/logoView';
import showNavigation from '../Navigaition/navigationView';

export default function showHeader(root: HTMLElement, data: DataType[]): void {
  const header = createElement(HeaderParam, root);
  const headerContainer = createElement(HeaderContainerParam, header);

  showLogo(headerContainer);
  showNavigation(headerContainer, data);
}
