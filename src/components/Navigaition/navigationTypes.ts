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
  class: string;
  id?: string;
}

export enum NavigationClasses {
  catalog = 'navigation__catalog',
  basket = 'navigation__basket',
  profile = 'navigation__profile',
  login = 'navigation__login',
  register = 'navigation__register',
}

export const navigationLinksData: NavigationLink[] = [
  {
    text: 'Catalog',
    class: NavigationClasses.catalog,
    // id: 'catalog',
  },
  {
    text: 'Basket',
    class: NavigationClasses.basket,
    // id: 'basket',
  },
  {
    text: 'Profile',
    class: NavigationClasses.profile,
    // id: 'profile',
  },
  {
    text: 'Login',
    class: NavigationClasses.login,
    // id: 'login',
  },
  {
    text: 'Register',
    class: NavigationClasses.register,
    // id: 'register',
  },
];
