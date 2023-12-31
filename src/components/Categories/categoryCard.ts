import './categoryCard.scss';
import { Category } from '@commercetools/platform-sdk';
import { createElement } from '../../utils/elementCreator';
import {
  CategoriesContainerParam,
  CategoryBoxParam,
  CategoryIconBoxParam,
  CategoryIconParam,
  CategoryLinkParam,
  CategoryParam,
  CategoryTitleParam,
} from './categoryCardTypes';

let categoriesData: void | Category[];

export default async function createCategoriesCard(root: HTMLElement, data: void | Category[]): Promise<HTMLElement> {
  const currentUrl = window.location.origin;
  categoriesData = data;

  const categoriesContainer = createElement(CategoriesContainerParam, root);
  if (categoriesData) {
    categoriesData.forEach((category) => {
      const categoryBlock = createElement(CategoryBoxParam, categoriesContainer);

      const categoryTitle = createElement(CategoryTitleParam, categoryBlock);
      categoryTitle.innerText = category.name['en-US'];

      const categoryIconBox = createElement(CategoryIconBoxParam, categoryBlock) as HTMLImageElement;
      const categoryIcon = createElement(CategoryIconParam, categoryIconBox) as HTMLImageElement;
      categoryIcon.alt = `${`${category.key}-icon`}`;
      const rootToImage = CategoryParam.rootImage;
      categoryIcon.src = `${rootToImage + category.key}.png`;

      const categoryLink = createElement(CategoryLinkParam, categoryBlock) as HTMLLinkElement;
      categoryLink.href = `${currentUrl}/catalog/${category.key}`;

      categoryLink.innerText = CategoryParam.text;
    });
  }

  return categoriesContainer;
}
