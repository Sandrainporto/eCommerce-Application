import { Product, ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';

export async function getProductDetails(productId: string):Promise<Product> {
  const { body } = await apiRoot
    .products()
    .withKey({key: productId}) 
    .get()
    .execute();
  console.log(body)
  return body;
}


