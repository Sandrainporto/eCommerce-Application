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
  ItemsInCart,
} from './navigationTypes';
import showBurger from '../Burger/burgerView';
import { DataType } from '../../types/types';
import { addFooterLink } from '../Footer/footerView';

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

export function showProfileLink(): void {
  const loginBtn = document.querySelector(`.${NavigationClasses.login}`) as HTMLAnchorElement;
  const registerBtn = document.querySelector(`.${NavigationClasses.register}`) as HTMLAnchorElement;
  const profileBtn = document.querySelector(`.${NavigationClasses.profile}`) as HTMLAnchorElement;

  const loggedUserName = localStorage.getItem('userName');
  const registratedUserName = localStorage.getItem('reg-customer-name')?.slice(1, -2);

  if (loggedUserName || registratedUserName) {
    profileBtn.classList.remove('hide');
    registerBtn.classList.add('hiden');
    loginBtn.classList.add('logged');
    loginBtn.innerText = 'Log Out';
    profileBtn.classList.add('name-displayed');
    if (loggedUserName) {
      profileBtn.innerText = `Hi ${loggedUserName.split(' ')[0]}`;
    }
    if (registratedUserName) {
      profileBtn.innerText = `Hi ${registratedUserName.split(' ')[0]}`;
    }
  }
  if (loginBtn.classList.contains('logged')) {
    loginBtn.addEventListener('click', () => {
      localStorage.removeItem('night-customer-email');
      localStorage.removeItem('userName');
      localStorage.removeItem('night-customer');
      profileBtn.classList.add('hide');
      registerBtn.classList.remove('hiden');
      loginBtn.classList.remove('logged');
      loginBtn.innerText = 'Login';
    });
  }
}

async function createNavigationLinks(root: HTMLElement): Promise<void> {
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
  const loggedUserName = localStorage.getItem('userName');
  const registratedUserName = localStorage.getItem('reg-customer-name')?.slice(1, -2);

  if (loggedUserName || registratedUserName) {
    profileLink?.classList.remove('hide');
  }
  const cartLink: HTMLLinkElement | null = document.querySelector(`.${NavigationClasses.cart}`);
  if (cartLink) {
    const itemsNumInCart = createElement(ItemsInCart, cartLink);
    if (localStorage.getItem('night-customer-cart')) {
      const cartData = JSON.parse(localStorage.getItem('night-customer-cart') as string);
      itemsNumInCart.innerText = cartData.totalLineItemQuantity;
    }
  }
}

export default function showNavigation(root: HTMLElement, data: DataType[]): HTMLElement {
  Data = data;
  categoryData = data.map((el) => el.category);

  const navBlock = createElement(NavigationBlockParam, root);

  const navList = createElement(NavigationListParam, navBlock);

  createNavigationLinks(navList);
  addFooterLink(navList);

  showBurger(navBlock, navBlock, navList);
  return navBlock;
}
