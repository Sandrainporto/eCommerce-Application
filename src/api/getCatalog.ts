import { Category } from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';

export async function getCategoriesList(): Promise<void | Category[]> {
  const { body } = await apiRoot.categories().get().execute();
  return body.results.filter((obj) => obj.ancestors.length === 0);
}

export async function getSubCategoriesList(categoryId: string): Promise<Category[]> {
  const { body } = await apiRoot.categories().get().execute();
  const ancestors = body.results.filter((obj) => obj.parent?.id === categoryId);
  return ancestors;
}
