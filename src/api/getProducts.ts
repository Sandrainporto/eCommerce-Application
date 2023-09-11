import { ProductProjection } from '@commercetools/platform-sdk';
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
