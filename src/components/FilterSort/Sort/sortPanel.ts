import './sortPanel.scss';
import { createElement } from '../../../utils/elementCreator';
import { inputCreator } from '../../../utils/inputCreator';
import {
  SortBlockParam,
  SearchContentParam,
  SortContentParam,
  SearchFieldInput,
  SearchFieldLabel,
  SearchFieldButton,
  SortSelect,
} from './sortTypes';
import { SearchParams } from '../../../pages/products/types';

const PLACEHOLDERS = {
  search: 'Enter first 4 letters',
};

const BUTTONS = {
  search: 'SEARCH',
};

let ActiveSelect: number;

const SELECTS = ['Name A-Z', 'Name Z-A', 'Price High', 'Price Low'];

const createSearchInput = (root: HTMLElement): HTMLElement => {
  const searchPanel = createElement(SearchContentParam, root);
  const search = inputCreator(SearchFieldLabel, SearchFieldInput, searchPanel);
  const inputField = search.querySelector(`.${SearchFieldInput.classNames}`) as HTMLInputElement;
  if (inputField) {
    inputField.placeholder = PLACEHOLDERS.search;
  }
  return searchPanel;
};

const createSearchButton = (root: HTMLElement, callback: { (value: string): void; (arg0: string): void }): void => {
  const button = createElement(SearchFieldButton, root);
  button.innerText = BUTTONS.search;
  const input = root.querySelector(`.${SearchFieldInput.classNames}`) as HTMLInputElement;
  button.addEventListener('click', () => {
    const value = input?.value;
    callback(value);
  });
};

const createSortInput = (root: HTMLElement, callback: { (value: string): void; (arg0: string): void }): HTMLElement => {
  const sortPanel = createElement(SortContentParam, root);
  const select = createElement(SortSelect, sortPanel);
  if (!ActiveSelect) {
    ActiveSelect = 0;
  }
  SELECTS.forEach((el, index) => {
    const option = new Option(el, `${index}`);
    if (index === ActiveSelect) {
      option.selected = true;
    }
    select.append(option);
  });

  select.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement;
    callback(target?.value);
  });

  return select;
};

export const showSortPanel = (
  root: HTMLElement,
  SortCallBack: (value: string) => void,
  SearchCallBack: (value: string) => void,
): void => {
  const url = new URL(`${window.location.href}`);
  if (url.searchParams.get(SearchParams.sort)) {
    const searchParams = url.searchParams.get(SearchParams.sort);
    if (searchParams === 'name.en-us asc') {
      ActiveSelect = 0;
    }
    if (searchParams === 'name.en-us desc') {
      ActiveSelect = 1;
    }
    if (searchParams === 'price asc') {
      ActiveSelect = 2;
    }
    if (searchParams === 'price desc') {
      ActiveSelect = 3;
    }
  }
  const wrapper = createElement(SortBlockParam, root);
  const searchInput = createSearchInput(wrapper);

  createSearchButton(searchInput, SearchCallBack);
  createSortInput(wrapper, SortCallBack);
};
