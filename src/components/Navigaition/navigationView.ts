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
import { Category } from '@commercetools/platform-sdk';

export function createSublinks(categoriesData: Category[], root: HTMLLinkElement): HTMLUListElement {
  let currentUrl = window.location.origin;


  const subList = document.createElement('ul');
  subList.className = 'catalog__sub-list';
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
function createNavigationLinks(root: HTMLElement): void {
  navigationLinksData.forEach((arrItem) => {
    const item = createElement(NavigationItemParam, root);
    const link = createElement(NavigationLinkParam, item) as HTMLLinkElement;
    link.innerText = arrItem.text;
    link.href = arrItem.href;
    link.id = arrItem.id;
  });

// getCategoriesList2()
// .then((result) => {
// console.log(result[0]); // доступ к результату промиса
// // дополнительные действия с результатом
// })
// .catch((error) => {
// console.error(error); // обработка ошибок
// });

  showHideLoggedUser();
}

export default function showNavigation(root: HTMLElement): HTMLElement {
  const navBlock = createElement(NavigationBlockParam, root);

  const navList = createElement(NavigationListParam, navBlock);

  createNavigationLinks(navList);

  showBurger(navBlock, navBlock, navList);
  return navBlock;
}
