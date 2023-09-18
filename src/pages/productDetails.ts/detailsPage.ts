import './productDetails.scss';
import { Image, Price, ProductProjection, LineItem } from '@commercetools/platform-sdk';
import { getProductDetails } from '../../api/getProductDetails';
import { createElement } from '../../utils/elementCreator';
import {
  ContentPageContainer,
  DetailsParam,
  ProductCardLink,
  ProductDescription,
  ProductInfo,
  ProductName,
  ProductPrice,
  ProductSlider,
  ProductPrices,
  ProductDiscount,
  ProductColor,
} from './types';
import { addSwiper } from '../../components/Swiper/swiperView';
import { initSlider } from '../../components/Swiper/swiperInitializer';
import { addItemToCart, createCart } from '../../api/shoppingList';
import { cartData } from '../basket/basketTypes';

export async function addItemToBasket(e: Event): Promise<void> {
  e.preventDefault();
  console.log(e.target, 'tyt');
  const btn = e.target as HTMLElement;
  const itemID = btn.getAttribute('data-id') as string;
  const data = localStorage.getItem('night-customer-cart');
  let newData;
  if (data) {
    let parsedData = JSON.parse(data);
    await addItemToCart(parsedData.id, Number(parsedData.version), itemID).then(({ body }) => {
      parsedData = body;
    });
    localStorage.setItem('night-customer-cart', JSON.stringify(parsedData));
  } else {
    await createCart().then(({ body }) => {
      newData = body;
    });
    await addItemToCart(newData.id, Number(newData.version), itemID).then(({ body }) => {
      newData = body;
    });
    localStorage.setItem('night-customer-cart', JSON.stringify(newData));
  }
}

export default async function showDetailsPage(root: HTMLElement, key: string): Promise<void> {
  const productsPage = createElement(DetailsParam, root);
  const pageContent = createElement(ContentPageContainer, productsPage);
  const productSlider = createElement(ProductSlider, pageContent);
  const productInfo = createElement(ProductInfo, pageContent);

  const productData = await getProductDetails(key);
  const datapath = productData.masterData.current;

  const productImagesData = datapath.masterVariant.images;
  const slides: string[] = [];
  productImagesData?.forEach((image: Image) => {
    const imageUrl = image.url;
    slides.push(imageUrl);
  });

  addSwiper(productSlider, slides);
  initSlider();

  const productTitle = createElement(ProductName, productInfo);
  productTitle.innerText = datapath.name['en-US'];

  const productDescription = createElement(ProductDescription, productInfo);
  if (datapath.description) {
    productDescription.innerText = datapath.description['en-US'];
  } else {
    productDescription.innerText = 'No description';
  }

  const priceList = createElement(ProductPrices, productInfo);
  // console.log(datapath);
  const productPricesData: Price[] | undefined = datapath.masterVariant.prices;
  productPricesData?.forEach((prices) => {
    // console.log(prices);
    const productPrice = createElement(ProductPrice, productInfo);
    productPrice.innerText = `${prices.value.centAmount / 100} ${prices.value.currencyCode}`;
    const productDiscount = createElement(ProductDiscount, priceList);
    if (prices.discounted?.value.centAmount) {
      const discountedAmount = prices.discounted.value.centAmount;
      const { currencyCode } = prices.value;
      const calculatedAmount = discountedAmount / 100;
      const displayText = `${calculatedAmount} ${currencyCode}`;
      productDiscount.innerText = displayText;
      productDiscount.setAttribute('keyD', `${prices.id}`);
      productPrice.setAttribute('keyF', `${prices.id}`);
    }
  });
  const prodLink = createElement(ProductCardLink, productInfo, addItemToBasket) as HTMLAnchorElement;
  prodLink.setAttribute('data-id', `${productData.id}`);
  const cart = cartData.lineItems;
  const desiredObject = cart.find((obj) => obj.productId === productData.id);
  if (desiredObject) {
    prodLink.classList.add('in-cart');
    prodLink.innerText ='Already in 🛒'
    prodLink.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
}
