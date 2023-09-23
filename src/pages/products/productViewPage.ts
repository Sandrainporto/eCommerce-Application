import './products.scss';
import { Image, Price, ProductProjection } from '@commercetools/platform-sdk';
import { getAllProducts, getProductsList, IResponseResult } from '../../api/getProducts';
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
  ProductCartLink,
  ProductCartLinkRemove,
} from './types';
import { showSortPanel } from '../../components/FilterSort/Sort/sortPanel';
import { COLORS, MAGIC, CATEGORY, showFilterPanel } from '../../components/FilterSort/Filter/filterPanel';
import { addSwiper } from '../../components/Swiper/swiperView';
import { initSlider } from '../../components/Swiper/swiperInitializer';
import { ProductSlider } from '../productDetails.ts/types';
import { FiltersParam } from '../catalog/types';
import { changePagesAmount, paginationInit } from '../../components/Pagination/paginationView';
import { addItemToBasket } from '../productDetails.ts/detailsPage';
import { cartData } from '../basket/basketTypes';
import { removeItemFromCart } from '../../api/shoppingList';
import { ItemsInCart } from '../../components/Navigaition/navigationTypes';

const CARDS_ON_PAGE = 6;
let SortParameter = 0;
let SearchParameter = '';
let ContentRoot: HTMLElement | undefined;
let CurrentId: string;
let url: URL | undefined;
let productsPage: HTMLElement;
let currentPage = 1;
let totalPages = 1;
let totalCards = 0;

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

export function addRemoveBtn(btn: HTMLElement, id, addToCartBtn) {
  btn.setAttribute('data-id-remove', `${id}`);

  btn.addEventListener('click', () => {
    if (localStorage.getItem('night-customer-cart')) {
      let cartData = JSON.parse(localStorage.getItem('night-customer-cart') as string);
      console.log(cartData);
      if (cartData.lineItems) {
        const cart = cartData.lineItems;
        const desiredObject = cart.find((obj) => obj.productId === id);

        console.log(cartData.id);
        console.log(cartData.version);

        console.log(desiredObject.id);

        console.log(desiredObject.quantity);

        if (desiredObject) {
          removeItemFromCart(cartData.id, cartData.version, desiredObject.id, desiredObject.quantity).then(
            ({ body }) => {
              cartData = body;
              localStorage.setItem('night-customer-cart', JSON.stringify(cartData));
            },
          );
          const itemsNumInCart = document.querySelector(`.${ItemsInCart.classNames}`) as HTMLElement;
          itemsNumInCart.innerText = `${+itemsNumInCart.innerText - desiredObject.quantity}`;
        }
        addToCartBtn.classList.remove('hiden');
        btn.classList.add('hiden');
      }
    }

    console.log('remover');
  });
  btn.classList.add('hiden');
}

export function addToCartBtn(link: HTMLElement, id: string): void {
  link.setAttribute('data-id', `${id}`);
  if (localStorage.getItem('night-customer-cart')) {
    let cartData = JSON.parse(localStorage.getItem('night-customer-cart') as string);

    if (cartData.lineItems) {
      const cart = cartData.lineItems;
      const desiredObject = cart.find((obj) => obj.productId === id);
      if (desiredObject) {
        link.classList.add('in-cart');
        link.innerText = 'Remove from 🛒';
        link.removeEventListener('click', addItemToBasket);
        link.addEventListener('click', () => {
          console.log('click2');
          removeItemFromCart(cartData.id, cartData.version, desiredObject.id, desiredObject.quantity).then(
            ({ body }) => {
              cartData = body;
              localStorage.removeItem('night-customer-cart');
              localStorage.setItem('night-customer-cart', JSON.stringify(cartData));
            },
          );
        });
      }
    }
  }
}

