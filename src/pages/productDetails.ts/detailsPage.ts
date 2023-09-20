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
import { addItemToCart, createCart, removeItemFromCart } from '../../api/shoppingList';
import { cartData } from '../basket/basketTypes';
import { addRemoveBtn, addToCartBtn } from '../products/productViewPage';
import { ProductCartLink, ProductCartLinkRemove } from '../products/types';
import { ItemsInCart } from '../../components/Navigaition/navigationTypes';

export async function addItemToBasket(e: Event): Promise<void> {
  e.preventDefault();
  console.log(e.target, 'tyt');
  const btn = e.target as HTMLElement;
  btn.classList.add('hiden');
  const removeBtn = document.querySelector(`[data-id-remove='${btn.getAttribute('data-id')}']`);
  removeBtn?.classList.remove('hiden');
  // removeBtn?.classList.add('in-cart');
  // btn.innerText ='Remove from 🛒'
  // btn.classList.add('in-cart')
  const itemID = btn.getAttribute('data-id') as string;
  const data = localStorage.getItem('night-customer-cart');
  const itemsNumInCart= document.querySelector(`.${ItemsInCart.classNames}`)as HTMLElement;
  itemsNumInCart.innerText = `${+itemsNumInCart.innerText+1}`;
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
//   btn.removeEventListener('click', addItemToBasket);
//   btn.addEventListener('click', () => {
//     console.log('click2')
//     let cartData = JSON.parse(localStorage.getItem('night-customer-cart')as string);

//       const cart = cartData.lineItems;
//       const desiredObject = cart.find((obj) => obj.productId === btn.id);
//   //     if (desiredObject) {
//   //   removeItemFromCart(cartData.id, cartData.version, desiredObject.id, desiredObject.quantity).then(({ body }) => {
//   //     cartData = body;
//   //     localStorage.removeItem('night-customer-cart');
//   //     localStorage.setItem('night-customer-cart', JSON.stringify(cartData));
//   //   });
//   // }
// })

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
  const removeBtn = createElement(ProductCartLinkRemove, productInfo) as HTMLAnchorElement;

 addRemoveBtn(removeBtn, productData.id, prodLink)
 

    if (localStorage.getItem('night-customer-cart')) {
      let cartData = JSON.parse(localStorage.getItem('night-customer-cart') as string);
  console.log(cartData)
      if (cartData.lineItems) {
        const cart = cartData.lineItems;
        const desiredObject = cart.find((obj) =>obj.productId === productData.id);

        if (desiredObject) {
          prodLink.classList.add('hiden')
          removeBtn.classList.remove('hiden')
        }
      }
    }
  // addToCartBtn(prodLink, productData.id)

}
