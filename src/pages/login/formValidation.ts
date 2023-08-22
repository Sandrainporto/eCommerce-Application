import { passLength, upperLetters, lowerLetters, numbers } from './authTypes';
import { returnCustomerByEmail } from '../../api/findCustomer';
import { loginCustomer } from '../../api/loginCustomer';

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
    // console.log(customer);
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
  if (inputs.every((input) => input.value !== '') && hints.every((hint) => hint.textContent === '')) {
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

export function checkForm(e: Event): void {
  const input = e.target as HTMLInputElement;
  const hint = input.nextElementSibling?.nextElementSibling as HTMLElement;
  const text = input.value;
  hint.textContent = text;
  if (input.id === 'login-email') {
    if (text.includes(' ')) {
      addHintContent(hint, 'No spaces allowed');
    } else if (!text.includes('@')) {
      addHintContent(hint, 'Email must include @');
    } else {
      const textLastPart = text.split('@')[1];
      const domainLeft = textLastPart.split('.')[0];
      const domainRight = textLastPart.split('.')[1];
      if (!textLastPart.includes('.') || textLastPart.split('').filter((el) => el === '.').length > 1 ||
        domainLeft.length < 2 || domainRight.length < 2) {
        addHintContent(hint, 'Email must have domain name like "example.com"');
      } else {
        addHintContent(hint);
      }
    }
  }
  if (input.id === 'login-pas') {
    if (text.includes(' ')) {
      addHintContent(hint, 'No spaces allowed');
    } else if (text.length < passLength) {
      addHintContent(hint, 'Password less than 8 characters');
    } else if (!upperLetters.test(text)) {
      addHintContent(hint, 'Password must contains at least 1 capital letter');
      hint.textContent = 'Password must contains at least 1 capital letter';
    } else if (!lowerLetters.test(text)) {
      addHintContent(hint, 'Password must contains at least 1 lower letter');
    } else if (!numbers.test(text)) {
      addHintContent(hint, 'Password must contains at least 1 number');
    } else {
      addHintContent(hint);
    }
  }
  checkBtn();
}
