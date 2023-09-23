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
} from './types';
import { addSwiper } from '../../components/Swiper/swiperView';
import { initSlider } from '../../components/Swiper/swiperInitializer';
import { addItemToCart, createCart, removeItemFromCart } from '../../api/shoppingList';
import { ProductCartLinkRemove } from '../products/types';
import { ItemsInCart } from '../../components/Navigaition/navigationTypes';

export async function addItemToBasket(e: Event): Promise<void> {
  e.preventDefault();
  const btn = e.target as HTMLElement;
  btn.classList.add('hiden');
  const removeBtn = document.querySelector(`[data-id-remove='${btn.getAttribute('data-id')}']`);
  removeBtn?.classList.remove('hiden');
  const itemID = btn.getAttribute('data-id') as string;
  const data = localStorage.getItem('night-customer-cart');
  const itemsNumInCart = document.querySelector(`.${ItemsInCart.classNames}`) as HTMLElement;
  itemsNumInCart.innerText = `${+itemsNumInCart.innerText + 1}`;
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

export function addToCartBtn(linkArg: HTMLElement, id: string): void {
  const link = { ...linkArg };
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

export function addRemoveBtn(btn: HTMLElement, id: string, cartButton: HTMLAnchorElement): void {
  btn.setAttribute('data-id-remove', `${id}`);

  btn.addEventListener('click', () => {
    if (localStorage.getItem('night-customer-cart')) {
      let cartData = JSON.parse(localStorage.getItem('night-customer-cart') as string);
      if (cartData.lineItems) {
        const cart = cartData.lineItems;
        const desiredObject = cart.find((obj) => obj.productId === id);

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
        cartButton.classList.remove('hiden');
        btn.classList.add('hiden');
      }
    }
  });
  btn.classList.add('hiden');
}

// eslint-disable-next-line max-lines-per-function
export default async function showDetailsPage(root: HTMLElement, key: string): Promise<void> {
  const productsPage = createElement(DetailsParam, root);
  const pageContent = createElement(ContentPageContainer, productsPage);
  const productSlider = createElement(ProductSlider, pageContent);
  const productInfo = createElement(ProductInfo, pageContent);
  const productData = await getProductDetails(key);
  const dataPath = productData.masterData.current;
  const productImagesData = dataPath.masterVariant.images;
  const slides: string[] = [];
  productImagesData?.forEach((image: Image) => {
    const imageUrl = image.url;
    slides.push(imageUrl);
  });
  addSwiper(productSlider, slides);
  initSlider();
  const productTitle = createElement(ProductName, productInfo);
  productTitle.innerText = dataPath.name['en-US'];
  const productDescription = createElement(ProductDescription, productInfo);
  if (dataPath.description) {
    productDescription.innerText = dataPath.description['en-US'];
  } else {
    productDescription.innerText = 'No description';
  }
  const priceList = createElement(ProductPrices, productInfo);
  const productPricesData: Price[] | undefined = dataPath.masterVariant.prices;
  productPricesData?.forEach((prices) => {
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
  const removeBtn = createElement(ProductCartLinkRemove, productInfo) as HTMLAnchorElement;
  addRemoveBtn(removeBtn, productData.id, prodLink);
  if (localStorage.getItem('night-customer-cart')) {
    const cartData = JSON.parse(localStorage.getItem('night-customer-cart') as string);
    if (cartData.lineItems) {
      const cart = cartData.lineItems;
      const desiredObject = cart.find((obj: { productId: string }) => obj.productId === productData.id);
      if (desiredObject) {
        prodLink.classList.add('hiden');
        removeBtn.classList.remove('hiden');
      }
    }
  }
}
