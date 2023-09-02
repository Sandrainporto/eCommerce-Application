
import { createElement } from '../../utils/elementCreator';
import { ContentPageContainer } from '../error/types';
import { ProductsPageParam, ProductsList } from './types';


export default function showProductsPage(root: HTMLElement, id:string): void {
  const currentPageCategory =  window.location.href.split('/').slice(-1).join('');
  const productsPage = createElement(ProductsPageParam, root);
  console.log(id)
  const pageContent = createElement(ContentPageContainer, productsPage);
  const productsList = createElement(ProductsList, pageContent);
  productsList.innerHTML =`${currentPageCategory}`
  
}
