import { Category } from '@commercetools/platform-sdk';
import './header.scss';
import { HeaderContainerParam, HeaderParam } from '../../types/types';
import { createElement } from '../../utils/elementCreator';
import showLogo from '../Logo/logoView';
import showNavigation from '../Navigaition/navigationView';

export default function showHeader(root: HTMLElement, categoryData: void | Category[]): void {
  const header = createElement(HeaderParam, root);
  const headerContainer = createElement(HeaderContainerParam, header);
  console.log(categoryData)
  showLogo(headerContainer);
  showNavigation(headerContainer);
}
