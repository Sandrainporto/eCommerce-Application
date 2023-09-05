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

const SortParams = {
  0: 'name.en-us asc',
  1: 'name.en-us desc',
  2: 'price desc',
  3: 'price asc',
};

const createCard = (root: HTMLElement, product: ProductProjection): void => {
  const currentUrl = window.location.href;
  const productCard = createElement(ProductCard, root);
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
};

export async function showCards(id: string, productsList: HTMLElement): Promise<void> {
  let fuzzyLevel: number | undefined = SearchParameter.length;

  if (fuzzyLevel === 1 || fuzzyLevel === 2) {
    fuzzyLevel = 0;
  } else if (fuzzyLevel > 2 && fuzzyLevel < 6) {
    fuzzyLevel = 1;
  } else if (fuzzyLevel > 5) {
    fuzzyLevel = 2;
  } else {
    fuzzyLevel = undefined;
  }
  const productData: ProductProjection[] = await getProductsList(
    id,
    [SortParams[SortParameter]],
    SearchParameter.toLocaleLowerCase(),
    fuzzyLevel,
  );
  productData.forEach((product) => {
    createCard(productsList, product);
  });
}

const updatePage = (): void => {
  ContentRoot.innerHTML = ``;
  const productsList = document.querySelector('.products__list') as HTMLElement;
  showCards(CurrentId, productsList);
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
  const productsPage = createElement(ProductsPageParam, root);
  const sortPanel = showSortPanel(productsPage, SortCallBack, SearchCallBack);
  const pageContent = createElement(ContentPageContainer, productsPage);
  const filterPanel = showFilterPanel(pageContent);
  const productsList = createElement(ProductsList, pageContent);
  productsList.id = id;
  ContentRoot = productsList;

  showCards(id, productsList);
}
