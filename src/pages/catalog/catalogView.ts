import './catalogPage.scss'
import { Category, ProductProjection } from '@commercetools/platform-sdk';
import createCategoriesCard from '../../components/Categories/categoryCard';
import { createElement } from '../../utils/elementCreator';
import { ContentPageContainer } from '../error/types';
import { AllProductList, CatalogListParam, CatalogPageParam, FiltersParam, SectionParam } from './types';
import { FilterCallBack, SearchCallBack, SortCallBack, showCards } from '../products/productViewPage';
import { showSortPanel } from '../../components/FilterSort/Sort/sortPanel';
import { showFilterPanel } from '../../components/FilterSort/Filter/filterPanel';

let categoryData: void | Category[];
let ContentRoot: HTMLElement;


export default async function showCatalogPage(root: HTMLElement, data: void | Category[]): Promise<void> {
  categoryData = data;
  // console.log(data)
  const pageContainer = createElement(ContentPageContainer, root)
  const catalogPage = createElement(CatalogPageParam, pageContainer);
  const catalogList = createElement(CatalogListParam, catalogPage);
    const productsSection = createElement(SectionParam, catalogPage);
    const filtersSection = createElement(FiltersParam, productsSection);


  const sortPanel = showSortPanel(filtersSection, SortCallBack, SearchCallBack);
  const filterPanel = showFilterPanel(filtersSection, FilterCallBack);

  const allProducts = createElement(AllProductList, productsSection);
  
  createCategoriesCard(catalogList, categoryData);
  ContentRoot = allProducts;
  // console.log(ContentRoot)

showCards(allProducts)

}


