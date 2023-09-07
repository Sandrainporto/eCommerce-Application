import './products.scss';
import { Image, Price, ProductProjection } from '@commercetools/platform-sdk';
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
  ProductDiscount,
  ProductPrices,
  ProductColor,
  CardPopup,
  CardPopupClose,
} from './types';
import { showSortPanel } from '../../components/FilterSort/Sort/sortPanel';
import { showFilterPanel } from '../../components/FilterSort/Filter/filterPanel';
import { addSwiper } from '../../components/Swiper/swiperView';
import { initSlider } from '../../components/Swiper/swiperInitializer';
import { ProductSlider } from '../productDetails.ts/types';

let SortParameter = 0;
let SearchParameter = '';
let ContentRoot: HTMLElement;
let CurrentId: string;
let Filter: string[] = [];

const SortParams = {
  0: 'name.en-us asc',
  1: 'name.en-us desc',
  2: 'price desc',
  3: 'price asc',
};

function showProductImages(productImagesData:string[]){
 const popUp = document.createElement('div');
 popUp.className = CardPopup.popup;
 const popUpClose = createElement(CardPopupClose, popUp);
 popUpClose.addEventListener('click',()=>{
  popUp.remove()
 })
 const popUpSlider = createElement(ProductSlider, popUp);
 console.log(productImagesData)

 addSwiper(popUp, productImagesData);
 document.querySelector('.page__main')?.prepend(popUp);
}
const createCard = (root: HTMLElement, product: ProductProjection): void => {
  const currentUrl = window.location.href;
  const productCard = createElement(ProductCard, root);
  const productIconBox = createElement(ProductImageBox, productCard);
  const productIcon = createElement(ProductImage, productIconBox) as HTMLImageElement;
  const productImagesData: Image[] | undefined = product.masterVariant.images;
  productIconBox.addEventListener('click', ()=>{
    const slides: string[] = [];
    productImagesData?.forEach((image: Image) => {
      const imageUrl = image.url;
      slides.push(imageUrl);
    });
    showProductImages(slides);
    initSlider()
  })
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
  const priceList = createElement(ProductPrices, productCard);
  const productPricesData: Price[] | undefined = product.masterVariant.prices;
  productPricesData?.forEach((prices) => {
    const productPrice = createElement(ProductPrice, priceList);
    productPrice.innerText = `${prices.value.centAmount / 100} ${prices.value.currencyCode}`;
    const productDiscount = createElement(ProductDiscount, priceList);
    if (prices.discounted?.value.centAmount) {
      const discountedAmount = prices.discounted.value.centAmount;
      const {currencyCode} = prices.value;
      const calculatedAmount = discountedAmount / 100;
      const displayText = `${calculatedAmount} ${currencyCode}`;
      productDiscount.innerText = displayText;
      productDiscount.setAttribute('keyD', `${product.key}`);
      productPrice.setAttribute('keyF', `${product.key}`);
    }
    if(product.masterVariant.attributes){
      const productColor = createElement(ProductColor, productCard);
productColor.style.background = product.masterVariant.attributes[0].value
    }
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
    Filter,
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

const FilterCallBack = (value: string[]): void => {
  Filter = value;
  updatePage();
};

export default async function showProductsPage(root: HTMLElement, id: string): Promise<void> {
  CurrentId = id;
  Filter = [];
  const productsPage = createElement(ProductsPageParam, root);
  const sortPanel = showSortPanel(productsPage, SortCallBack, SearchCallBack);
  const pageContent = createElement(ContentPageContainer, productsPage);
  const filterPanel = showFilterPanel(pageContent, FilterCallBack);
  const productsList = createElement(ProductsList, pageContent);
  productsList.id = id;
  ContentRoot = productsList;

  showCards(id, productsList);
}
