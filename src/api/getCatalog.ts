import { Category } from '@commercetools/platform-sdk';
import createCategoriesCard from '../components/Categories/categoryCard';
import { apiRoot } from './createClient';
import { createSublinks } from '../components/Navigaition/navigationView';

export const getCategoriesList = (container?: HTMLElement) => {
  return apiRoot
    .categories()
    .get({
      queryArgs: {
        expand: ['parent'],
      },
    })
    .execute()
    .then(({ body }) => {
      if (container)
        if (body.results.length === 0) {
          container.innerHTML = `No categories found`;
        } else {
          const categoriesData: Category[] = body.results;
          const catalogeLink: HTMLLinkElement | null = document.querySelector('#catalog');
          if (catalogeLink) {
            createSublinks(categoriesData, catalogeLink);
          }

          createCategoriesCard(container, categoriesData);
        }
    })
    .catch(console.error);
};
