import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';

export async function getProductsList(categoryId: string, sortparam:string[]): Promise<ProductProjection[]> {
  const { body } = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: `categories.id:"${categoryId}"`,
        sort:sortparam
      },
    })
    .execute();
  console.log(body.results)
  return body.results;
}

// categories.id:"{id}"
