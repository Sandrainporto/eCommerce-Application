import './filterPanel.scss';
import { createElement } from '../../../utils/elementCreator';
import {
  FilterBlockParam,
  CheckBoxFilterContainer,
  FilterInputColorCheckbox,
  FilterLabelColorCheckbox,
  ElementContainer,
  FilterButton,
} from './filterTypes';

const COLORS = ['black', 'white', 'red', 'green', 'blue'];
const BUTTONS = {
  filter: 'FILTER',
};

const createColorCheckbox = (root: HTMLElement): HTMLElement => {
  const checkboxContainer = createElement(CheckBoxFilterContainer, root);

  COLORS.forEach((el) => {
    const container = createElement(ElementContainer, checkboxContainer);
    const label = createElement(FilterLabelColorCheckbox, container) as HTMLLabelElement;
    label.innerText = el;
    label.htmlFor = `color-${el}`;
    const checkbox = createElement(FilterInputColorCheckbox, container) as HTMLInputElement;
    checkbox.setAttribute('checked', 'false');
    checkbox.id = `color-${el}`;
    checkbox.value = el;
    checkbox.checked = false;
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

export const showFilterPanel = (root: HTMLElement, FilterCallBack: (value: string[]) => void): void => {
  const wrapper = createElement(FilterBlockParam, root);
  const checkboxContainer = createColorCheckbox(wrapper);
  createFilterButton(checkboxContainer, FilterCallBack);
};
