import './products.scss';
import { Image, Price } from '@commercetools/platform-sdk';
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

let SortParameter = 0;
let SearchParameter = '';
let ContentRoot: HTMLElement;
let CurrentId: string;

const updatePage = (): void => {
  ContentRoot.innerHTML = '';
  console.log(SortParameter, SearchParameter);
};

const SortCallBack = (value: string): void => {
  SortParameter = Number(value);
  updatePage();
};

const SearchCallBack = (value: string): void => {
  SearchParameter = value;
  updatePage();
};

export default async function showProductsPage(root: HTMLElement, id: string): Promise<void> {
  CurrentId = id;
  const currentUrl = window.location.href;
  const productsPage = createElement(ProductsPageParam, root);
  const sortPanel = showSortPanel(productsPage, SortCallBack, SearchCallBack);
  const pageContent = createElement(ContentPageContainer, productsPage);
  ContentRoot = pageContent;
  const productsList = createElement(ProductsList, pageContent);
  productsList.id = id;

  const productData = await getProductsList(id);
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
