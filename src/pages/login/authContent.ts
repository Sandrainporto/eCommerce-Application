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

  const inputLabel = createElement(label, inputBlock);
  const hint = createElement(FormHint, inputBlock);
  return inputBlock;
}
function addFormContent(root: HTMLElement, id: string): HTMLElement {
  const formContent = createElement(FormContent, root);
  if (id === 'registration') {
    const infoContainer = createElement(UserInfoBlock, formContent);
    const userName = createFormInput(InputBlock, UserFNameLabel, UserFNamelInput, infoContainer);
    const userLastName = createFormInput(InputBlock, UserLNameLabel, UserLNamelInput, infoContainer);

    const userDateOfBirth = createFormInput(InputBlock, UserLBirthLabel, UserLBirthlInput, formContent);

    const addressContainer = createElement(UserAddressBlock, formContent);

    const userAddressCheckbox = createFormInput(
      InputBlock,
      AddresslInputCheckbox,
      AddressLabelCheckbox,
      addressContainer,
    );

    const userAddressCheckboxLabel = createElement(CountrySelectLabel, addressContainer);
    const userAddress = createElement(CountrySelectBox, addressContainer);
    const userAddressOptionUSA = createElement(CountryOptionUSA, userAddress);
    const userAddressOptionBelarus = createElement(CountryOptionBelarus, userAddress);
    const usertTown = createFormInput(InputBlock, UserLTownLabel, UserLTownlInput, addressContainer);
    const usertStreet = createFormInput(InputBlock, UserLStreetLabel, UserLStreetlInput, addressContainer);
    const usertPostcode = createFormInput(InputBlock, UserLPostcodeLabel, UserLPostcodelInput, addressContainer);

    const setDefAddressCheckbox = createFormInput(
      InputBlock,
      DefAddresslInputCheckbox,
      DefAddressLabelCheckbox,
      addressContainer,
    );
  }
  const loginUserEmail = createFormInput(InputBlock, LoginEmailLabel, LoginEmailInput, formContent, (e: Event) =>
    checkForm(e),
  );
  const loginUserPas = createFormInput(InputBlock, LoginPasLabel, LoginPaslInput, formContent, (e: Event) =>
    checkForm(e),
  );
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
    const formNavLogin = createElement(FormNavLogin, formNav);
  }
  if (id === 'registration') {
    const formNavSignUp = createElement(FormNavSignUp, formNav);
  }
  const formContent = addFormContent(form, id);
  return form;
}
export function showAuthContent(root: HTMLElement): HTMLElement {
  const id = root.parentElement?.id as string;
  const authContainer = createElement(AuthContainer, root);
  const form = createAuthForm(authContainer, id);
  return authContainer;
}
