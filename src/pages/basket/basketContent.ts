import { createElement } from '../../utils/elementCreator';
import {
  BasketCatalogLink,
  BasketClearBtn,
  BasketContentBlock,
  BasketHeader,
  BasketItemBlock,
  BasketItemDelBtn,
  BasketItemImg,
  BasketItemMinMaxVal,
  BasketItemName,
  BasketItemPrice,
  BasketNumBlock,
  BasketNumCur,
  BasketNumMax,
  BasketNumMin,
  BasketPromoBlock,
  BasketPromoBtn,
  BasketPromoHint,
  BasketPromoInput,
  BasketPromoLabel,
  BasketTotalBlock,
  emptyBasket,
} from './basketTypes';
import { Cart, LineItem } from '@commercetools/platform-sdk';
import { addItemToCart, deleteCart, getCartDiscount, removeItemFromCart, setDiscount } from '../../api/shoppingList';
import { FormHint } from '../login/authTypes';
import { addHintText } from '../../api/loginCustomer';
import { ItemsInCart, NavigationClasses } from '../../components/Navigaition/navigationTypes';

function showTotal(number: number, value: number, currency: string): void {
  const rootBlock = document.querySelector(`.${BasketTotalBlock.classNames}`) as HTMLElement;
  if(number === undefined){
    number = 0
  }
  rootBlock.textContent = `${number} products,   total value:   ${value / 100} ${currency}`;
  const itemsNumInCart= document.querySelector(`.${ItemsInCart.classNames}`)as HTMLElement;
  itemsNumInCart.innerText = `${number}`;

  

}

async function changeQuantity(e: Event): Promise<void> {
  // console.log(e.target, BasketItemDelBtn.classNames);
  const btn = e.target as HTMLElement;
  const btnBlock = btn.parentElement as HTMLElement;
  const itemId = btn.getAttribute('data-id') as string;
  const value = btnBlock.querySelector(`.${BasketNumCur.classNames}`) as HTMLElement;
  let valueNum = Number(value?.textContent);
  let cart = JSON.parse(localStorage.getItem('night-customer-cart') as string);
  if (btn.classList.contains(`${BasketNumMin.classNames}`)) {
    if (valueNum > 1) {
      // console.log(cart.id, cart.version, itemId);
      valueNum -= 1;
      value.textContent = `${valueNum}`;
      await removeItemFromCart(cart.id, cart.version, itemId).then(({ body }) => {
        cart = body;
        localStorage.setItem('night-customer-cart', JSON.stringify(cart));
      });
      await showTotal(cart.totalLineItemQuantity, cart.totalPrice.centAmount, cart.totalPrice.currencyCode);
    }
  }
  if (btn.classList.contains(`${BasketNumMax.classNames}`)) {
    if (valueNum < 99) {
      valueNum += 1;
      value.textContent = `${valueNum}`;
      await addItemToCart(cart.id, cart.version, itemId).then(({ body }) => {
        cart = body;
        localStorage.setItem('night-customer-cart', JSON.stringify(cart));
      });
      await showTotal(cart.totalLineItemQuantity, cart.totalPrice.centAmount, cart.totalPrice.currencyCode);
    }
  }
  if (btn.classList.contains(`${BasketItemDelBtn.classNames}`)) {
    const lineItemId = btnBlock.querySelector(`.${BasketNumMin.classNames}`)?.getAttribute('data-id') as string;
    await removeItemFromCart(cart.id, cart.version, lineItemId, Number(value.textContent)).then(({ body }) => {
      cart = body;
      localStorage.setItem('night-customer-cart', JSON.stringify(cart));
    });
    await btnBlock.remove();

    await showTotal(cart.totalLineItemQuantity, cart.totalPrice.centAmount, cart.totalPrice.currencyCode);

  }
}