function showProductImages(productImagesData: string[], productCard: HTMLElement): void {
  const popUp = document.createElement('div');
  popUp.className = CardPopup.popup;
  const popUpClose = createElement(CardPopupClose, popUp);
  popUpClose.addEventListener('click', () => {
    popUp.remove();
  });
  const popUpSlider = createElement(ProductSlider, popUp);

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

  const prodCartLink = createElement(ProductCartLink, productCardContainer, addItemToBasket) as HTMLAnchorElement;
  prodCartLink.setAttribute('data-id', `${product.id}`);
  const removeBtn = createElement(ProductCartLinkRemove, productCardContainer) as HTMLAnchorElement;

  addRemoveBtn(removeBtn, product.id, prodCartLink);

  if (localStorage.getItem('night-customer-cart')) {
    let cartData = JSON.parse(localStorage.getItem('night-customer-cart') as string);
    if (cartData.lineItems) {
      const cart = cartData.lineItems;
      const desiredObject = cart.find((obj) => obj.productId === product.id);

      if (desiredObject) {
        prodCartLink.classList.add('hiden');
        removeBtn.classList.remove('hiden');
      }
    }
  }
};

const setTotalPages = (cards: number): void => {
  totalPages = Math.ceil(cards / CARDS_ON_PAGE);
};

export async function showCards(productsList: HTMLElement, id?: string): Promise<void> {
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

  window.history.replaceState({}, '', url);
  let data: IResponseResult;
  if (url && id) {
    data = await getProductsList(fuzzyLevel, CARDS_ON_PAGE, id);
  } else {
    data = await getAllProducts(fuzzyLevel, CARDS_ON_PAGE);
    if (data.total) totalCards = data.total;
  }
  if (data.total) setTotalPages(data.total);
  data.results.forEach((product) => {
    createCard(productsList, product);
  });
}

export const updatePage = async (): Promise<void> => {
  ContentRoot =
    (document.querySelector(`${ContentRoots.CategoryProduct}`) as HTMLElement) ||
    (document.querySelector(`${ContentRoots.AllProducts}`) as HTMLElement);
  ContentRoot.innerHTML = '';
  const productsList = ContentRoot;
  await showCards(productsList, CurrentId);
  changePagesAmount(totalPages);
};

export const SortCallBack = (value: string): void => {
  SortParameter = Number(value);
  if (url) url.searchParams.set(SearchParams.sort, `${[SortParams[SortParameter]]}`);
  updatePage();
};

export const SearchCallBack = (value: string): void => {
  SearchParameter = value;
  if (SearchParameter && url) url.searchParams.set(SearchParams.search, `${SearchParameter.toLocaleLowerCase()}`);
  updatePage();
};

export const FilterCallBack = (value: string[]): void => {
  const colors: string[] = [];
  const magic: string[] = [];
  const category: string[] = [];
  if (value.length !== 0) {
    value.forEach((el) => {
      if (COLORS.includes(el)) {
        colors.push(el);
      }
      if (MAGIC.includes(el)) {
        magic.push(el);
      }
      if (CATEGORY.includes(el)) {
        category.push(el);
      }
    });
  }
  if (url) {
    if (colors.length !== 0) {
      url.searchParams.set(SearchParams.filterColors, `${colors}`);
    } else {
      url.searchParams.delete(SearchParams.filterColors);
    }

    if (magic.length !== 0) {
      url.searchParams.set(SearchParams.filterTypes, `${magic}`);
    } else {
      url.searchParams.delete(SearchParams.filterTypes);
    }
    if (category.length !== 0) {
      url.searchParams.set(SearchParams.filterCategory, `${category}`);
    } else {
      url.searchParams.delete(SearchParams.filterCategory);
    }
  }
  updatePage();
};

export const changePageCallBack = (page: number): void => {
  currentPage = page;
  if (url) url.searchParams.set(SearchParams.page, `${currentPage}`);
  updatePage();
};

export default async function showProductsPage(root: HTMLElement, id?: string): Promise<void> {
  const newUrl = new URL(window.location.href);
  if (!url && newUrl.searchParams.get(SearchParams.page)) {
    url = new URL(window.location.href);
    currentPage = Number(newUrl.searchParams.get(SearchParams.page));
  } else if (url && newUrl.href === url.href) {
    currentPage = Number(newUrl.searchParams.get(SearchParams.page));
  } else {
    url = new URL(window.location.href);
    currentPage = 1;
    url.searchParams.set(SearchParams.page, `1`);
  }
  const pageContainer = createElement(ContentPageContainer, root);
  productsPage = createElement(ProductsPageParam, pageContainer);
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
  await showCards(productsList, id);

  paginationInit(pageContainer, changePageCallBack, totalPages);
}
