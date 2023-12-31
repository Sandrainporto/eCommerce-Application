import { Category } from '@commercetools/platform-sdk';

export type Callback = (e: Event) => void;

export interface ElementParams {
  elemTag: string;
  classNames?: string | string[];
  id?: string;
  innerText?: string;
  listenerType?: string;
  src?: string;
  alt?: string;
  href?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  for?: string;
}

export interface DataType {
  category: Category;
  subcategory: Category[];
}

export type RouterType = {
  [key: string]: HTMLElement;
};

export enum WrapperParam {
  elemTag = 'div',
  classNames = 'wrapper',
}
export enum OpacityParam {
  elemTag = 'div',
  classNames = 'opacity',
}
export enum MainPageParam {
  elemTag = 'main',
  classNames = 'page__main',
  id = 'main',
}

export enum HeaderParam {
  elemTag = 'header',
  classNames = 'header',
}
export enum HeaderContainerParam {
  elemTag = 'div',
  classNames = 'header__container',
}
export enum BurgerParam {
  elemTag = 'div',
  classNames = 'header__burger',
}
export enum FooterParam {
  elemTag = 'footer',
  classNames = 'footer',
}
export enum FooterContainerParam {
  elemTag = 'div',
  classNames = 'footer__container',
}
