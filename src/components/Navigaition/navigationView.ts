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
import { categoriesData } from '../mainContent/Categories/categoriesTypes';

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
function showHideLoggedUser():void {
  const loginBtn = document.querySelector('#login') as HTMLAnchorElement;
  const registerBtn = document.querySelector('#register') as HTMLAnchorElement;
  const profileBtn = document.querySelector('#profile') as HTMLAnchorElement;

  const loggedUserName = localStorage.getItem('userName');

  if (loggedUserName) {
    registerBtn.classList.add('hide');
    loginBtn.classList.add('logged');
    loginBtn.innerText = 'Log Out';
    loginBtn.href = '/';
    profileBtn.classList.add('name-displayed');
    profileBtn.innerText = `Hello ${loggedUserName}`;
  }

  if (loginBtn.classList.contains('logged')) {
    loginBtn.addEventListener('click', () => {
      localStorage.clear();
    });
  }
}
function createNavigationLinks(root: HTMLElement): void {
  navigationLinksData.forEach((arrItem) => {
    const item = createElement(NavigationItemParam, root);
    const link = createElement(NavigationLinkParam, item) as HTMLLinkElement;
    link.innerText = arrItem.text;
    link.href = arrItem.href;
    link.id = arrItem.id;
  });
  showHideLoggedUser();

  const catalogeLink: HTMLLinkElement | null = document.querySelector('#catalog');
  if (catalogeLink) {
    addCatalogSublinks(catalogeLink);
  }
}

export default function showNavigation(root: HTMLElement): HTMLElement {
  const navBlock = createElement(NavigationBlockParam, root);

  const navList = createElement(NavigationListParam, navBlock);

  createNavigationLinks(navList);

  showBurger(navBlock, navBlock, navList);
  return navBlock;
}
