import './products.scss';
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
import { Price } from '@commercetools/platform-sdk';
import { showFilterPanel } from '../../components/FilterSort/Filter/filterPanel';

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

// eslint-disable-next-line max-lines-per-function
export default async function showProductsPage(root: HTMLElement, id: string): Promise<void> {
  CurrentId = id;
  const currentUrl = window.location.href;
  const productsPage = createElement(ProductsPageParam, root);
  const sortPanel = showSortPanel(productsPage, SortCallBack, SearchCallBack);
  const pageContent = createElement(ContentPageContainer, productsPage);
  const filterPanel = showFilterPanel(pageContent);
  ContentRoot = pageContent;
  const productsList = createElement(ProductsList, pageContent);
  productsList.id = id;
  const productData = await getProductsList(id);

  productData.forEach((product) => {
    const productCard = createElement(ProductCard, productsList);

    const productIconBox = createElement(ProductImageBox, productCard);
    const productIcon = createElement(ProductImage, productIconBox) as HTMLImageElement;
    const productImagesData = product.masterVariant.images;
    productImagesData?.forEach((image) => (productIcon.src = image.url));

    const productTitle = createElement(ProductName, productCard);
    productTitle.innerText = product.name['en-US'];

    const productDescription = createElement(ProductDescription, productCard);
    if (product.description) {
      productDescription.innerText = product.description['en-US'];
    } else {
      productDescription.innerText = '';
    }

    const productPrice = createElement(ProductPrice, productCard);
    const productPricesData: Price[] | undefined = product.masterVariant.prices;
    productPricesData?.forEach(
      (prices) => (productPrice.innerText = `${prices.value.centAmount / 100} ${prices.value.currencyCode}`),
    );

    const productLink = createElement(ProductCardLink, productCard) as HTMLAnchorElement;
    productLink.href = `${currentUrl}/${product.key?.toLowerCase()}-card`;
    productLink.id = `${product.key?.toLowerCase()}`;
  });
}