function createBasketItemBlock(root: HTMLElement, cartItem: LineItem): void {
  // console.log(cartItem);

  const basketItemBlock = createElement(BasketItemBlock, root);
  basketItemBlock.setAttribute('data-id', `${cartItem.id}`);
  const img = createElement(BasketItemImg, basketItemBlock);
  if (cartItem.variant.images && cartItem.variant.images?.length > 0) {
    img.setAttribute('src', `${cartItem.variant.images[0].url}`);
    // console.log(cartItem.variant.images[0].url, cartItem.name['en-US']);
  }
  const itemName = createElement(BasketItemName, basketItemBlock);
  itemName.textContent = `${cartItem.name['en-US']}`;
  const itemPrice = createElement(BasketItemPrice, basketItemBlock);
  if (cartItem.price.discounted) {
    itemPrice.textContent = `${cartItem.price.discounted.value.centAmount / 100} ${
      cartItem.price.discounted.value.currencyCode
    }`;
  } else {
    itemPrice.textContent = `${cartItem.price.value.centAmount / 100} ${cartItem.price.value.currencyCode}`;
  }

  const numberBlock = createElement(BasketNumBlock, basketItemBlock, changeQuantity);
  const removeItem = createElement(BasketNumMin, numberBlock);
  removeItem.setAttribute('data-id', `${cartItem.id}`);
  const currentNum = createElement(BasketNumCur, numberBlock);
  currentNum.textContent = `${cartItem.quantity}`;
  const adddItembtn = createElement(BasketNumMax, numberBlock);
  adddItembtn.setAttribute('data-id', `${cartItem.productId}`);
  const removeBtn = createElement(BasketItemDelBtn, basketItemBlock, changeQuantity);
}

function showEmptyBasket(root: HTMLElement): void {
  root.innerHTML = emptyBasket;
  createElement(BasketCatalogLink, root);
}

async function clearBasket(): Promise<void> {
  const container = document.querySelector(`.${BasketContentBlock.classNames}`) as HTMLElement;
  const data = JSON.parse(localStorage.getItem('night-customer-cart') as string) as Cart;
  await deleteCart(data.id, data.version);
  await localStorage.removeItem('night-customer-cart');
  await showEmptyBasket(container);
  const itemsNumInCart= document.querySelector(`.${ItemsInCart.classNames}`)as HTMLElement;
  itemsNumInCart.innerText = `0`;
  
}

async function activatePromo(e: Event): Promise<void> {
  e.preventDefault();
  const btn = e.target as HTMLElement;
  const input = btn.previousElementSibling as HTMLInputElement;
  const hint = btn.parentElement?.nextElementSibling as HTMLElement;
  let data = JSON.parse(localStorage.getItem('night-customer-cart') as string) as Cart;
  hint.textContent = '';
  try {
    let target;
    let value;
    await getCartDiscount(input.value).then((data) => {
      target = data.body.target;
      value = data.body.value;
    });
    await setDiscount(data.id, data.version, value, target).then(({ body }) => {
      data = body;
      localStorage.setItem('night-customer-cart', JSON.stringify(data));
    });
    await showTotal(data.totalLineItemQuantity as number, data.totalPrice.centAmount, data.totalPrice.currencyCode);
    addHintText(`${BasketPromoHint.active}`, hint);
  } catch {
    addHintText(`${BasketPromoHint.disable}`, hint);
  }
  // console.log(e.target);
}

function createPromoBlock(root: HTMLElement): void {
  const block = createElement(BasketPromoBlock, root);
  createElement(BasketPromoLabel, block);
  createElement(BasketPromoInput, block);
  createElement(BasketPromoBtn, block, activatePromo);
  createElement(FormHint, root);
}

async function fillBasketContent(root: HTMLElement, data?: Cart | null): Promise<void> {
  if (data && data.totalLineItemQuantity && data.totalLineItemQuantity > 0) {
    const cartItems = data.lineItems;
    createElement(BasketTotalBlock, root);
    await showTotal(data.totalLineItemQuantity, data.totalPrice.centAmount, data.totalPrice.currencyCode);
    await cartItems.forEach((item) => createBasketItemBlock(root, item));
    createPromoBlock(root);
    createElement(BasketClearBtn, root, clearBasket);
  } else {
    // console.log(root);
    showEmptyBasket(root);
  }
}
export async function showBasketContent(root: HTMLElement): Promise<void> {
  const data = await localStorage.getItem('night-customer-cart');
  let parsedData;
  if (data) parsedData = JSON.parse(data) as Cart;
  createElement(BasketHeader, root);
  const basketContent = createElement(BasketContentBlock, root);
  fillBasketContent(basketContent, parsedData);
}
