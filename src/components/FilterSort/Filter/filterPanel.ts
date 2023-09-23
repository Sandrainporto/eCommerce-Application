import './filterPanel.scss';
import { createElement } from '../../../utils/elementCreator';
import {
  FilterBlockParam,
  CheckBoxFilterContainer,
  FilterInputColorCheckbox,
  FilterLabelColorCheckbox,
  ElementContainer,
  FilterButton,
  LegendColors,
  LegendTypes,
  LegendCategory,
} from './filterTypes';
import { SearchParams } from '../../../pages/products/types';

export const COLORS = ['black', 'brown', 'red', 'green', 'blue', 'yellow', 'purple', 'white'];
export const CATEGORY = ['spells', 'potions', 'cauldrons', 'ingredients', 'attributes', 'grimoires'];
export const MAGIC = ['dark', 'neutral', 'white '];

const BUTTONS = {
  filter: 'FILTER',
  reset: 'RESET',
};

const createColorCheckbox = (root: HTMLElement, array: string[]): HTMLElement => {
  const checkboxContainer = createElement(CheckBoxFilterContainer, root);
  if (array === COLORS) {
    const checkboxLegend = createElement(LegendColors, checkboxContainer);
  } else if (array === MAGIC) {
    const checkboxLegend = createElement(LegendTypes, checkboxContainer);
  } else if (array === CATEGORY) {
    const checkboxLegend = createElement(LegendCategory, checkboxContainer);
  }

  const url = new URL(window.location.href);
  const colors = url.searchParams.get(SearchParams.filterColors);
  const magic = url.searchParams.get(SearchParams.filterTypes);

  array.forEach((el) => {
    const container = createElement(ElementContainer, checkboxContainer);
    const label = createElement(FilterLabelColorCheckbox, container) as HTMLLabelElement;
    label.innerText = el;
    label.htmlFor = `color-${el}`;
    const checkbox = createElement(FilterInputColorCheckbox, container) as HTMLInputElement;
    checkbox.setAttribute('checked', 'false');
    checkbox.id = `color-${el}`;
    checkbox.value = el;
    if (colors?.includes(el) || magic?.includes(el)) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  });
  return checkboxContainer;
};

const createFilterButton = (root: HTMLElement, callback: { (value: string[]): void; (arg0: string[]): void }): void => {
  const button = createElement(FilterButton, root);
  button.innerText = BUTTONS.filter;
  button.addEventListener('click', () => {
    const result: string[] = [];
    const checkboxes = document.querySelectorAll(`.${FilterInputColorCheckbox.classNames}`);
    checkboxes.forEach((el) => {
      const element = el as HTMLInputElement;
      if (element.checked) {
        result.push(element.value);
      }
    });
    callback(result);
  });
};

const createResetButton = (root: HTMLElement, callback: { (value: string[]): void; (arg0: string[]): void }): void => {
  const button = createElement(FilterButton, root);
  button.innerText = BUTTONS.reset;
  button.addEventListener('click', () => {
    const result: string[] = [];
    const checkboxes = document.querySelectorAll(`.${FilterInputColorCheckbox.classNames}`);
    checkboxes.forEach((el) => {
      const element = el as HTMLInputElement;
      element.checked = false;
    });
    callback(result);
  });
};

export const showFilterPanel = (root: HTMLElement, FilterCallBack: (value: string[]) => void): void => {
  const wrapper = createElement(FilterBlockParam, root);
  const colorsFilter = createColorCheckbox(wrapper, COLORS);
  const magicFilter = createColorCheckbox(wrapper, MAGIC);
  const typesFilter = createColorCheckbox(wrapper, CATEGORY);
  createFilterButton(wrapper, FilterCallBack);
  createResetButton(wrapper, FilterCallBack);
};
