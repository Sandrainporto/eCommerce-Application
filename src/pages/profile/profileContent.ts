import { Customer } from '@commercetools/platform-sdk';
import { getCustomerByEmail } from '../../api/findCustomer';
import { createElement } from '../../utils/elementCreator';
import {
  ProfileHeader,
  ProfileInfo,
  ProfileUserAresses,
  ProfileUserInfo,
  userProfileFields,
  SaveUserInfoBtn,
  InputPasBlock,
  UserPasFields,
  LoginCurPaslInput,
  LoginNewPaslInput,
} from './profileTypes';
import { inputProfileCreator } from '../../utils/inputCreator';
import { addHintContent } from '../login/formValidation';
import {
  UserFNamelInput,
  UserLNamelInput,
  LoginEmailInput,
  LoginPaslInput,
  UserLBirthlInput,
  UserLTownlInput,
  UserLPostcodelInput,
  InputBlock,
  FormHint,
} from '../login/authTypes';
import { checkDate } from '../login/inputs/checkDate';
import { checkEmail } from '../login/inputs/checkEmail';
import { checkName } from '../login/inputs/checkName';
import { checkPassword } from '../login/inputs/checkPassword';
import { checkPostCode } from '../login/inputs/checkPostCode';
import { HtmlTags } from '../../types/htmlTags';

import { ButtonClass } from '../../types/htmlClasses';
import {
  updateUserBDay,
  updateUserEmail,
  updateUserLName,
  updateUserName,
  updateUserPas,
} from '../../api/changeProfile';
import { showAdresess } from './profileAdresses';

