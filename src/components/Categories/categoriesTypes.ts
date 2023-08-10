import attributes from '../../assets/categories/attributes.png';
import books from '../../assets/categories/books.png';
import cauldrons from '../../assets/categories/cauldrons.png';
import ingredients from '../../assets/categories/ingredients.png';
import potions from '../../assets/categories/potions.png';
import spells from '../../assets/categories/spells.png';

export enum CategoriesContainerParam {
  elemTag = 'div',
  classNames = 'categories__container',
}
export enum CategoryBoxParam {
  elemTag = 'div',
  classNames = 'category',
}
export enum CategoryTitleParam {
  elemTag = 'h2',
  classNames = 'category__title',
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
  background: string;
}
export const categoriesData: CategoriesParam[] = [
  {
    text: 'Potions',
    href: '#',
    id: 'potions',
    src: potions,
    background: ' radial-gradient( circle farthest-corner at 10% 20%,  rgba(0,221,214,1) 0%, rgba(51,102,255,1) 90% )',
  },
  {
    text: 'Spells',
    href: '#',
    id: 'spells',
    src: spells,
    background: 'radial-gradient( circle 300px at 8% 89.3%,  rgba(20,157,208,1) 0%, rgba(140,63,226,1) 90% )  ',
  },
  {
    text: 'Сauldrons',
    href: '#',
    id: 'cauldrons',
    src: cauldrons,
    background: ' radial-gradient( circle farthest-corner at 10% 20%,  rgba(0,221,214,1) 0%, rgba(51,102,255,1) 90% )',
  },
  {
    text: 'Magic Books',
    href: '#',
    id: 'books',
    src: books,
    background: ' radial-gradient( circle 300px at 8% 89.3%,  rgba(20,157,208,1) 0%, rgba(140,63,226,1) 90% )',
  },
  {
    text: 'Ingredients',
    href: '#',
    id: 'ingredients',
    src: ingredients,
    background: ' radial-gradient( circle farthest-corner at 10% 20%,  rgba(0,221,214,1) 0%, rgba(51,102,255,1) 90% )',
  },
  {
    text: 'Attributes',
    href: '#',
    id: 'attributes',
    src: attributes,
    background: ' radial-gradient( circle 300px at 8% 89.3%,  rgba(20,157,208,1) 0%, rgba(140,63,226,1) 90% )',
  },
];
