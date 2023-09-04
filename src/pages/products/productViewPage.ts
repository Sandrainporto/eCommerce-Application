import './products.scss';
import { Image, Price, Product, ProductProjection } from '@commercetools/platform-sdk';
import { getProductsList } from '../../api/getProducts';
import { createElement } from '../../utils/elementCreator';
import { ContentPageContainer } from '../error/types';
import {
  ProductsPageParam,
  ProductsList,
  ProductCard,
  ProductName,
  ProductImage,
  ProductImageBox,
  ProductDescription,
  ProductCardLink,
  ProductPrice,
} from './types';
import { showSortPanel } from '../../components/FilterSort/Sort/sortPanel';
import { showFilterPanel } from '../../components/FilterSort/Filter/filterPanel';

let SortParameter = 0;
let SearchParameter = '';
let ContentRoot: HTMLElement;
let CurrentId: string;

const updatePage = (): void => {
  ContentRoot.innerHTML =``
  const productsList =  document.querySelector('.products__list') as HTMLElement
showCards(CurrentId, productsList)


  
};

const SortCallBack = (value: string): void => {
  SortParameter = Number(value);
  updatePage();
};

const SearchCallBack = (value: string): void => {
  SearchParameter = value;
  updatePage();
};

// eslint-disable-next-line max-lines-per-function
export default async function showProductsPage(root: HTMLElement, id: string): Promise<void> {
  CurrentId = id;
  const productsPage = createElement(ProductsPageParam, root);
  const sortPanel = showSortPanel(productsPage, SortCallBack, SearchCallBack);
  console.log(sortPanel)
  const pageContent = createElement(ContentPageContainer, productsPage);
  const filterPanel = showFilterPanel(pageContent);
  const productsList = createElement(ProductsList, pageContent);
  productsList.id = id;
  ContentRoot = productsList;


  showCards(id, productsList)
}
export async function showCards(id:string, productsList:HTMLElement):Promise<void>{
  const currentUrl = window.location.href;
console.log(SortParameter, SearchParameter)
let productData : ProductProjection[] =await getProductsList(id, ["name.en-us asc"]);
if(SortParameter ==0){
 productData = await getProductsList(id, ["name.en-us asc"]);
}else if(SortParameter ==1){
  productData = await getProductsList(id, ["name.en-us desc"]);
}
// }else if(SortParameter ==2){
//   productData = await getProductsList(id, ["name.en-us desc"]);

// }else if(SortParameter ==3){
//   productData = await getProductsList(id, ["name.en-us desc"]);

// }

  productData.forEach((product) => {
    const productCard = createElement(ProductCard, productsList);
    const productIconBox = createElement(ProductImageBox, productCard);
    const productIcon = createElement(ProductImage, productIconBox) as HTMLImageElement;
    const productImagesData: Image[] | undefined = product.masterVariant.images;
    if (productImagesData) {
      const mainImage = productImagesData[0];
      productIcon.src = mainImage.url;
    }
    const productTitle = createElement(ProductName, productCard);
    productTitle.innerText = product.name['en-US'];
    const productDescription = createElement(ProductDescription, productCard);
    if (product.description) {
      productDescription.innerText = product.description['en-US'];
    } else {
      productDescription.innerText = '';
    }
    const productPricesData: Price[] | undefined = product.masterVariant.prices;
    productPricesData?.forEach((prices) => {
      const productPrice = createElement(ProductPrice, productCard);
      productPrice.innerText = `${prices.value.centAmount / 100} ${prices.value.currencyCode}`;
    });
    const productLink = createElement(ProductCardLink, productCard) as HTMLAnchorElement;
    productLink.href = `${currentUrl}/${product.key?.toLowerCase()}-card`;
    productLink.id = `${product.key?.toLowerCase()}`;
  });


}