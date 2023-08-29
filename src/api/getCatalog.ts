import { Category, CategoryPagedQueryResponse } from '@commercetools/platform-sdk';
import createCategoriesCard from '../components/Categories/categoryCard';
import { apiRoot } from './createClient';
import { createSublinks } from '../components/Navigaition/navigationView';

export function getCategoriesList(container?: HTMLElement): Promise<void | Category[]> {
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
    .catch(console.error);
}

// export const getCategoriesList2 = ():Promise<void | Category[]> => {
//   return apiRoot
//     .categories()
//     .get({
//       queryArgs: {
//         expand: ['parent'],
//       },
//     })
//     .execute()
//     .then(({ body }) => {
//    return body.results
//         }
//     )
//     .catch(console.error);
// };
