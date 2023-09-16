import './catalogPage.scss';
import { Category } from '@commercetools/platform-sdk';
import createCategoriesCard from '../../components/Categories/categoryCard';
import { createElement } from '../../utils/elementCreator';
import { ContentPageContainer } from '../error/types';

import { AllProductList, CatalogListParam, CatalogPageParam, SectionParam } from './types';
import showProductsPage from '../products/productViewPage';


let categoryData: void | Category[];

export default async function showCatalogPage(root: HTMLElement, data: void | Category[]): Promise<void> {
  categoryData = data;
  const pageContainer = createElement(ContentPageContainer, root);
  const catalogPage = createElement(CatalogPageParam, pageContainer);
  const catalogList = createElement(CatalogListParam, catalogPage);
  const productsSection = createElement(SectionParam, catalogPage);
  const allProducts = createElement(AllProductList, productsSection);
  createCategoriesCard(catalogList, categoryData);
  showProductsPage(allProducts);
}
