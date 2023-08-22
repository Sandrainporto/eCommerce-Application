import './authContent.scss';
import { createElement } from '../../utils/elementCreator';
import {
  AddressLabelCheckbox,
  AddresslInputCheckbox,
  AuthContainer,
  CountryOptionUSA,
  CountryOptionBelarus,
  CountrySelectBox,
  Form,
  FormContent,
  FormHint,
  FormNav,
  FormNavLogin,
  FormNavSignUp,
  InputBlock,
  LoginEmailInput,
  LoginEmailLabel,
  LoginPasLabel,
  LoginPaslInput,
  SubmitAuthBtn,
  UserAddressBlock,
  UserFNameLabel,
  UserFNamelInput,
  UserInfoBlock,
  UserLBirthLabel,
  UserLBirthlInput,
  UserLNameLabel,
  UserLNamelInput,
  UserLTownLabel,
  UserLTownlInput,
  UserLStreetLabel,
  UserLStreetlInput,
  UserLPostcodeLabel,
  UserLPostcodelInput,
  CountrySelectLabel,
  DefAddresslInputCheckbox,
  DefAddressLabelCheckbox,
} from './authTypes';
import { ElementParams, Callback } from '../../types/types';
import { checkForm } from './formValidation';

function createFormInput(
  container: ElementParams,
  label: ElementParams,
  input: ElementParams,
  root: HTMLElement,
  listener?: Callback,
): HTMLElement {
  const inputBlock = createElement(container, root);
  const inputCurrent = createElement(input, inputBlock);
  if (listener) inputCurrent.addEventListener('input', checkForm);

  createElement(label, inputBlock);
  createElement(FormHint, inputBlock);
  return inputBlock;
}
function addFormContent(root: HTMLElement, id: string): HTMLElement {
  const formContent = createElement(FormContent, root);
  if (id === 'registration') {
    const infoContainer = createElement(UserInfoBlock, formContent);
    createFormInput(InputBlock, UserFNameLabel, UserFNamelInput, infoContainer);
    createFormInput(InputBlock, UserLNameLabel, UserLNamelInput, infoContainer);

    createFormInput(InputBlock, UserLBirthLabel, UserLBirthlInput, formContent);

    const addressContainer = createElement(UserAddressBlock, formContent);

    createFormInput(InputBlock, AddresslInputCheckbox, AddressLabelCheckbox, addressContainer);

    createElement(CountrySelectLabel, addressContainer);
    const userAddress = createElement(CountrySelectBox, addressContainer);
    createElement(CountryOptionUSA, userAddress);
    createElement(CountryOptionBelarus, userAddress);
    createFormInput(InputBlock, UserLTownLabel, UserLTownlInput, addressContainer);
    createFormInput(InputBlock, UserLStreetLabel, UserLStreetlInput, addressContainer);
    createFormInput(InputBlock, UserLPostcodeLabel, UserLPostcodelInput, addressContainer);

    createFormInput(InputBlock, DefAddresslInputCheckbox, DefAddressLabelCheckbox, addressContainer);
  }
  createFormInput(InputBlock, LoginEmailLabel, LoginEmailInput, formContent, (e: Event) => checkForm(e));
  createFormInput(InputBlock, LoginPasLabel, LoginPaslInput, formContent, (e: Event) => checkForm(e));
  const formBtn = createElement(SubmitAuthBtn, formContent);
  formBtn.setAttribute('disabled', 'disabled');
  if (id === 'login') {
    formBtn.classList.add('btn_auth');
  } else {
    formBtn.classList.add('btn_reg');
  }
  return formContent;
}

function createAuthForm(root: HTMLElement, id: string): HTMLElement {
  const form = createElement(Form, root);
  const formNav = createElement(FormNav, form);
  if (id === 'auth') {
    createElement(FormNavLogin, formNav);
  }
  if (id === 'registration') {
    createElement(FormNavSignUp, formNav);
  }
  addFormContent(form, id);
  return form;
}
export function showAuthContent(root: HTMLElement): HTMLElement {
  const id = root.parentElement?.id as string;
  const authContainer = createElement(AuthContainer, root);
  createAuthForm(authContainer, id);
  return authContainer;
}
