import './navigation.scss';
import { Category } from '@commercetools/platform-sdk';
import { createElement } from '../../utils/elementCreator';
import {
  NavigationItemParam,
  NavigationLinkParam,
  NavigationBlockParam,
  NavigationListParam,
  navigationLinksData,
  NavigationSubLink,
  NavigationSubCategLink,
  NavigationSubCategList,
  NavigationClasses,
} from './navigationTypes';
import showBurger from '../Burger/burgerView';
import { DataType } from '../../types/types';

let Data: DataType[];
let categoryData: Category[];
const currentUrl = window.location.origin;

async function addsubCategories(parentCateg: HTMLLIElement, subLinkID: string): Promise<void> {
  const subcategoryData = Data.filter((el) => el.category.id === subLinkID);
  const subItemList = document.createElement('ul');

  subcategoryData?.forEach((category) => {
    if (category.subcategory.length > 0) {
      category.subcategory.forEach((subcategory) => {
        subItemList.className = NavigationSubCategList.classNames;
        const subItem = document.createElement('li');
        const subLink = createElement(NavigationSubCategLink, subItem) as HTMLAnchorElement;
        subLink.innerText = subcategory.name['en-US'];
        subLink.id = `${subcategory.id}`;
        subLink.href = `${currentUrl}/catalog/${parentCateg.id}/sbc/${subcategory.key}`;
        subItemList.append(subItem);
        parentCateg.append(subItemList);
      });
    }
  });
}

export function addSublinks(categoriesData: void | Category[], root: HTMLLinkElement): HTMLUListElement {
  console.log('Создаем линки');
  const subList = document.createElement('ul');
  subList.className = 'catalog__sub-list';
  categoriesData?.forEach((category) => {
    const subItem = document.createElement('li');
    subItem.id = `${category.key}`;
    const subLink = createElement(NavigationSubLink, subItem) as HTMLAnchorElement;
    subLink.innerText = category.name['en-US'];
    subLink.id = `${category.id}`;

    subLink.href = `${currentUrl}/catalog/${category.key}`;

    subList.append(subItem);
    addsubCategories(subItem, subLink.id);
  });
  root.after(subList);
  return subList;
}

// export function displayProfileLink(): void {
//   const loginBtn = document.querySelector('#login') as HTMLAnchorElement;
//   const registerBtn = document.querySelector('#register') as HTMLAnchorElement;
//   const profileBtn = document.querySelector('#profile') as HTMLAnchorElement;

//   const loggedUserName = localStorage.getItem('userName');
//   const registratedUserName = localStorage.getItem('reg-customer-name')?.slice(1, -2);

//   if (loggedUserName || registratedUserName) {
//     registerBtn.classList.add('hide');
//     loginBtn.classList.add('logged');
//     loginBtn.innerText = 'Log Out';
//     profileBtn.classList.add('name-displayed');
//     if (loggedUserName) {
//       profileBtn.innerText = `Hello ${loggedUserName}`;
//     }
//     if (registratedUserName) {
//       profileBtn.innerText = `Hello ${registratedUserName}`;
//     }
//   }

// }

export function showProfileLink(): void {
  const loginBtn = document.querySelector(`.${NavigationClasses.login}`) as HTMLAnchorElement;
  const registerBtn = document.querySelector(`.${NavigationClasses.register}`) as HTMLAnchorElement;
  const profileBtn = document.querySelector(`.${NavigationClasses.profile}`) as HTMLAnchorElement;

  const loggedUserName = localStorage.getItem('userName');
  const registratedUserName = localStorage.getItem('reg-customer-name')?.slice(1, -2);

  if (loggedUserName || registratedUserName) {
    profileBtn.classList.remove('hide');
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
      profileBtn.classList.add('hide');
      registerBtn.classList.remove('hide');
      loginBtn.classList.remove('logged');
      loginBtn.innerText = 'Login';
    });
  }
}

async function createNavigationLinks(root: HTMLElement): Promise<void> {
  console.log('создаем основной блок');
  navigationLinksData.forEach((arrItem) => {
    const item = createElement(NavigationItemParam, root);
    const link = createElement(NavigationLinkParam, item) as HTMLLinkElement;
    link.innerText = arrItem.text;
    link.href = `/${arrItem.text.toLowerCase()}`;
    link.classList.add(arrItem.class);
  });
  showProfileLink();
  const catalogeLink: HTMLLinkElement | null = document.querySelector(`.${NavigationClasses.catalog}`);
  if (catalogeLink) {
    addSublinks(categoryData, catalogeLink);
  }
  const profileLink: HTMLLinkElement | null = document.querySelector(`.${NavigationClasses.profile}`);
  profileLink?.classList.add('hide');
}

export default function showNavigation(root: HTMLElement, data: DataType[]): HTMLElement {
  Data = data;
  categoryData = data.map((el) => el.category);

  const navBlock = createElement(NavigationBlockParam, root);

  const navList = createElement(NavigationListParam, navBlock);

  createNavigationLinks(navList);

  showBurger(navBlock, navBlock, navList);
  return navBlock;
}
