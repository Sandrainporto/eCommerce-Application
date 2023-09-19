export enum BasketPageParam {
  elemTag = 'main',
  classNames = 'basket_page',
  id = 'cart',
}

export enum BasketHeader {
  elemTag = 'h3',
  classNames = 'basket_header',
  innerText = 'Basket',
}
export enum BasketContentBlock {
  elemTag = 'div',
  classNames = 'basket_content-block',
}

export const emptyBasket = 'Your basket is empty, please check our ';

export enum BasketItemBlock {
  elemTag = 'div',
  classNames = 'basket_item-block',
}
export enum BasketItemImg {
  elemTag = 'img',
  classNames = 'item_img',
}
export enum BasketItemName {
  elemTag = 'h3',
  classNames = 'item_name',
}

export enum BasketItemPrice {
  elemTag = 'div',
  classNames = 'item_price',
}

export enum BasketNumBlock {
  elemTag = 'div',
  classNames = 'basket_num-block',
}
export enum BasketNumMin {
  elemTag = 'div',
  classNames = 'basket_num_min',
  innerText = '-',
}
export enum BasketNumMax {
  elemTag = 'div',
  classNames = 'basket_num_max',
  innerText = '+',
}
export enum BasketNumCur {
  elemTag = 'div',
  classNames = 'buscet_num_cur',
}

export enum BasketItemMinMaxVal {
  min = 1,
  max = 100,
}
export enum BasketItemDelBtn {
  elemTag = 'div',
  classNames = 'item_del-btn',
}
export enum BasketTotalBlock {
  elemTag = 'h4',
  classNames = 'basket_total',
}
export enum BasketCatalogLink {
  elemTag = 'a',
  classNames = 'basket_catalog-link',
  innerText = 'Catalog',
  href = '/catalog',
}
export enum BasketClearBtn {
  elemTag = 'button',
  classNames = 'basket_clear-btn',
  innerText = 'Clear basket',
}
export enum BasketPromoBlock {
  elemTag = 'form',
  classNames = 'basket_promo-block',
}
export enum BasketPromoInput {
  elemTag = 'input',
  type = 'text',
  id = 'promo',
  classNames = 'promo_input',
  placeholder = 'Write: midnight2023',
}
export enum BasketPromoLabel {
  elemTag = 'label',
  for = 'promo',
  classNames = 'promo_label',
  innerText = 'Promocode:',
}
export enum BasketPromoBtn {
  elemTag = 'button',
  classNames = 'promo_btn',
  innerText = 'ACTIVATE',
}
export enum BasketPromoHint {
  active = 'Promocode activated, discount 15%',
  disable = 'Promocode doesnt exist',
}
export const cartData = JSON.parse(localStorage.getItem('night-customer-cart') as string);

export enum BasketTotalValue {
  elemTag = 'span',
  classNames = 'dashed',
}
export enum BasketTotalValueNew {
  elemTag = 'span',
}
