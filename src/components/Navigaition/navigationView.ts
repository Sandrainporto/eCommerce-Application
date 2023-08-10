import './navigation.scss';
import { createElement } from '../../utils/elementCreator';
import {
  NavigationItemParam,
  NavigationLinkParam,
  NavigationBlockParam,
  NavigationListParam,
  navigationLinksData,
} from './navigationTypes';

function createNavigationLinks(root: HTMLElement): void {
  navigationLinksData.forEach((arrItem) => {
    const item = createElement(NavigationItemParam, root);
    const link = createElement(NavigationLinkParam, item) as HTMLLinkElement;
    link.innerText = arrItem.text;
    link.href = arrItem.href;
    link.id = arrItem.id;
  });
}

export default function showNavigation(root: HTMLElement): HTMLElement {
  const navBlock = createElement(NavigationBlockParam, root);
  const navList = createElement(NavigationListParam, navBlock);

  createNavigationLinks(navList);
  return navBlock;
}
