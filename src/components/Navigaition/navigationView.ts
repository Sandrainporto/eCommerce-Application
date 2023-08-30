import './navigation.scss';
import { Category } from '@commercetools/platform-sdk';
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
import { getCategoriesList } from '../../api/getCatalog';

let categoryData: void | Category[];

export function createSublinks(categoriesData: void | Category[], root: HTMLLinkElement): HTMLUListElement {
  const currentUrl = window.location.origin;

  const subList = document.createElement('ul');
  subList.className = 'catalog__sub-list';
  if (categoriesData)
    categoriesData.forEach((category) => {
      const subItem = document.createElement('li');
      const subLink = createElement(NavigationSubLinkParam, subItem) as HTMLAnchorElement;
      subLink.innerText = category.name['en-US'];
      subLink.id = `${category.key}`;

      subLink.href = `${currentUrl}/catalog/${category.key}`;

      subList.append(subItem);
    });
  root.after(subList);
  return subList;
}

function showHideLoggedUser(): void {
  const loginBtn = document.querySelector('#login') as HTMLAnchorElement;
  const registerBtn = document.querySelector('#register') as HTMLAnchorElement;
  const profileBtn = document.querySelector('#profile') as HTMLAnchorElement;

  const loggedUserName = localStorage.getItem('userName');
  const registratedUserName = localStorage.getItem('reg-customer-name')?.slice(1, -2);

  if (loggedUserName || registratedUserName) {
    registerBtn.classList.add('hide');
    loginBtn.classList.add('logged');
    loginBtn.innerText = 'Log Out';
    profileBtn.classList.add('name-displayed');
    if (loggedUserName) {
      profileBtn.innerText = `Hello ${loggedUserName}`;
    }
    if (registratedUserName) {
      profileBtn.innerText = `Hello ${registratedUserName}`;
    }
  }

  if (loginBtn.classList.contains('logged')) {
    loginBtn.addEventListener('click', () => {
      localStorage.clear();
    });
    loginBtn.href = '/';
    loginBtn.id = '';
  }
}

async function createNavigationLinks(root: HTMLElement): Promise<void> {
  navigationLinksData.forEach((arrItem) => {
    const item = createElement(NavigationItemParam, root);
    const link = createElement(NavigationLinkParam, item) as HTMLLinkElement;
    link.innerText = arrItem.text;
    link.href = `/${arrItem.id}`;
    link.id = arrItem.id;
  });
  showHideLoggedUser();
  const catalogeLink: HTMLLinkElement | null = document.querySelector('#catalog');
  if (catalogeLink) {
    createSublinks(categoryData, catalogeLink);
  }
}

export default function showNavigation(root: HTMLElement, data: void | Category[]): HTMLElement {
  categoryData = data;

  const navBlock = createElement(NavigationBlockParam, root);

  const navList = createElement(NavigationListParam, navBlock);

  createNavigationLinks(navList);

  showBurger(navBlock, navBlock, navList);
  return navBlock;
}
