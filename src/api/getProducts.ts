import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';

export function getProductsList(categoryId:string): Promise<ProductProjection[]>{
  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs:{
        filter: `categories.id:"${categoryId}"`
      }
    })
    .execute()
    .then(({ body }) => {
      console.log(body.results)
      return body.results
    })
    .catch();
}

// categories.id:"{id}"