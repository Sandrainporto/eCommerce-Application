import { ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';

export async function getProductsList(categoryId: string, sortparam:string[], searchText:string, fuzzyLevel:number|undefined): Promise<ProductProjection[]> {
  const { body } = await apiRoot
    .productProjections()
    .search()
    
    .get({
      queryArgs: {
        filter: `categories.id:"${categoryId}"`,
        sort:sortparam,
        "text.en-us": searchText,
        fuzzy:true,
        fuzzyLevel: fuzzyLevel
      },
    })
    .execute();
  return body.results;
}
