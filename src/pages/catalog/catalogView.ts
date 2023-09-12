import { Category, ProductProjection } from '@commercetools/platform-sdk';
import createCategoriesCard from '../../components/Categories/categoryCard';
import { createElement } from '../../utils/elementCreator';
import { ContentPageContainer } from '../error/types';
import { AllProductList, CatalogListParam, CatalogPageParam } from './types';
import { getAllProducts } from '../../api/getProducts';
import { FilterCallBack, SearchCallBack, SortCallBack, showCards } from '../products/productViewPage';
import { showSortPanel } from '../../components/FilterSort/Sort/sortPanel';
import { showFilterPanel } from '../../components/FilterSort/Filter/filterPanel';

let categoryData: void | Category[];
let ContentRoot: HTMLElement;


export default async function showCatalogPage(root: HTMLElement, data: void | Category[]): Promise<void> {
  categoryData = data;
  console.log(data)
  const catalogPage = createElement(CatalogPageParam, root);
  const pageContent = createElement(ContentPageContainer, catalogPage);
  const catalogList = createElement(CatalogListParam, pageContent);
  const sortPanel = showSortPanel(pageContent, SortCallBack, SearchCallBack);
  const filterPanel = showFilterPanel(pageContent, FilterCallBack);

  const allProducts = createElement(AllProductList, pageContent);
  
  createCategoriesCard(catalogList, categoryData);
  ContentRoot = allProducts;
  console.log(ContentRoot)

showCards(allProducts)

}


