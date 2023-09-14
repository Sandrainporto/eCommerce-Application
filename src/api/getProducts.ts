import { Product, ProductProjection } from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';
import { SearchParams } from '../pages/products/types';

export async function getProductsList(
  categoryId: string,
  fuzzyLevel: number | undefined,
): Promise<ProductProjection[]> {
  const params = new URLSearchParams(document.location.search);
  const sort = params.get(SearchParams.sort) as string;
  const filterColors = params.get(SearchParams.filter)
    ? `variants.attributes.Color:${params
        .get(SearchParams.filter)
        ?.split(',')
        .map((el) => `"${el}"`)}`
    : '';
  const searchText = params.get(SearchParams.search) as string;
  const { body } = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        'filter.query': [`categories.id:"${categoryId}"`, `${filterColors}`],
        sort,
        'text.en-us': searchText,
        fuzzy: true,
        fuzzyLevel,
      },
    })
    .execute();
  return body.results;
}

export async function getAllProducts(
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
        limit: 100,
        offset: 0,
        // filter: `categories.id:"${categoryId}"`,
        'filter.query': [`${filterColors}`],
        sort: sortparam,
        'text.en-us': searchText,
        fuzzy: true,
        fuzzyLevel,
      },
    })
    .execute();
    console.log(body)
  return body.results;
}
