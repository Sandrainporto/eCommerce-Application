import './categoryCard.scss';
import { createElement } from '../../utils/elementCreator';
import {
  CategoriesContainerParam,
  CategoryBoxParam,
  CategoryIconBoxParam,
  CategoryIconParam,
  CategoryLinkParam,
  CategoryTitleParam,
  HrefParam,
} from './categoryCardTypes';
import { Category } from '@commercetools/platform-sdk';
export const categoryPathes: HrefParam[] = [];

export default function createCategoriesCard(root: HTMLElement, categoriesData: Category[]): void {

  let currentUrl = window.location.origin;


  const categoriesContainer = createElement(CategoriesContainerParam, root);
  categoriesData.forEach((category) => {
    const categoryBlock = createElement(CategoryBoxParam, categoriesContainer);

    const categoryTitle = createElement(CategoryTitleParam, categoryBlock);
    categoryTitle.innerText = category.name['en-US'];

    const categoryIconBox = createElement(CategoryIconBoxParam, categoryBlock) as HTMLImageElement;
    const categoryIcon = createElement(CategoryIconParam, categoryIconBox) as HTMLImageElement;
    categoryIcon.alt = `${`${category.key}-icon`}`;
    const rootToImage = '../../assets/categories/';
    categoryIcon.src = `${rootToImage + category.key}.png`;

    const categoryLink = createElement(CategoryLinkParam, categoryBlock) as HTMLLinkElement;
    categoryLink.href = `${currentUrl}/catalog/${category.key}`;

    categoryLink.id = `${category.key}`;
    categoryLink.innerText = 'Show more';

    categoryPathes.push({
      href: `/${category.key}`,
      id: `${categoryLink.id}`,
    });
  });
}
