import { InputBlock, FormHint } from '../pages/login/authTypes';
import { ElementParams, Callback } from '../types/types';
import { createElement } from './elementCreator';
import { checkForm } from '../pages/login/formValidation';

export const inputCreator = (
  label: ElementParams,
  input: ElementParams,
  root: HTMLElement,
  listener?: Callback,
): HTMLElement => {
  const inputBlock = createElement(InputBlock, root);
  const inputCurrent = createElement(input, inputBlock);
  if (listener) inputCurrent.addEventListener('input', checkForm);
  createElement(label, inputBlock);
  createElement(FormHint, inputBlock);
  return inputBlock;
};

// createFormInput
