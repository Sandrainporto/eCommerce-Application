import { Product, ProductProjection, AttributeGroup } from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';
import { SearchParams } from '../pages/products/types';

export async function getAttributes(): Promise<AttributeGroup[]> {
  const { body } = await apiRoot
    .attributeGroups()
    .get({
      queryArgs: {},
    })
    .execute();
  console.log('получаем атрибуты');
  console.log(body.results);
  return body.results;
}

export async function getProductsList(
  fuzzyLevel: number | undefined,
  categoryId?: string,
): Promise<ProductProjection[]> {
  const params = new URLSearchParams(document.location.search);
  getAttributes();
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

export async function getAllProducts(fuzzyLevel: number | undefined): Promise<ProductProjection[]> {
  console.log('Во всех продуктах');
  const params = new URLSearchParams(document.location.search);
  const sort = params.get(SearchParams.sort) as string;
  const filterColors = params.get(SearchParams.filter)
    ? `variants.attributes.Color:${params
        .get(SearchParams.filter)
        ?.split(',')
        .map((el) => `"${el}"`)}`
    : '';
  const searchText = params.get(SearchParams.search) as string;
  console.log(filterColors);
  const { body } = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit: 100,
        offset: 0,
        'filter.query': [`${filterColors}`],
        sort,
        'text.en-us': searchText,
        fuzzy: true,
        fuzzyLevel,
      },
    })
    .execute();
  return body.results;
}
