import { createElement } from '../../../utils/elementCreator';
import './sortPanel.scss';
import {
  SortBlockParam,
  SearchContentParam,
  SortContentParam,
  SearchFieldInput,
  SearchFieldLabel,
  SearchFieldButton,
  SortSelect,
} from './sortTypes';
import { inputCreator } from '../../../utils/inputCreator';

const PLACEHOLDERS = {
  search: 'Search',
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

const createSearchButton = (root: HTMLElement): void => {
  const button = createElement(SearchFieldButton, root);
  button.innerText = BUTTONS.search;
  const input = root.querySelector(`.${SearchFieldInput.classNames}`) as HTMLInputElement;
  button.addEventListener('click', () => {
    console.log(input?.value);
    // Тут надо вызвать колбек
  });
};

const createSortInput = (root: HTMLElement): HTMLElement => {
  const sortPanel = createElement(SortContentParam, root);
  const select = createElement(SortSelect, sortPanel);
  if (!ActiveSelect) {
    ActiveSelect = 1;
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
    console.log(target?.value);
    // Тут надо вызвать колбек
  });

  return select;
};

export const showSortPanel = (root: HTMLElement): void => {
  const wrapper = createElement(SortBlockParam, root);
  const searchInput = createSearchInput(wrapper);
  const button = createSearchButton(searchInput);
  const select = createSortInput(wrapper);
};
