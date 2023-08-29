import { WrapperParam } from '../types/types';
import { createElement } from '../utils/elementCreator';
import { initRouter } from '../router/routes';
import { getCategoriesList } from '../api/getCatalog';
import { Category } from '@commercetools/platform-sdk';

export default async function showApplication(): Promise<void> {
  const wrapper = createElement(WrapperParam, document.body);
  const categotyData: void | Category[] = await getCategoriesList()
  initRouter(wrapper, categotyData);

}
