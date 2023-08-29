import { Category } from '@commercetools/platform-sdk';
import { WrapperParam } from '../types/types';
import { createElement } from '../utils/elementCreator';
import { initRouter } from '../router/routes';
import { init } from '../router/router';
import { getCategoriesList } from '../api/getCatalog';

export default async function showApplication(): Promise<void> {
  const wrapper = createElement(WrapperParam, document.body);

  const categotyData: void | Category[] = await getCategoriesList();
  // Старый роутер пока отключил
  // initRouter(wrapper);
  init(wrapper, categotyData);
}
