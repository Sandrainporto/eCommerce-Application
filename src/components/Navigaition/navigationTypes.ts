export enum NavigationBlockParam {
  elemTag = 'nav',
  classNames = 'header__nav',
}
export enum NavigationListParam {
  elemTag = 'ul',
  classNames = 'nav__list',
}
export enum NavigationItemParam {
  elemTag = 'li',
  classNames = 'nav__item',
}
export enum NavigationLinkParam {
  elemTag = 'a',
  classNames = 'nav__link',
}
export enum NavigationSubLink {
  elemTag = 'a',
  classNames = 'nav__sub-link',
  listenerType = 'mouseover',
}
export enum NavigationSubCategList {
  classNames = 'nav__subcategory-list',
}
export enum NavigationSubCategLink {
  elemTag = 'a',
  classNames = 'nav__subcategory-link',
}

export interface NavigationLink {
  text: string;
  id: string;
}
export const navigationLinksData: NavigationLink[] = [
  {
    text: 'Catalog',
    id: 'catalog',
  },
  {
    text: 'Basket',
    id: 'basket',
  },
  {
    text: 'Profile',
    id: 'profile',
  },
  {
    text: 'Login',
    id: 'login',
  },
  {
    text: 'Register',
    id: 'register',
  },
];
