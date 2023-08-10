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
export interface NavigationLink {
  text: string;
  href: string;
  id: string;
}
export const navigationLinksData: NavigationLink[] = [
  {
    text: 'Catalog',
    href: '#',
    id: 'catalog',
  },
  {
    text: 'Profile',
    href: '#',
    id: 'profile',
  },
  {
    text: 'Basket',
    href: '#',
    id: 'basket',
  },
  {
    text: 'Login',
    href: '#',
    id: 'login',
  },
  {
    text: 'Register',
    href: '#',
    id: 'register',
  },
];