import { Category } from '@commercetools/platform-sdk';
import { DataType, WrapperParam } from '../types/types';
import { createElement } from '../utils/elementCreator';
import { routerInit } from '../router/router';
import { getCategoriesList, getSubCategoriesList } from '../api/getCatalog';
import { setData } from '../pages/main/mainView';
import { getProductsList } from '../api/getProducts';

export default async function showApplication(): Promise<void> {
  const wrapper = createElement(WrapperParam, document.body);
  const categoryData: void | Category[] = await getCategoriesList();
  let subCategoriesList: Category[][];
  let data: DataType[];

  if (categoryData) {
    subCategoriesList = await Promise.all(categoryData.map((el: Category) => getSubCategoriesList(el.id)));
    data = subCategoriesList.map((el, index) => {
      return {
        category: categoryData[index],
        subcategory: el,
      };
    });
    setData(wrapper, data);
  }

  routerInit();
  getProductsList('1a646b6c-dbe6-401f-ab7d-ddcdae8a3bc6');
}