function checkProfileForm(e: Event): void {
  const input = e.target;
  if (input instanceof HTMLInputElement) {
    const hint = input.nextElementSibling as HTMLElement;
    const text = input.value;
    if (hint !== null) {
      hint.textContent = text;
      let errorMessage = ' ';

      if (input.id === LoginEmailInput.id) {
        errorMessage = checkEmail(text);
      }
      if (input.id === LoginCurPaslInput.id || input.id === LoginNewPaslInput.id) {
        errorMessage = checkPassword(text);
      }
      if (input.id === UserFNamelInput.id || input.id === UserLNamelInput.id) {
        errorMessage = checkName(text);
      }
      if (input.id === UserLBirthlInput.id) {
        errorMessage = checkDate(text);
      }
      if (input.id === UserLTownlInput.id) {
        errorMessage = checkName(text);
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
    checkProfileBtn(input);
  }
}

function checkProfilePas(e: Event): void {
  const input = e.target as HTMLInputElement;
  const root = input.parentElement?.parentElement as HTMLElement;
  if (input instanceof HTMLInputElement) {
    const hint = input.nextElementSibling as HTMLElement;
    const text = input.value;
    if (hint !== null) {
      hint.textContent = text;
      let errorMessage = ' ';
      if (input.id === LoginCurPaslInput.id || input.id === LoginNewPaslInput.id) {
        errorMessage = checkPassword(text);
      }
      if (errorMessage) {
        addHintContent(hint, errorMessage);
      } else {
        addHintContent(hint);
      }
    }
    checkProfilePasBtn(root);
  }
}

function showUserInfo(root: HTMLElement, customer: Customer): void {
  Object.values(userProfileFields).forEach((el) => inputProfileCreator(el.label, el.input, root));
  const inputPasBlock = createElement(InputPasBlock, root);
  [...root.getElementsByTagName(HtmlTags.INPUT)].forEach((input) => {
    if (input.id === UserFNamelInput.id) input.value = customer.firstName as string;
    if (input.id === UserLNamelInput.id) input.value = customer.lastName as string;
    if (input.id === UserLBirthlInput.id) input.value = customer.dateOfBirth as string;
    if (input.id === LoginEmailInput.id) input.value = customer.email;
    input.addEventListener('input', (e) => checkProfileForm(e));
  });
  Object.values(UserPasFields).forEach((el) => {
    const block = createElement(InputBlock, inputPasBlock);
    createElement(el.label, block);
    createElement(el.input, block);
    createElement(FormHint, block);
  });
  createElement(SaveUserInfoBtn, inputPasBlock);
  console.log([...inputPasBlock.getElementsByTagName(HtmlTags.INPUT)]);
  [...inputPasBlock.getElementsByTagName(HtmlTags.INPUT)].forEach((inp) =>
    inp.addEventListener('input', (e: Event) => checkProfilePas(e)),
  );
}

export async function showProfileContent(root: HTMLElement): Promise<HTMLElement> {
  const emailCur = localStorage.getItem('night-customer-email') as string;
  let customer;
  await getCustomerByEmail(emailCur).then((body) => {
    customer = body.body.results[0];
  });
  const adreses = customer.addresses;
  const profileInfo = createElement(ProfileInfo, root);
  const profileHeader = createElement(ProfileHeader, profileInfo);
  const userInfoBlock = createElement(ProfileUserInfo, profileInfo);
  showUserInfo(userInfoBlock, customer);
  const adrBlock = createElement(ProfileUserAresses, profileInfo);
  showAdresess(adrBlock, customer);
  return profileInfo;
}

async function saveUserInfo(e: Event): Promise<void> {
  e.preventDefault();
  const btn = e.target as HTMLElement;
  const block = btn.parentElement as HTMLElement;
  const input = [...block.getElementsByTagName(`${HtmlTags.INPUT}`)][0];
  let data = JSON.parse(localStorage.getItem('night-customer') as string);
  if (input.id === UserFNamelInput.id)
    await updateUserName(data.id, input.value, Number(data.version)).then(({ body }) => {
      data = body;
    });

  if (input.id === UserLNamelInput.id)
    await updateUserLName(data.id, input.value, Number(data.version)).then(({ body }) => {
      data = body;
    });

  if (input.id === UserLBirthlInput.id)
    await updateUserBDay(data.id, input.value, Number(data.version)).then(({ body }) => {
      data = body;
    });
  if (input.id === LoginEmailInput.id)
    await updateUserEmail(data.id, input.value, Number(data.version)).then(({ body }) => {
      data = body;
    });
  localStorage.setItem('night-customer-email', JSON.stringify(data.email));
  alert('succes');

  localStorage.setItem('night-customer', JSON.stringify(data));
}

export function checkProfileBtn(input: HTMLInputElement): void {
  const block = input.parentElement as HTMLElement;
  const hint = block.querySelector(`.${FormHint.classNames}`) as HTMLElement;
  const btn = block.querySelector(`.${SaveUserInfoBtn.classNames}`) as HTMLElement;
  if (input.value !== '' && (hint.textContent === '' || hint.textContent === ' ')) {
    btn.classList.add(ButtonClass.active);
    btn.addEventListener('click', saveUserInfo);
    btn.removeAttribute('disabled');
  } else {
    if (btn.classList.contains(ButtonClass.active)) {
      btn.classList.remove(ButtonClass.active);
    }
    btn.removeEventListener('click', saveUserInfo);
    btn.setAttribute('disabled', 'disabled');
  }
}

async function saveUserPas(e: Event): Promise<void> {
  e.preventDefault();
  const btn = e.target as HTMLElement;
  const block = btn.parentElement as HTMLElement;
  const data = JSON.parse(localStorage.getItem('night-customer') as string);
  const hint = [...block.querySelectorAll(`.${FormHint.classNames}`)][1] as HTMLElement;
  const pasCur = block.querySelector(`.${LoginCurPaslInput.classNames}`) as HTMLInputElement;
  const pasNew = block.querySelector(`.${LoginNewPaslInput.classNames}`) as HTMLInputElement;
  // await updateUserPas(pasCur.value, pasNew.value, Number(data.version)).then(({ body }) => (data = body));
  // localStorage.setItem('night-customer', JSON.stringify(data));
  console.log(
    hint,
    [...block.querySelectorAll(`.${FormHint.classNames}`)],
    [...block.querySelectorAll(`.${FormHint.classNames}`)][-1],
  );
  hint.textContent = 'still no work';
}

function checkProfilePasBtn(root: HTMLElement): void {
  const inputs = [...root.getElementsByTagName(`${HtmlTags.INPUT}`)] as HTMLInputElement[];
  const hints = [...root.querySelectorAll(`.${FormHint.classNames}`)] as HTMLElement[];
  const btn = root.querySelector(`.${SaveUserInfoBtn.classNames}`) as HTMLElement;
  if (
    inputs.every((input) => input.value !== '') &&
    hints.every((hint) => hint.textContent === '' || hint.textContent === ' ')
  ) {
    btn.classList.add(ButtonClass.active);
    btn.addEventListener('click', saveUserPas);
    btn.removeAttribute('disabled');
  } else {
    if (btn.classList.contains(ButtonClass.active)) {
      btn.classList.remove(ButtonClass.active);
    }
    btn.removeEventListener('click', saveUserPas);
    btn.setAttribute('disabled', 'disabled');
  }
}
