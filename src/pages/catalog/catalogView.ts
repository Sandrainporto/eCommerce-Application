import { Category, ProductProjection } from '@commercetools/platform-sdk';
import createCategoriesCard from '../../components/Categories/categoryCard';
import { createElement } from '../../utils/elementCreator';
import { ContentPageContainer } from '../error/types';
import { AllProductList, CatalogListParam, CatalogPageParam } from './types';
import { getAllProducts } from '../../api/getProducts';
import { showCards } from '../products/productViewPage';

let categoryData: void | Category[];

export default async function showCatalogPage(root: HTMLElement, data: void | Category[]): Promise<void> {
  categoryData = data;
  console.log(data)
  const catalogPage = createElement(CatalogPageParam, root);
  const pageContent = createElement(ContentPageContainer, catalogPage);
  const catalogList = createElement(CatalogListParam, pageContent);
  const allProducts = createElement(AllProductList, pageContent);
  createCategoriesCard(catalogList, categoryData);


showCards(allProducts)
}


