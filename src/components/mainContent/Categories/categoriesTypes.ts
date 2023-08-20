import attributes from '../../../assets/categories/attributes.png';
import books from '../../../assets/categories/books.png';
import cauldrons from '../../../assets/categories/cauldrons.png';
import ingredients from '../../../assets/categories/ingredients.png';
import potions from '../../../assets/categories/potions.png';
import spells from '../../../assets/categories/spells.png';

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
export interface CategoriesParam {
  text: string;
  href: string;
  id: string;
  src: string;
  // background: string;
}
export const categoriesData: CategoriesParam[] = [
  {
    text: 'Spells',
    href: '#',
    id: 'spells',
    src: spells,
  },
  {
    text: 'Potions',
    href: '#',
    id: 'potions',
    src: potions,
  },
  {
    text: 'Сauldrons',
    href: '#',
    id: 'cauldrons',
    src: cauldrons,
  },
  {
    text: 'Grimoires',
    href: '#',
    id: 'books',
    src: books,
  },
  {
    text: 'Ingredients',
    href: '#',
    id: 'ingredients',
    src: ingredients,
  },
  {
    text: 'Attributes',
    href: '#',
    id: 'attributes',
    src: attributes,
  },
];
