import { InputBlock, FormHint } from '../pages/login/authTypes';
import { ElementParams, Callback } from '../types/types';
import { createElement } from './elementCreator';
import { checkForm } from '../pages/login/formValidation';
import { SaveUserInfoBtn } from '../pages/profile/profileTypes';

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

export const inputProfileCreator = (
  input: ElementParams,
  label: ElementParams,
  root: HTMLElement,
  listener?: Callback,
  text?: string,
): HTMLElement => {
  const inputBlock = createElement(InputBlock, root);
  const inputCurrent = createElement(input, inputBlock);
  if (text) input.value = text;
  if (listener) inputCurrent.addEventListener('input', checkForm);
  createElement(label, inputBlock);
  createElement(FormHint, inputBlock);
  createElement(SaveUserInfoBtn, inputBlock);
  return inputBlock;
};
// createFormInput

export const inputProfileAdrCreator = (input: ElementParams, label: ElementParams, root: HTMLElement): void => {
  const inputBlock = createElement(InputBlock, root);
  const inputCurrent = createElement(input, inputBlock);
  createElement(label, inputBlock);
  createElement(FormHint, inputBlock);
};
