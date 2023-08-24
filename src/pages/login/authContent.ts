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
  ContainerName,
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

function addAddressFields(root: HTMLElement, innerText: string, className: string): HTMLElement {
  const addressContainer = createElement(UserAddressBlock, root, (e: Event) => checkForm(e));
  addressContainer.className = className;

  const containerName = createElement(ContainerName, addressContainer);
  containerName.innerText = innerText;

  createElement(CountrySelectLabel, addressContainer, (e: Event) => checkForm(e));

  const userAddress = createElement(CountrySelectBox, addressContainer, (e: Event) => checkForm(e));
  createElement(CountryOptionUSA, userAddress, (e: Event) => checkForm(e));
  createElement(CountryOptionBelarus, userAddress, (e: Event) => checkForm(e));
  createFormInput(InputBlock, UserLTownLabel, UserLTownlInput, addressContainer, (e: Event) => checkForm(e));
  createFormInput(InputBlock, UserLStreetLabel, UserLStreetlInput, addressContainer, (e: Event) => checkForm(e));
  createFormInput(InputBlock, UserLPostcodeLabel, UserLPostcodelInput, addressContainer, (e: Event) => checkForm(e));

  return addressContainer;
}
function addBillingFields(): void {
  const saveBillingChbox = document.querySelector('.new-user_ldefaddress-checkbox');
  if (saveBillingChbox instanceof HTMLInputElement) {
    saveBillingChbox.addEventListener('change', () => {
      const billingBlock = document.querySelector('.user-billing_block');
      if (billingBlock) {
        billingBlock.remove();
      }
      if (saveBillingChbox.checked === false) {
        const addressContainer = document.querySelector('.user-address_block') as HTMLElement;
        addAddressFields(addressContainer, 'Billing Address', 'user-billing_block');
      }
    });
  }
}

function addFormContent(root: HTMLElement, id: string): HTMLElement {
  const formContent = createElement(FormContent, root);
  if (id === 'registration') {
    const infoContainer = createElement(UserInfoBlock, formContent);
    createFormInput(InputBlock, UserFNameLabel, UserFNamelInput, infoContainer, (e: Event) => checkForm(e));
    createFormInput(InputBlock, UserLNameLabel, UserLNamelInput, infoContainer, (e: Event) => checkForm(e));

    createFormInput(InputBlock, UserLBirthLabel, UserLBirthlInput, formContent, (e: Event) => checkForm(e));

    const addressContainer = addAddressFields(formContent, 'Address', 'user-address_block');

    createFormInput(InputBlock, AddresslInputCheckbox, AddressLabelCheckbox, addressContainer, (e: Event) =>
      checkForm(e),
    );
    createFormInput(InputBlock, DefAddresslInputCheckbox, DefAddressLabelCheckbox, addressContainer, (e: Event) =>
      checkForm(e),
    );
    addBillingFields();
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
