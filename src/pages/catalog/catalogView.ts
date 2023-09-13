import { Category } from '@commercetools/platform-sdk';
import createCategoriesCard from '../../components/Categories/categoryCard';
import { createElement } from '../../utils/elementCreator';
import { ContentPageContainer } from '../error/types';
import { CatalogListParam, CatalogPageParam } from './types';

let categoryData: void | Category[];

export default async function showCatalogPage(root: HTMLElement, data: void | Category[]): Promise<void> {
  categoryData = data;
  const catalogPage = createElement(CatalogPageParam, root);
  const pageContent = createElement(ContentPageContainer, catalogPage);
  const catalogList = createElement(CatalogListParam, pageContent);

  createCategoriesCard(catalogList, categoryData);
}
