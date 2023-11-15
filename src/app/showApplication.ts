import { Category } from '@commercetools/platform-sdk';
import { DataType, WrapperParam } from '../types/types';
import { createElement } from '../utils/elementCreator';
import { routerInit } from '../router/router';
import { getCategoriesList, getSubCategoriesList } from '../api/getCatalog';
import { setData } from '../pages/main/mainView';

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
}
