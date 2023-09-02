import { Category } from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';

export function getProductsList() {
  return apiRoot
    .productProjections()
    .get()
    .execute()
    .then(({ body }) => {
      console.log(body.results[1].categories)
      return body.results
    })
    .catch();
}

