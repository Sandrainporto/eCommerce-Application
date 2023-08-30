import { Category } from '@commercetools/platform-sdk';
import { WrapperParam } from '../types/types';
import { createElement } from '../utils/elementCreator';
import { routerInit } from '../router/router';
import { getCategoriesList } from '../api/getCatalog';
import { setData } from '../pages/main/mainView';

export default async function showApplication(): Promise<void> {
  const wrapper = createElement(WrapperParam, document.body);
  const categoryData: void | Category[] = await getCategoriesList();
  setData(wrapper, categoryData);
  routerInit();
}
