import { passLength, upperLetters, lowerLetters, numbers } from './authTypes';

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

export function addListnerToFormBtn(e: Event): void {
  e.preventDefault();
  const loginBtn = document.querySelector('#login') as HTMLAnchorElement;
  loginBtn.innerText = 'Log Out';
  sessionStorage.setItem('loginBtnValue', loginBtn.innerText)
  console.log(loginBtn)
  // createCustomer()
  //   .then(({ body }) => {
  //     console.log(body.customer.id);
  //   })
  //   .catch(console.error);
}

export function checkBtn(): void {
  const form = document.querySelector('.form_content') as HTMLElement;
  const btn = form.querySelector('.form_btn') as HTMLElement;
  const inputs = [...form.getElementsByTagName('input')];
  const hints = [...form.querySelectorAll('.form_hint')];
  if (inputs.every((input) => input.value !== '') && hints.every((hint) => hint.textContent === '')) {
    btn.classList.add('btn__active');
    btn.addEventListener('click', (e: Event) => addListnerToFormBtn(e));
    btn.removeAttribute('disabled');
  } else {
    btn.classList.contains('btn__active') ? btn.classList.remove('btn__active') : btn;
    btn.removeEventListener('click', (e: Event) => addListnerToFormBtn(e));
    btn.setAttribute('disabled', 'disabled');
  }
}
