export type Callback = () => void;

export interface ElementParams {
  elemTag: string;
  classNames?: string | string[];
  id?: string;
  innerText?: string;
  listenerType?: string;
  src?: string;
  alt?: string;
  // href?: string;
  type?: string;
  placeholder?: string;
  value?: string;
}

export enum WrapperParam {
  elemTag = 'div',
  classNames = 'wrapper',
}
export enum MainPageParam {
  elemTag = 'div',
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
export enum ContentMainPageParam {
  elemTag = 'main',
  classNames = 'content',
}
export enum FooterParam {
  elemTag = 'footer',
  classNames = 'footer',
}
export enum FooterContainerParam {
  elemTag = 'div',
  classNames = 'footer__container',
}
