import { Product, ProductProjection, AttributeGroup } from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';
import { SearchParams } from '../pages/products/types';

export interface IResponseResult {
  total?: number;
  results: ProductProjection[];
}

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
  cardsNumber: number,
  categoryId?: string,
): Promise<IResponseResult> {
  const params = new URLSearchParams(document.location.search);
  getAttributes();
  const sort = params.get(SearchParams.sort) as string;
  const page = params.get(SearchParams.page);
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
        limit: cardsNumber,
        offset: (Number(page) - 1) * cardsNumber,
        'filter.query': [`categories.id:"${categoryId}"`, `${filterColors}`],
        sort,
        'text.en-us': searchText,
        fuzzy: true,
        fuzzyLevel,
      },
    })
    .execute();
  const result: IResponseResult = {
    total: body.total,
    results: body.results,
  };
  return result;
}

export async function getAllProducts(fuzzyLevel: number | undefined, cardsNumber: number): Promise<IResponseResult> {
  const params = new URLSearchParams(document.location.search);
  const sort = params.get(SearchParams.sort) as string;
  const page = params.get(SearchParams.page);
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
        limit: cardsNumber,
        offset: (Number(page) - 1) * cardsNumber,
        'filter.query': [`${filterColors}`],
        sort,
        'text.en-us': searchText,
        fuzzy: true,
        fuzzyLevel,
      },
    })
    .execute();
  const result: IResponseResult = {
    total: body.total,
    results: body.results,
  };
  return result;
}
