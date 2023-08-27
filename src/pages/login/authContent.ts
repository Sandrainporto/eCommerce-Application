import './authContent.scss';
import { createElement } from '../../utils/elementCreator';
import { inputCreator } from '../../utils/inputCreator';
import {
  AddressLabelCheckbox,
  AddresslInputCheckbox,
  AuthContainer,
  FormHint,
  CountryOptionUSA,
  CountryOptionBelarus,
  CountrySelectBox,
  Form,
  FormContent,
  FormNav,
  FormNavLogin,
  FormNavSignUp,
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
  AuthPageParam,
  BillingBlock,
} from './authTypes';
import { ElementParams, Callback } from '../../types/types';
import { checkForm } from './formValidation';
import { RegPageParam } from '../registration/regTypes';
import { ButtonClass } from '../../types/htmlClasses';

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

const loginFields = {
  email: {
    label: LoginEmailLabel,
    input: LoginEmailInput,
  },
  pass: {
    label: LoginPasLabel,
    input: LoginPaslInput,
  },
};

const addressCheckbox = {
  default: {
    label: AddressLabelCheckbox,
    input: AddresslInputCheckbox,
  },
  shipping: {
    label: DefAddresslInputCheckbox,
    input: DefAddressLabelCheckbox,
  },
};

function addAddressFields(root: HTMLElement, innerText: string, className: string): HTMLElement {
  const addressContainer = createElement(UserAddressBlock, root);
  addressContainer.className = className;

  const containerName = createElement(ContainerName, addressContainer);

  const selectAddress = inputCreator(CountrySelectLabel, CountrySelectBox, addressContainer, (e: Event) =>
    checkForm(e),
  );

  const select = selectAddress.querySelector(`#${CountrySelectBox.id}`) as HTMLElement;

  for (let key in countries) {
    const country = createElement(countries[key], select, (e: Event) => checkForm(e));
  }

  for (let key in addressFields) {
    inputCreator(addressFields[key].label, addressFields[key].input, addressContainer, (e: Event) => checkForm(e));
  }

  return addressContainer;
}

const addBillingFields = (root: HTMLElement): void => {
  const saveBillingCheckbox = document.querySelector(`.${DefAddresslInputCheckbox.classNames}`);
  if (saveBillingCheckbox instanceof HTMLInputElement) {
    saveBillingCheckbox.addEventListener('change', () => {
      const billingBlock = document.querySelector(`.${BillingBlock.className}`);
      if (billingBlock) {
        billingBlock.remove();
      }
      if (saveBillingCheckbox.checked === false) {
        addAddressFields(root, BillingBlock.innerText, BillingBlock.className);
      }
    });
  }
};

const showPas = (event: Event): void => {
  const button = event.target as HTMLElement;
  const input = button.previousElementSibling?.querySelector(`#${LoginPaslInput.id}`) as HTMLInputElement;
  button.classList.toggle(ButtonClass.hidden);
  if (input.getAttribute('type') === 'text') {
    input.setAttribute('type', 'password');
  } else {
    input.setAttribute('type', 'text');
  }
};

const addFormContent = (root: HTMLElement): HTMLElement => {
  const formContent = createElement(FormContent, root);
  const infoContainer = createElement(UserInfoBlock, formContent);
  for (let key in userFields) {
    inputCreator(userFields[key].label, userFields[key].input, infoContainer, (e: Event) => checkForm(e));
  }
  const addressContainer = addAddressFields(formContent, UserAddressBlock.innerText, UserAddressBlock.classNames);
  for (let key in addressCheckbox) {
    const checkBox = inputCreator(addressCheckbox[key].label, addressCheckbox[key].input, addressContainer);
    checkBox.querySelector(`.${FormHint.classNames}`)?.remove();
  }
  return formContent;
};

const LoginForm = (root: HTMLElement, id: string) => {
  const emailInput = inputCreator(loginFields.email.label, loginFields.email.input, root, (e: Event) => checkForm(e));
  const passElement = createElement(FormPasBlock, root);
  const passInput = inputCreator(loginFields.pass.label, loginFields.pass.input, passElement, (e: Event) =>
    checkForm(e),
  );
  const hideButton = createElement(FormShowPasBtn, passElement, (e: Event) => showPas(e));
};

const addSubmitButton = (root: HTMLElement, id: string) => {
  const submitButton = createElement(SubmitAuthBtn, root);
  submitButton.setAttribute('disabled', 'disabled');
  if (id === AuthPageParam.id) {
    submitButton.classList.add('btn_auth');
  } else {
    submitButton.classList.add('btn_reg');
  }
};

export function showAuthContent(root: HTMLElement): HTMLElement {
  const id = root.parentElement?.id as string;
  const authContainer = createElement(AuthContainer, root);
  const form = createElement(Form, root);
  const formNav = createElement(FormNav, form);
  let contentElement: HTMLElement | undefined;

  if (id === AuthPageParam.id) {
    contentElement = createElement(FormNavSignUp, formNav);
  }
  if (id === RegPageParam.id) {
    contentElement = createElement(FormNavLogin, formNav);
  }

  if (contentElement) {
    const formContent = createElement(FormContent, contentElement);
    if (id === RegPageParam.id) {
      const root = addFormContent(formContent);
      addBillingFields(root);
    }
    LoginForm(formContent, id);
    addSubmitButton(formContent, id);
  }

  return authContainer;
}
