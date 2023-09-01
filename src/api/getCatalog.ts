import { Category } from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';

export function getCategoriesList(): Promise<void | Category[]> {
  return apiRoot
    .categories()
    .get()
    .execute()
    .then(({ body }) => {
      return body.results.filter(obj => obj.ancestors.length === 0)
    })
    .catch();
}

export function getSubCategoriesList(categoryId:string) {
  return apiRoot
    .categories()
    .get()
    .execute()
    .then(({ body }) => {
      const ancestors = body.results.filter(obj => obj.parent?.id === categoryId)
      // .map(subcateg=>subcateg.name['en-US']);
      // console.log(ancestors)
      return ancestors;
    })
    .catch();
}
getSubCategoriesList('26a16b07-3f68-4d31-8c3a-aaa239b28037')