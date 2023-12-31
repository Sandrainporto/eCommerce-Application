import { Product, ProductProjection, AttributeGroup } from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';
import { SearchParams } from '../pages/products/types';

export interface IResponseResult {
  total?: number;
  results: ProductProjection[];
}

export async function getProductsList(
  fuzzyLevel: number | undefined,
  cardsNumber: number,
  categoryId?: string,
): Promise<IResponseResult> {
  const params = new URLSearchParams(document.location.search);
  const sort = params.get(SearchParams.sort) as string;
  const page = params.get(SearchParams.page);
  const filterColors = params.get(SearchParams.filterColors)
    ? `variants.attributes.Color:${params
        .get(SearchParams.filterColors)
        ?.split(',')
        .map((el) => `"${el}"`)}`
    : '';
  const filterTypes = params.get(SearchParams.filterTypes)
    ? `variants.attributes.Magic:${params
        .get(SearchParams.filterTypes)
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
  const filterColors = params.get(SearchParams.filterColors)
    ? `variants.attributes.Color:${params
        .get(SearchParams.filterColors)
        ?.split(',')
        .map((el) => `"${el}"`)}`
    : '';
  const filterTypes = params.get(SearchParams.filterTypes)
    ? `variants.attributes.Magic:${params
        .get(SearchParams.filterTypes)
        ?.split(',')
        .map((el) => `"${el}"`)}`
    : '';
    const filterCategory = params.get(SearchParams.filterCategory)
    ? `variants.attributes.Type:${params
        .get(SearchParams.filterCategory)
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
        'filter.query': [`${filterColors}`, `${filterTypes}`, `${filterCategory}`],
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

export async function getAllProductsDiscounted(fuzzyLevel: number | undefined, cardsNumber: number): Promise<IResponseResult> {
  const params = new URLSearchParams(document.location.search);
  const sort = params.get(SearchParams.sort) as string;
  const page = params.get(SearchParams.page);
  const filterColors = params.get(SearchParams.filterColors)
    ? `variants.attributes.Color:${params
        .get(SearchParams.filterColors)
        ?.split(',')
        .map((el) => `"${el}"`)}`
    : '';
  const filterTypes = params.get(SearchParams.filterTypes)
    ? `variants.attributes.Magic:${params
        .get(SearchParams.filterTypes)
        ?.split(',')
        .map((el) => `"${el}"`)}`
    : '';
    const filterCategory = params.get(SearchParams.filterCategory)
    ? `variants.attributes.Type:${params
        .get(SearchParams.filterCategory)
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
        'filter.query': [`${filterColors}`, `${filterTypes}`, `${filterCategory}`],
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