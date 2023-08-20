import './categories.scss';
import { createElement } from '../../utils/elementCreator';
import {
  CategoriesContainerParam,
  CategoryBoxParam,
  CategoryIconBoxParam,
  CategoryIconParam,
  CategoryLinkParam,
  CategoryTitleParam,
  categoriesData,
} from './categoriesTypes';

export default function showCategories(root: HTMLElement): void {
  const categoriesContainer = createElement(CategoriesContainerParam, root);
  categoriesData.forEach((category) => {
    const categoryBlock = createElement(CategoryBoxParam, categoriesContainer);
    categoryBlock.style.background = category.background;

    const categoryTitle = createElement(CategoryTitleParam, categoryBlock);
    categoryTitle.innerText = category.text;

    const categoryIconBox = createElement(CategoryIconBoxParam, categoryBlock) as HTMLImageElement;

    const categoryIcon = createElement(CategoryIconParam, categoryIconBox) as HTMLImageElement;
    categoryIcon.alt = `${`${category.id}-icon`}`;
    categoryIcon.src = category.src;

    const categoryLink = createElement(CategoryLinkParam, categoryBlock) as HTMLLinkElement;
    categoryLink.href = category.href;
    categoryLink.id = category.id;
    categoryLink.innerText = 'Show more';
  });
}
