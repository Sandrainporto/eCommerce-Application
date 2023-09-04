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
    // checkbox.addEventListener('click', (event) => {
    //   event.preventDefault();
    //   const target = event.target as HTMLInputElement;
    //   if (!target.hasAttribute('checked')) {
    //     target.setAttribute('checked', 'true');
    //   } else {
    //     target.removeAttribute('checked');
    //   }
    // });
  });
  return checkboxContainer;
};

const createFilterButton = (root: HTMLElement): void => {
  const button = createElement(FilterButton, root);
  button.innerText = BUTTONS.filter;
};

export const showFilterPanel = (root: HTMLElement): void => {
  const wrapper = createElement(FilterBlockParam, root);
  const checkboxContainer = createColorCheckbox(wrapper);
  createFilterButton(checkboxContainer);
};
