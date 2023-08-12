import './navigation.scss';
import { createElement } from '../../utils/elementCreator';
import {
  NavigationItemParam,
  NavigationLinkParam,
  NavigationBlockParam,
  NavigationListParam,
  navigationLinksData,
  NavigationSubLinkParam,
} from './navigationTypes';
import showBurger from '../Burger/burgerView';
import { categoriesData } from '../Categories/categoriesTypes';

function addCatalogSublinks(root: HTMLLinkElement): HTMLUListElement {
  const subList = document.createElement('ul');
  subList.className = 'catalog__sub-list';

  categoriesData.forEach((category) => {
    const subItem = document.createElement('li');
    const subLink = createElement(NavigationSubLinkParam, subItem);
    subLink.innerText = category.text;
    subLink.id = category.id;

    subList.append(subItem);
  });
  root.after(subList);
  return subList;
}

function createNavigationLinks(root: HTMLElement): void {
  navigationLinksData.forEach((arrItem) => {
    const item = createElement(NavigationItemParam, root);
    const link = createElement(NavigationLinkParam, item) as HTMLLinkElement;
    link.innerText = arrItem.text;
    link.href = arrItem.href;
    link.id = arrItem.id;
  });
  const catalogeLink: HTMLLinkElement | null = document.querySelector('#catalog');
  if (catalogeLink) {
    addCatalogSublinks(catalogeLink);
  }
}

export default function showNavigation(root: HTMLElement): HTMLElement {
  const navBlock = createElement(NavigationBlockParam, root);
  showBurger(navBlock);
  const navList = createElement(NavigationListParam, navBlock);

  createNavigationLinks(navList);
  return navBlock;
}
