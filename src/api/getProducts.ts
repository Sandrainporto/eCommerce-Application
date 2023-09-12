import { Product, ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';

export async function getProductsList(
  categoryId: string,
  sortparam: string[],
  searchText: string,
  filter: string[],
  fuzzyLevel: number | undefined,
): Promise<ProductProjection[]> {
  const filterColors = filter.length !== 0 ? `variants.attributes.Color:${filter.map((el) => `"${el}"`)}` : '';
  const { body } = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        // filter: `categories.id:"${categoryId}"`,
        'filter.query': [`categories.id:"${categoryId}"`, `${filterColors}`],
        sort: sortparam,
        'text.en-us': searchText,
        fuzzy: true,
        fuzzyLevel,
      },
    })
    .execute();
  return body.results;
}

export async function getAllProducts(
  // sortparam: string[],
  // searchText: string,
  // filter: string[],
  // fuzzyLevel: number | undefined,
): Promise<ProductProjection[]> {
  // const filterColors = filter.length !== 0 ? `variants.attributes.Color:${filter.map((el) => `"${el}"`)}` : '';
  const { body } = await apiRoot
    .productProjections()
    .get({
      queryArgs: {
        limit: 100,
        offset: 0,
      },
    })
    .execute();
    console.log(body)
  return body.results;
}
