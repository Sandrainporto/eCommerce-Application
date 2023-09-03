import { returnCustomerByEmail } from '../../api/findCustomer';
import { createCustomer, updateCustomerName } from '../../api/createUser';
import { loginCustomer } from '../../api/loginCustomer';
import { checkPassword } from './inputs/checkPassword';
import { checkEmail } from './inputs/checkEmail';
import { checkName as checkNameFunction } from './inputs/checkName';
import { checkDate } from './inputs/checkDate';
import { checkPostCode } from './inputs/checkPostCode';
import { ButtonClass } from '../../types/htmlClasses';
import {
  UserFNamelInput,
  UserLNamelInput,
  LoginEmailInput,
  LoginPaslInput,
  FormContent,
  CountrySelectBox,
  SubmitAuthBtn,
  FormHint,
  UserLBirthlInput,
  UserLTownlInput,
  UserLStreetlInput,
  AddresslInputCheckbox,
  DefAddresslInputCheckbox,
  UserLPostcodelInput,
} from './authTypes';
import { HtmlTags } from '../../types/htmlTags';

const HINT_TEXT = {
  create: 'User created',
};

export async function addListnerToFormBtn(): Promise<void> {
  const form = document.querySelector(`.${FormContent.classNames}`) as HTMLElement;
  const inputs = [...form.getElementsByTagName(`${HtmlTags.INPUT}`)];
  const selects = [...form.getElementsByTagName(`${HtmlTags.SELECT}`)];
  const hint = inputs[inputs.length - 1].nextElementSibling?.nextElementSibling as HTMLElement;

  if (localStorage.getItem('night-customer')) JSON.parse(localStorage.getItem('night-customer') as string);
  if (inputs.length > 2) {
    const userInfo = {
      fname: inputs.find((el) => el.id === `${UserFNamelInput.id}`)?.value as string,
      lname: inputs.find((el) => el.id === `${UserLNamelInput.id}`)?.value as string,
      birth: inputs.find((el) => el.id === `${UserLBirthlInput.id}`)?.value as string,
      email: inputs.find((el) => el.id === `${LoginEmailInput.id}`)?.value as string,
      pas: inputs.find((el) => el.id === `${LoginPaslInput.id}`)?.value as string,
      country: selects.find((el) => el.id === `${CountrySelectBox.id}`)?.value as string,
      town: inputs.find((el) => el.id === `${UserLTownlInput.id}`)?.value as string,
      street: inputs.find((el) => el.id === `${UserLStreetlInput.id}`)?.value as string,
      postCode: inputs.find((el) => el.id === `${UserLPostcodelInput.id}`)?.value as string,
      defaultAdres: inputs.find((el) => el.id === `${AddresslInputCheckbox.id}`)?.checked as boolean,
      shipAndBil: inputs.find((el) => el.id === `${DefAddresslInputCheckbox.id}`)?.checked as boolean,
    };
    let existUser;
    await returnCustomerByEmail(userInfo, hint).then(({ body }) => (existUser = { body }));
    console.log(existUser);
    if (existUser.body.results.length === 0) {
      let newUser;
      await createCustomer(userInfo).then(({ body }) => (newUser = body));
      hint.textContent = 'User created';
      await updateCustomerName(newUser.customer.id, userInfo).then(({ body }) => (newUser = body));
      localStorage.setItem('night-customer', JSON.stringify(newUser));
      localStorage.setItem('reg-customer-name', JSON.stringify(`${userInfo.fname} ${userInfo.lname}`));
      // await updateCustomerName()
    } else {
      hint.textContent = 'User with this email exist';
    }

    if (hint) hint.textContent = `${HINT_TEXT.create}`;
  } else {
    const loginHint = inputs.find((el) => el.id === `${LoginPaslInput.id}`)?.nextElementSibling
      ?.nextElementSibling as HTMLElement;
    const userLogInfo = {
      email: inputs.find((el) => el.id === `${LoginEmailInput.id}`)?.value as string,
      pas: inputs.find((el) => el.id === `${LoginPaslInput.id}`)?.value as string,
    };
    loginCustomer(userLogInfo, loginHint);
  }
}

export function checkBtn(): void {
  const form = document.querySelector(`.${FormContent.classNames}`) as HTMLElement;
  const btn = form.querySelector(`.${SubmitAuthBtn.classNames}`) as HTMLElement;
  const inputs = [...form.getElementsByTagName(`${HtmlTags.INPUT}`)];
  const hints = [...form.querySelectorAll(`.${FormHint.classNames}`)];

  if (
    inputs.every((input) => input.value !== '') &&
    hints.every((hint) => hint.textContent === '' || hint.textContent === ' ')
  ) {
    btn.classList.add(ButtonClass.active);
    btn.addEventListener('click', addListnerToFormBtn);
    btn.removeAttribute('disabled');
  } else {
    if (btn.classList.contains(ButtonClass.active)) {
      btn.classList.remove(ButtonClass.active);
    }
    btn.removeEventListener('click', addListnerToFormBtn);
    btn.setAttribute('disabled', 'disabled');
  }
}

function addHintContent(element: HTMLElement, str?: string): void {
  const curHintBlock = element;
  curHintBlock.textContent = '';
  if (str) curHintBlock.textContent = `${str}`;
}

export function checkForm(e: Event): void {
  const input = e.target;
  if (input instanceof HTMLInputElement) {
    const hint = input.nextElementSibling?.nextElementSibling as HTMLElement;
    const text = input.value;
    if (hint !== null) {
      hint.textContent = text;
      let errorMessage = ' ';

      if (input.id === LoginEmailInput.id) {
        errorMessage = checkEmail(text);
      }
      if (input.id === LoginPaslInput.id) {
        errorMessage = checkPassword(text);
      }
      if (input.id === UserFNamelInput.id || input.id === UserLNamelInput.id) {
        errorMessage = checkNameFunction(text);
      }
      if (input.id === UserLBirthlInput.id) {
        errorMessage = checkDate(text);
      }
      if (input.id === UserLTownlInput.id) {
        errorMessage = checkNameFunction(text);
      }
      if (input.id === UserLPostcodelInput.id) {
        errorMessage = checkPostCode(text);
      }
      if (errorMessage) {
        addHintContent(hint, errorMessage);
      } else {
        addHintContent(hint);
      }
    }
    checkBtn();
  }
}
