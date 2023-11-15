import { apiRoot } from './createClient';
import { returnCustomerByEmail } from './findCustomer';
import { ClientResponse, Cart, CartDiscountValue, CartDiscountTarget } from '@commercetools/platform-sdk';
import { ApiRequest } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/requests-utils';

export function createCart(): Promise<ClientResponse<Cart>> {
  return apiRoot
    .carts()
    .post({
      body: {
        currency: 'USD',
      },
    })
    .execute();
}

export function addItemToCart(id: string, vers: number, itemID: string): Promise<ClientResponse<Cart>> {
  return apiRoot
    .carts()
    .withId({ ID: id })
    .post({
      body: {
        version: vers,
        actions: [{ action: 'addLineItem', productId: `${itemID}`, variantId: 1, quantity: 1 }],
      },
    })
    .execute();
}
export function removeItemFromCart(
  id: string,
  vers: number,
  itemID: string,
  value: number = 1,
): Promise<ClientResponse<Cart>> {
  return apiRoot
    .carts()
    .withId({ ID: id })
    .post({
      body: {
        version: vers,
        actions: [{ action: 'removeLineItem', lineItemId: `${itemID}`, quantity: value }],
      },
    })
    .execute();
}

export function deleteCart(id: string, version: number): ApiRequest<Cart> {
  return apiRoot
    .carts()
    .withId({ ID: id })
    .delete({ queryArgs: { version: version } });
}

export function getCartDiscount(key: string) {
  return apiRoot.cartDiscounts().withKey({ key: key }).get().execute();
}

export function setDiscount(
  id: string,
  version: number,
  value: CartDiscountValue,
  target: CartDiscountTarget,
): Promise<ClientResponse<Cart>> {
  return apiRoot
    .carts()
    .withId({ ID: id })
    .post({
      body: {
        version: version,
        actions: [
          {
            action: 'setDirectDiscounts',
            discounts: [
              {
                value: value,
                target: target,
              },
            ],
          },
        ],
      },
    })
    .execute();
}
