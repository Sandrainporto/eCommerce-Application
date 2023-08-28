export enum CategoriesContainerParam {
  elemTag = 'div',
  classNames = 'categories',
}
export enum CategoryBoxParam {
  elemTag = 'div',
  classNames = 'category',
}
export enum CategoryTitleParam {
  elemTag = 'h2',
  classNames = 'category__title',
}
export enum CategoryIconBoxParam {
  elemTag = 'div',
  classNames = 'category__icon-box',
}

export enum CategoryIconParam {
  elemTag = 'img',
  classNames = 'category__icon',
}
export enum CategoryLinkParam {
  elemTag = 'a',
  classNames = 'category__link',
}

export interface HrefParam {
  text: string;
  href: string;
  id: string;
}
