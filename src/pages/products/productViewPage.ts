import './products.scss';
import { Image, Price, ProductProjection } from '@commercetools/platform-sdk';
import { getAllProducts, getProductsList } from '../../api/getProducts';
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
  ProductDiscount,
  ProductPrices,
  ProductColor,
  CardPopup,
  CardPopupClose,
  ProductCardContainer,
  SearchParams,
} from './types';
import { showSortPanel } from '../../components/FilterSort/Sort/sortPanel';
import { COLORS, MAGIC, TYPES, showFilterPanel } from '../../components/FilterSort/Filter/filterPanel';
import { addSwiper } from '../../components/Swiper/swiperView';
import { initSlider } from '../../components/Swiper/swiperInitializer';
import { ProductSlider } from '../productDetails.ts/types';
import { FiltersParam } from '../catalog/types';

let SortParameter = 0;
let SearchParameter = '';
let ContentRoot: HTMLElement | undefined;
let CurrentId: string;
let url;

const SortParams = {
  0: 'name.en-us asc',
  1: 'name.en-us desc',
  2: 'price desc',
  3: 'price asc',
};
const ContentRoots = {
  CategoryProduct: '.products__list',
  AllProducts: '.products__list_all',
};

function showProductImages(productImagesData: string[], productCard: HTMLElement): void {
  const popUp = document.createElement('div');
  popUp.className = CardPopup.popup;
  const popUpClose = createElement(CardPopupClose, popUp);
  popUpClose.addEventListener('click', () => {
    popUp.remove();
  });
  const popUpSlider = createElement(ProductSlider, popUp);
  // console.log(productImagesData);

  addSwiper(popUpSlider, productImagesData);
  productCard.prepend(popUp);
}

// eslint-disable-next-line max-lines-per-function
const createCard = (root: HTMLElement, product: ProductProjection): void => {
  let currentUrl = window.location.pathname;
  const productCard = createElement(ProductCard, root);
  const productCardContainer = createElement(ProductCardContainer, productCard);
  const productIconBox = createElement(ProductImageBox, productCardContainer);
  const productIcon = createElement(ProductImage, productIconBox) as HTMLImageElement;
  const productImagesData: Image[] | undefined = product.masterVariant.images;
  productIconBox.addEventListener('click', () => {
    const slides: string[] = [];
    productImagesData?.forEach((image: Image) => {
      const imageUrl = image.url;
      slides.push(imageUrl);
    });
    showProductImages(slides, productCard);
    initSlider();
  });
  if (productImagesData) {
    const mainImage = productImagesData[0];
    productIcon.src = mainImage.url;
  }
  const productTitle = createElement(ProductName, productCardContainer);
  productTitle.innerText = product.name['en-US'];
  const productDescription = createElement(ProductDescription, productCardContainer);
  if (product.description) {
    productDescription.innerText = product.description['en-US'];
  } else {
    productDescription.innerText = '';
  }
  const priceList = createElement(ProductPrices, productCardContainer);
  const productPricesData: Price[] | undefined = product.masterVariant.prices;
  productPricesData?.forEach((prices) => {
    const productPrice = createElement(ProductPrice, priceList);
    productPrice.innerText = `${prices.value.centAmount / 100} ${prices.value.currencyCode}`;
    const productDiscount = createElement(ProductDiscount, priceList);
    if (prices.discounted?.value.centAmount) {
      const discountedAmount = prices.discounted.value.centAmount;
      const { currencyCode } = prices.value;
      const calculatedAmount = discountedAmount / 100;
      const displayText = `${calculatedAmount} ${currencyCode}`;
      productDiscount.innerText = displayText;
      productDiscount.setAttribute('keyD', `${product.key}`);
      productPrice.setAttribute('keyF', `${product.key}`);
    }
    if (product.masterVariant.attributes) {
      const productColor = createElement(ProductColor, productCardContainer);
      productColor.style.background = product.masterVariant.attributes[0].value;
    }
  });
  const productLink = createElement(ProductCardLink, productCardContainer) as HTMLAnchorElement;
  if (currentUrl === `${window.location.origin}/catalog`) {
    currentUrl = `${window.location.origin}/catalog`;
    if (product.metaDescription)
      productLink.href = `${currentUrl}/${product.metaDescription[
        'en-US'
      ].toString()}/${product.key?.toLowerCase()}-card`;
  } else {
    productLink.href = `${currentUrl}/${product.key?.toLowerCase()}-card`;
  }
  productLink.id = `${product.key?.toLowerCase()}`;
};

export async function showCards(productsList: HTMLElement, id?: string): Promise<void> {
  let fuzzyLevel: number | undefined = SearchParameter.length;
  let productData;

  if (fuzzyLevel === 1 || fuzzyLevel === 2) {
    fuzzyLevel = 0;
  } else if (fuzzyLevel > 2 && fuzzyLevel < 6) {
    fuzzyLevel = 1;
  } else if (fuzzyLevel > 5) {
    fuzzyLevel = 2;
  } else {
    fuzzyLevel = undefined;
  }


  window.history.pushState({}, '', url);
  if (url && id) {
    productData = await getProductsList(fuzzyLevel, id);
  } else {
    productData = await getAllProducts(fuzzyLevel);

  }

  productData.forEach((product) => {
    createCard(productsList, product);
  });
}

export const updatePage = (): void => {
  ContentRoot =
    (document.querySelector(`${ContentRoots.CategoryProduct}`) as HTMLElement) ||
    (document.querySelector(`${ContentRoots.AllProducts}`) as HTMLElement);
  ContentRoot.innerHTML = '';
  const productsList = ContentRoot;
  showCards(productsList, CurrentId);
};

export const SortCallBack = (value: string): void => {
  SortParameter = Number(value);
  url.searchParams.set(SearchParams.sort, `${[SortParams[SortParameter]]}`);
  updatePage();
};

export const SearchCallBack = (value: string): void => {
  SearchParameter = value;
  if (SearchParameter) url.searchParams.set(SearchParams.search, `${SearchParameter.toLocaleLowerCase()}`);
  updatePage();
};

export const FilterCallBack = (value: string[]): void => {

  console.log(value);
  if (value.length !== 0) {
    url.searchParams.set(SearchParams.filter, `${value}`);
  } else {
    url.searchParams.delete(SearchParams.filter);
  }
  updatePage();
};

export default async function showProductsPage(root: HTMLElement, id?: string): Promise<void> {
  url = new URL(`${window.location.href.split('?')[0]}`);


  const pageContainer = createElement(ContentPageContainer, root);
  const productsPage = createElement(ProductsPageParam, pageContainer);
  const filtersSection = createElement(FiltersParam, productsPage);
  const sortPanel = showSortPanel(filtersSection, SortCallBack, SearchCallBack);

  const filterPanel = showFilterPanel(filtersSection, FilterCallBack);

  const productsList = createElement(ProductsList, productsPage);

  if (id) {
    CurrentId = id;
    productsList.id = id;
  } else {
    CurrentId = '';
  }

  ContentRoot = productsList;
  showCards(productsList, id);
}
