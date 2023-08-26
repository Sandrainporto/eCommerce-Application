import './authContent.scss';
import { createElement } from '../../utils/elementCreator';
import { inputCreator } from '../../utils/inputCreator';
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
  FormPasBlock,
  FormShowPasBtn,
} from './authTypes';
import { ElementParams, Callback } from '../../types/types';
import { checkForm } from './formValidation';

const countries = {
  USA: CountryOptionUSA,
  Belarus: CountryOptionBelarus,
};

const addressFields = {
  town: {
    label: UserLTownLabel,
    input: UserLTownlInput,
  },
  street: {
    label: UserLStreetLabel,
    input: UserLStreetlInput,
  },
  post: {
    label: UserLPostcodeLabel,
    input: UserLPostcodelInput,
  },
};

const userFields = {
  firstName: {
    label: UserFNameLabel,
    input: UserFNamelInput,
  },
  lastName: {
    label: UserLNameLabel,
    input: UserLNamelInput,
  },
  birth: {
    label: UserLBirthLabel,
    input: UserLBirthlInput,
  },
};

function addAddressFields(root: HTMLElement, innerText: string, className: string): HTMLElement {
  const addressContainer = createElement(UserAddressBlock, root, (e: Event) => checkForm(e));
  addressContainer.className = className;

  const containerName = createElement(ContainerName, addressContainer);
  containerName.innerText = innerText;

  const selectAddress = inputCreator(CountrySelectLabel, CountrySelectBox, addressContainer, (e: Event) =>
    checkForm(e),
  );

  const select = selectAddress.querySelector('#country-select') as HTMLElement;

  for (let key in countries) {
    const country = createElement(countries[key], select, (e: Event) => checkForm(e));
  }

  for (let key in addressFields) {
    inputCreator(addressFields[key].label, addressFields[key].input, addressContainer, (e: Event) => checkForm(e));
  }

  return addressContainer;
}

function addBillingFields(): void {
  const saveBillingCheckbox = document.querySelector('.new-user_ldefaddress-checkbox');
  if (saveBillingCheckbox instanceof HTMLInputElement) {
    saveBillingCheckbox.addEventListener('change', () => {
      const billingBlock = document.querySelector('.user-billing_block');
      if (billingBlock) {
        billingBlock.remove();
      }
      if (saveBillingCheckbox.checked === false) {
        const addressContainer = document.querySelector('.user-address_block') as HTMLElement;
        addAddressFields(addressContainer, 'Billing Address', 'user-billing_block');
      }
    });
  }
}

function showPas(event: Event): void {
  const button = event.target as HTMLElement;
  const input = button.previousElementSibling?.querySelector('#login-pas') as HTMLInputElement;
  button.classList.toggle('pas_hidden');
  if (input.getAttribute('type') === 'text') {
    button.textContent = 'SHOW';
    input.setAttribute('type', 'password');
  } else {
    button.textContent = 'HIDE';
    input.setAttribute('type', 'text');
  }
}

function addFormContent(root: HTMLElement, id: string): HTMLElement {
  const formContent = createElement(FormContent, root);
  if (id === 'registration') {
    const infoContainer = createElement(UserInfoBlock, formContent);

    for (let key in userFields) {
      inputCreator(userFields[key].label, userFields[key].input, infoContainer, (e: Event) => checkForm(e));
    }

    const addressContainer = addAddressFields(formContent, 'Address', 'user-address_block');
    inputCreator(AddresslInputCheckbox, AddressLabelCheckbox, addressContainer, (e: Event) => checkForm(e));
    inputCreator(DefAddresslInputCheckbox, DefAddressLabelCheckbox, addressContainer, (e: Event) => checkForm(e));
    addBillingFields();
  }

  inputCreator(LoginEmailLabel, LoginEmailInput, formContent, (e: Event) => checkForm(e));
  const formPasBlock = createElement(FormPasBlock, formContent);
  inputCreator(LoginPasLabel, LoginPaslInput, formPasBlock, (e: Event) => checkForm(e));
  createElement(FormShowPasBtn, formPasBlock, (e: Event) => showPas(e));
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
