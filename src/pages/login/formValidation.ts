import { returnCustomerByEmail } from '../../api/findCustomer';
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
  SubmitAuthBtn,
  FormHint,
  UserLBirthlInput,
  UserLTownlInput,
  UserLPostcodelInput,
} from './authTypes';
import { HtmlTags } from '../../types/htmlTags';

const HINT_TEXT = {
  create: 'User created',
};

export function addListnerToFormBtn(): void {
  const form = document.querySelector(`.${FormContent.classNames}`) as HTMLElement;
  const inputs = [...form.getElementsByTagName(`${HtmlTags.INPUT}`)];
  const hint = inputs[inputs.length - 1].nextElementSibling?.nextElementSibling as HTMLElement;

  if (localStorage.getItem('night-customer')) JSON.parse(localStorage.getItem('night-customer') as string);
  if (inputs.length > 2) {
    const userInfo = {
      fname: inputs.find((el) => el.id === `${UserFNamelInput.id}`)?.value as string,
      lname: inputs.find((el) => el.id === `${UserLNamelInput.id}`)?.value as string,
      email: inputs.find((el) => el.id === `${LoginEmailInput.id}`)?.value as string,
      pas: inputs.find((el) => el.id === `${LoginPaslInput.id}`)?.value as string,
    };
    returnCustomerByEmail(userInfo, hint);

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
