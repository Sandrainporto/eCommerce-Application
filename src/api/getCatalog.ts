import { Category } from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';

export function getCategoriesList(): Promise<void | Category[]> {
  return apiRoot
    .categories()
    .get({
      queryArgs: {
        expand: ['parent'],
      },
    })
    .execute()
    .then(({ body }) => {
      return body.results;
    })
    .catch();
}
