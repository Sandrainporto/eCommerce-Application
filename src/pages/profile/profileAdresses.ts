import { Customer, Address } from '@commercetools/platform-sdk';
import { ButtonClass } from '../../types/htmlClasses';
import { HtmlTags } from '../../types/htmlTags';
import { createElement } from '../../utils/elementCreator';
import { inputProfileAdrCreator, inputCreator } from '../../utils/inputCreator';
import { countries } from '../login/authContent';
import { CountrySelectBox, FormHint } from '../login/authTypes';
import { addHintContent } from '../login/formValidation';
import { checkPostCode } from '../login/inputs/checkPostCode';
import {
  AdrBlock,
  BilAdrHeader,
  ProfileUserBilAdr,
  ProfileUserShipAdr,
  ShipAdrHeader,
  addressProfFields,
  CountryProFSelectLabel,
  ProfLTownlInput,
  ProfStreetlInput,
  ProfPostcodelInput,
  SaveAdrBtn,
  DelAdrBtn,
  DefHeader,
} from './profileTypes';

function updateAddress() {}

function checkAdrBtn(input: HTMLInputElement) {
  const block = input.parentElement?.parentElement as HTMLElement;
  const inputs = [...block.getElementsByTagName(`${HtmlTags.INPUT}`)] as HTMLInputElement[];
  const hints = [...block.querySelectorAll(`.${FormHint.classNames}`)] as HTMLElement[];
  const btn = block.querySelector(`.${SaveAdrBtn.classNames}`) as HTMLElement;
  if (
    inputs.every((input) => input.value !== '') &&
    hints.every((hint) => hint.textContent === '' || hint.textContent === ' ')
  ) {
    btn.classList.add(ButtonClass.active);
    btn.addEventListener('click', updateAddress);
    btn.removeAttribute('disabled');
  } else {
    if (btn.classList.contains(ButtonClass.active)) {
      btn.classList.remove(ButtonClass.active);
    }
    btn.removeEventListener('click', updateAddress);
    btn.setAttribute('disabled', 'disabled');
  }
}

function checkPostCodeInput(e: Event): void {
  const input = e.target;
  if (input instanceof HTMLInputElement) {
    const hint = input.nextElementSibling as HTMLElement;
    const text = input.value;
    if (hint !== null) {
      hint.textContent = text;
      let errorMessage = ' ';
      errorMessage = checkPostCode(text);
      if (errorMessage) {
        addHintContent(hint, errorMessage);
      } else {
        addHintContent(hint);
      }
    }
    checkAdrBtn(input);
  }
}

function setSelectedCountry(select: HTMLElement, country: string = 'Belarus') {
  [...select.querySelectorAll(`.${countries.USA.classNames}`)].find((el) => {
    el.textContent === country;
    el.setAttribute('selected', 'selected');
  });
}

function createAdrBlock(adress: Address | undefined, root: HTMLElement, defAdr: string | undefined): void {
  if (adress) {
    const adrBlock = createElement(AdrBlock, root);
    adrBlock.classList.add(adress.id as string);
    if (defAdr && adress.id === defAdr) {
      createElement(DefHeader, adrBlock);
      adrBlock.classList.add('default');
    }
    const selectAddress = inputCreator(CountryProFSelectLabel, CountrySelectBox, adrBlock);

    const select = selectAddress.querySelector(`#${CountrySelectBox.id}`) as HTMLElement;

    Object.values(countries).forEach((el) => {
      createElement(el, select, (e: Event) => {});
    });
    if (adress.country === 'EN') {
      setSelectedCountry(select, adress.country);
    } else {
      setSelectedCountry(select);
    }

    Object.values(addressProfFields).forEach((el) => inputProfileAdrCreator(el.label, el.input, adrBlock));
    [...adrBlock.getElementsByTagName(HtmlTags.INPUT)].forEach((input) => {
      if (input.classList.contains(ProfLTownlInput.classNames)) input.value = adress.city as string;
      if (input.classList.contains(ProfStreetlInput.classNames)) input.value = adress.streetName as string;
      if (input.classList.contains(ProfPostcodelInput.classNames)) {
        input.value = adress.postalCode as string;
        input.addEventListener('input', (e: Event) => checkPostCodeInput(e));
      }
    });
    createElement(SaveAdrBtn, adrBlock);
    createElement(DelAdrBtn, adrBlock);
  }
}

function fillAdrBlock(
  root: HTMLElement,
  addrFul: Address[],
  adresses: string[] | undefined,
  defAdr: string | undefined,
): void {
  if (root.classList.contains(`${ProfileUserBilAdr.classNames}`)) {
    createElement(BilAdrHeader, root);
  } else {
    createElement(ShipAdrHeader, root);
  }
  const adrToRender = [];
  adresses?.forEach((adr) => {
    const selAdr = addrFul.find((el) => el.id === adr);
    createAdrBlock(selAdr, root, defAdr);
  });
}

export function showAdresess(root: HTMLElement, customer: Customer) {
  console.log(root, customer);
  const bilAdrBlock = createElement(ProfileUserBilAdr, root);
  fillAdrBlock(bilAdrBlock, customer.addresses, customer.billingAddressIds, customer.defaultBillingAddressId);
  const shipAdrBlock = createElement(ProfileUserShipAdr, root);
  fillAdrBlock(shipAdrBlock, customer.addresses, customer.shippingAddressIds, customer.defaultShippingAddressId);
}
