import { passLength, upperLetters, lowerLetters, numbers } from './authTypes';
import { returnCustomerByEmail } from '../../api/findCustomer';

export function checkForm(e: Event): void {
  const input = e.target as HTMLInputElement;
  const hint = input.nextElementSibling?.nextElementSibling as HTMLElement;
  const text = input.value;
  hint.textContent = text;
  if (input.id === 'login-email') {
    if (text.includes(' ')) {
      hint.textContent = '';
      hint.textContent = 'No spaces allowed';
    } else if (!text.includes('@')) {
      hint.textContent = '';
      hint.textContent = 'Email must include @';
    } else {
      const textLastPart = text.split('@')[1];
      const domainLeft = textLastPart.split('.')[0];
      const domainRight = textLastPart.split('.')[1];
      if (
        !textLastPart.includes('.') ||
        textLastPart.split('').filter((el) => el === '.').length > 1 ||
        domainLeft.length < 2 ||
        domainRight.length < 2
      ) {
        hint.textContent = '';
        hint.textContent = 'Email must have domain name like "example.com"';
      } else {
        hint.textContent = '';
      }
    }
  }
  if (input.id === 'login-pas') {
    if (text.includes(' ')) {
      hint.textContent = '';
      hint.textContent = 'No spaces allowed';
    } else if (text.length < passLength) {
      hint.textContent = '';
      hint.textContent = 'Password less than 8 characters';
    } else if (!upperLetters.test(text)) {
      hint.textContent = '';
      hint.textContent = 'Password must contains at least 1 capital letter';
    } else if (!lowerLetters.test(text)) {
      hint.textContent = '';
      hint.textContent = 'Password must contains at least 1 lower letter';
    } else if (!numbers.test(text)) {
      hint.textContent = 'Password must contains at least 1 number';
    } else {
      hint.textContent = '';
    }
  }
  checkBtn();
}

export function addListnerToFormBtn(): void {
  const form = document.querySelector('.form_content') as HTMLElement;
  const inputs = [...form.getElementsByTagName('input')];
  const hint = inputs[inputs.length - 1].nextElementSibling?.nextElementSibling as HTMLElement;
  let customer;
  if (localStorage.getItem('night-customer')) customer = JSON.parse(localStorage.getItem('night-customer') as string);
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
    const hint = inputs.find((el) => el.id === 'login-pas')?.nextElementSibling?.nextElementSibling as HTMLElement;
    console.log(customer);
  }
}

export function checkBtn(): void {
  const form = document.querySelector('.form_content') as HTMLElement;
  const btn = form.querySelector('.form_btn') as HTMLElement;
  const inputs = [...form.getElementsByTagName('input')];
  const hints = [...form.querySelectorAll('.form_hint')];
  if (inputs.every((input) => input.value !== '') && hints.every((hint) => hint.textContent === '')) {
    console.log('tyt');
    btn.classList.add('btn__active');
    btn.addEventListener('click', addListnerToFormBtn);
    btn.removeAttribute('disabled');
  } else {
    btn.classList.contains('btn__active') ? btn.classList.remove('btn__active') : btn;
    btn.removeEventListener('click', addListnerToFormBtn);
    btn.setAttribute('disabled', 'disabled');
  }
}