import { returnCustomerByEmail } from '../../api/findCustomer';
import { loginCustomer } from '../../api/loginCustomer';
import { checkPassword } from './inputs/checkPassword';
import { checkEmail } from './inputs/checkEmail';
import { checkName as checkNameFunction } from './inputs/checkName';
import { checkDate } from './inputs/checkDate';
import { checkPostCode } from './inputs/checkPostCode';

export function addListnerToFormBtn(): void {
  const form = document.querySelector('.form_content') as HTMLElement;
  const inputs = [...form.getElementsByTagName('input')];
  const hint = inputs[inputs.length - 1].nextElementSibling?.nextElementSibling as HTMLElement;

  if (localStorage.getItem('night-customer')) JSON.parse(localStorage.getItem('night-customer') as string);
  if (inputs.length > 2) {
    const userInfo = {
      fname: inputs.find((el) => el.id === 'user-fname')?.value as string,
      lname: inputs.find((el) => el.id === 'user-lname')?.value as string,
      email: inputs.find((el) => el.id === 'login-email')?.value as string,
      pas: inputs.find((el) => el.id === 'login-pas')?.value as string,
    };
    returnCustomerByEmail(userInfo, hint);

    if (hint) hint.textContent = 'User created';
  } else {
    const loginHint = inputs.find((el) => el.id === 'login-pas')?.nextElementSibling?.nextElementSibling as HTMLElement;
    const userLogInfo = {
      email: inputs.find((el) => el.id === 'login-email')?.value as string,
      pas: inputs.find((el) => el.id === 'login-pas')?.value as string,
    };
    loginCustomer(userLogInfo, loginHint);
  }
}

export function checkBtn(): void {
  const form = document.querySelector('.form_content') as HTMLElement;
  const btn = form.querySelector('.form_btn') as HTMLElement;
  const inputs = [...form.getElementsByTagName('input')];
  const hints = [...form.querySelectorAll('.form_hint')];

  if (inputs.every((input) => input.value !== '') && hints.every((hint) => hint.textContent === '' || hint.textContent === ' ')) {
    btn.classList.add('btn__active');
    btn.addEventListener('click', addListnerToFormBtn);
    btn.removeAttribute('disabled');
  } else {
    if (btn.classList.contains('btn__active')) {
      btn.classList.remove('btn__active');
    }
    btn.removeEventListener('click', addListnerToFormBtn);
    btn.setAttribute('disabled', 'disabled');
  }
}

function addHintContent(curHintBlock: HTMLElement, str?: string): void {
  /* eslint no-param-reassign: "error" */
  curHintBlock.textContent = '';
  if (str) curHintBlock.textContent = `${str}`;
}

// eslint-disable-next-line max-lines-per-function
export function checkForm(e: Event): void {
  const input = e.target;
  if (input instanceof HTMLInputElement) {
    const hint = input.nextElementSibling?.nextElementSibling as HTMLElement;
    const text = input.value;
    if (hint !== null) {
      hint.textContent = text;
      let errorMessage = ' ';

      if (input.id === 'login-email') {
        errorMessage = checkEmail(text);
      }
      if (input.id === 'login-pas') {
        errorMessage = checkPassword(text);
      }
      if (input.id === 'user-fname' || input.id === 'user-lname') {
        errorMessage = checkNameFunction(text);
      }
      if (input.id === 'user-lbirth') {
        errorMessage = checkDate(text);
      }
      if (input.id === 'user-ltown') {
        errorMessage = checkNameFunction(text);
      }
      if (input.id === 'user-lpostcode') {
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
