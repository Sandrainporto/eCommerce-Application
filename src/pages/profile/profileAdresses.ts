import { Customer, Address } from '@commercetools/platform-sdk';
import {
  addNewBilAdr,
  addNewShipAdr,
  addNewCustomerAdress,
  updateUserAdress,
  removeBilAdr,
  removeShipAdr,
} from '../../api/changeProfile';
import { updateDefBilpAdr, updateDefShipAdr } from '../../api/createUser';
import { ButtonClass } from '../../types/htmlClasses';
import { HtmlTags } from '../../types/htmlTags';
import { createElement } from '../../utils/elementCreator';
import { inputProfileAdrCreator, inputCreator, enableELement, disableElement } from '../../utils/inputCreator';
import { countries } from '../login/authContent';
import { CountrySelectBox, FormHint } from '../login/authTypes';
import { addHintContent } from '../login/formValidation';
import { checkName } from '../login/inputs/checkName';
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
  ProfileUserNewAdr,
  ProfileUserNewAdrHeader,
  ProfileNewAdrCheckboxBlock,
  ProfileBilAddresslInputCheckbox,
  ProfileBilAddressLabelCheckbox,
  ProfileShipAddresslInputCheckbox,
  ProfileShipAddressLabelCheckbox,
  ProfileDefAddresslInputCheckbox,
  ProfileDefAddressLabelCheckbox,
  INewDataAddress,
} from './profileTypes';

async function updateAddress(e: Event): Promise<void> {
  e.preventDefault();
  const btn = e.target as HTMLElement;
  const block = btn.parentElement as HTMLElement;
  const type = block?.parentElement?.classList.value;
  const inputs = [...block.getElementsByTagName(`${HtmlTags.INPUT}`)];
  const selects = [...block.getElementsByTagName(`${HtmlTags.SELECT}`)];
  let userData = JSON.parse(localStorage.getItem('night-customer') as string);
  const dataAdress = {
    id: block.getAttribute('data-id') as string,
    country: selects.find((el) => el.id === `${CountrySelectBox.id}`)?.value as string,
    town: inputs.find((el) => el.className === `${ProfLTownlInput.classNames}`)?.value as string,
    street: inputs.find((el) => el.className === `${ProfStreetlInput.classNames}`)?.value as string,
    postCode: inputs.find((el) => el.className === `${ProfPostcodelInput.classNames}`)?.value as string,
  };
  await updateUserAdress(userData.id, dataAdress, Number(userData.version)).then(({ body }) => {
    userData = body;
  });
  localStorage.setItem('night-customer', JSON.stringify(userData));
  // console.log(block, type, dataAdress);
}


async function deleteAddress(e: Event): Promise<void> {
  const delBtn = e.target as HTMLElement;
  const blockForRemove = delBtn.parentElement as HTMLElement;
  const categoryBlock = blockForRemove.parentElement as HTMLElement;
  const isBillingAdress = categoryBlock.classList.contains(`${ProfileUserBilAdr.classNames}`) as boolean;
  // const isDeafult = blockForRemove.classList.contains(`${DefAdrClassName}`);
  const adrForRemoveID = blockForRemove.getAttribute('data-id') as string;
  let userDelData = JSON.parse(localStorage.getItem('night-customer') as string);
  if (isBillingAdress) {
    await removeBilAdr(userDelData.id, adrForRemoveID, userDelData.version)
      .then(({ body }) => {
        userDelData = body;
      })
      .catch();
  } else {
    await removeShipAdr(userDelData.id, adrForRemoveID, userDelData.version)
      .then(({ body }) => {
        userDelData = body;
      })
      .catch();
  }
  blockForRemove.remove();
  localStorage.setItem('night-customer', JSON.stringify(userDelData));
  console.log(delBtn, blockForRemove, isBillingAdress, adrForRemoveID, 'tyt');


function checkAdrBtn(input: HTMLInputElement): void {
  const block = input.parentElement?.parentElement as HTMLElement;
  const inputsCur = [...block.getElementsByTagName(`${HtmlTags.INPUT}`)] as HTMLInputElement[];
  const hintsCur = [...block.querySelectorAll(`.${FormHint.classNames}`)] as HTMLElement[];
  const btn = block.querySelector(`.${SaveAdrBtn.classNames}`) as HTMLElement;
  if (
    inputsCur.every((inpt) => inpt.value !== '') &&
    hintsCur.every((hint) => hint.textContent === '' || hint.textContent === ' ')
  ) {
    btn.classList.add(ButtonClass.active);
    btn.addEventListener('click', updateAddress);
    enableELement(btn);
  } else {
    if (btn.classList.contains(ButtonClass.active)) {
      btn.classList.remove(ButtonClass.active);
    }
    btn.removeEventListener('click', updateAddress);
    disableElement(btn);
  }
}

function checkNewAdrBtn(): void {
  const block = document.querySelector(`.${ProfileUserNewAdr.classNames}`) as HTMLElement;
  const inputsCur = [...block.getElementsByTagName(`${HtmlTags.INPUT}`)] as HTMLInputElement[];
  const inputsTextCur = inputsCur.filter((curInp) => curInp.type === ProfLTownlInput.type);
  const hintsCur = [...block.querySelectorAll(`.${FormHint.classNames}`)] as HTMLElement[];
  const btn = block.querySelector(`.${SaveAdrBtn.classNames}`) as HTMLElement;
  const chbxNewBil = inputsCur.find((bil) => bil.id === ProfileBilAddresslInputCheckbox.id) as HTMLInputElement;
  const chbxNewShip = inputsCur.find((ship) => ship.id === ProfileShipAddresslInputCheckbox.id) as HTMLInputElement;
  if (
    inputsTextCur.every((inpt) => inpt.type !== '') &&
    hintsCur.every((hint) => hint.textContent === '' || hint.textContent === ' ') &&
    (chbxNewBil.checked === true || chbxNewShip.checked === true)
  ) {
    btn.classList.add(ButtonClass.active);
    btn.addEventListener('click', createAdress);
    enableELement(btn);
  } else {
    if (btn.classList.contains(ButtonClass.active)) {
      btn.classList.remove(ButtonClass.active);
    }
    btn.removeEventListener('click', createAdress);
    disableElement(btn);
  }
}

function checkAdrInput(e: Event, flag?: boolean): void {
  const input = e.target;
  if (input instanceof HTMLInputElement) {
    const hint = input.nextElementSibling as HTMLElement;
    const text = input.value;
    if (hint !== null) {
      hint.textContent = text;
      let errorMessage = ' ';
      if (input.classList.contains(ProfLTownlInput.classNames)) {
        errorMessage = checkName(text);
      }
      if (input.classList.contains(ProfPostcodelInput.classNames)) {
        errorMessage = checkPostCode(text);
      }
      if (errorMessage) {
        addHintContent(hint, errorMessage);
      } else {
        addHintContent(hint);
      }
    }
    if (flag !== false) {
      checkAdrBtn(input);
    } else {
      checkNewAdrBtn();
    }
  }
}

function setSelectedCountry(select: HTMLElement, country: string): void {
  const curCountry = country === 'RU' ? 'Belarus' : 'USA';
  const options = [...select.querySelectorAll(`.${countries.USA.classNames}`)] as HTMLOptionElement[];
  options.forEach((el) => {
    if (el.textContent === curCountry) {
      el.selected = true;
    }
  });
}

function createAdrBlock(adress: Address | undefined, root: HTMLElement, defAdr?: string | undefined): void {
  if (adress) {
    const adrBlock = createElement(AdrBlock, root);
    adrBlock.setAttribute('data-id', adress.id as string);
    if (defAdr && adress.id === defAdr) {
      createElement(DefHeader, adrBlock);
      adrBlock.classList.add('default');
    }
    const selectAddress = inputCreator(CountryProFSelectLabel, CountrySelectBox, adrBlock);

    const select = selectAddress.querySelector(`#${CountrySelectBox.id}`) as HTMLElement;

    Object.values(countries).forEach((el) => {
      createElement(el, select, (e: Event) => {});
    });

    setSelectedCountry(select, adress.country);

    Object.values(addressProfFields).forEach((el) => inputProfileAdrCreator(el.label, el.input, adrBlock));
    [...adrBlock.getElementsByTagName(HtmlTags.INPUT)].forEach((input) => {
      if (input.classList.contains(ProfLTownlInput.classNames)) {
        input.value = adress.city as string;
      }
      if (input.classList.contains(ProfStreetlInput.classNames)) {
        input.value = adress.streetName as string;
      }
      if (input.classList.contains(ProfPostcodelInput.classNames)) {
        input.value = adress.postalCode as string;
      }
      input.addEventListener('input', (e: Event) => checkAdrInput(e));
    });
    createElement(SaveAdrBtn, adrBlock, updateAddress);
    createElement(DelAdrBtn, adrBlock, deleteAddress);
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

function checkNewChecbox(e: Event): void {
  const curChecBox = e.target as HTMLInputElement;
  const block = curChecBox.parentElement?.parentElement as HTMLElement;
  const bilCheck = block.querySelector(`#${ProfileBilAddresslInputCheckbox.id}`) as HTMLInputElement;
  const shipCheck = block.querySelector(`#${ProfileShipAddresslInputCheckbox.id}`) as HTMLInputElement;
  if (curChecBox.id === ProfileBilAddresslInputCheckbox.id) {
    if (curChecBox.checked) {
      shipCheck.checked = false;
    }
  }
  if (curChecBox.id === ProfileShipAddresslInputCheckbox.id) {
    if (curChecBox.checked) {
      bilCheck.checked = false;
    }
  }
}

function renderNewAdress(adrData: INewDataAddress, newAdr: Address, container: HTMLElement) {
  console.log(adrData, newAdr, container);
  const curBilBlock = container.querySelector(`.${ProfileUserBilAdr.classNames}`) as HTMLElement;
  const curShipBlock = container.querySelector(`.${ProfileUserShipAdr.classNames}`) as HTMLElement;
  if (adrData.bil) {
    if (adrData.def) {
      const defBilheader = curBilBlock.querySelector(`.${DefHeader.classNames}`);
      if (defBilheader) defBilheader.remove();
      createAdrBlock(newAdr, curBilBlock, newAdr.id);
    } else {
      createAdrBlock(newAdr, curBilBlock);
    }
  } else {
    if (adrData.def) {
      const defShipheader = curShipBlock.querySelector(`.${DefHeader.classNames}`);
      console.log(defShipheader);
      if (defShipheader) defShipheader.remove();
      createAdrBlock(newAdr, curShipBlock, newAdr.id);
    } else {
      createAdrBlock(newAdr, curShipBlock);
    }
  }
}

async function createAdress(e: Event): Promise<void> {
  const btn = e.target as HTMLElement;
  const block = btn.parentElement as HTMLElement;
  const profileContainer = block.parentElement as HTMLElement;
  const inputs = [...block.getElementsByTagName(HtmlTags.INPUT)];
  const selects = [...block.getElementsByTagName(`${HtmlTags.SELECT}`)];
  selects.forEach((el) => console.log(el.value));
  let userData = JSON.parse(localStorage.getItem('night-customer') as string);
  const newAdrData: INewDataAddress = {
    country: selects.find((el) => el.className === `${CountrySelectBox.classNames}`)?.value as string,
    town: inputs.find((el) => el.className === `${ProfLTownlInput.classNames}`)?.value as string,
    street: inputs.find((el) => el.className === `${ProfStreetlInput.classNames}`)?.value as string,
    postCode: inputs.find((el) => el.className === `${ProfPostcodelInput.classNames}`)?.value as string,
    bil: inputs.find((el) => el.className === `${ProfileBilAddresslInputCheckbox.classNames}`)?.checked as boolean,
    ship: inputs.find((el) => el.className === `${ProfileShipAddresslInputCheckbox.classNames}`)?.checked as boolean,
    def: inputs.find((el) => el.className === `${ProfileDefAddresslInputCheckbox.classNames}`)?.checked as boolean,
  };
  await addNewCustomerAdress(userData.id as string, newAdrData, userData.version).then(({ body }) => {
    userData = body;
  });
  const createdAdr = userData.addresses[userData.addresses.length - 1];
  if (newAdrData.bil) {
    const bilBlockForNewAdr = document.querySelector(`${ProfileUserBilAdr.classNames}`);
    if (newAdrData.def) {
      await updateDefBilpAdr(userData.id, createdAdr.id, userData.version).then(({ body }) => {
        userData = body;
      });
    } else {
      await addNewBilAdr(userData.id as string, createdAdr.id as string, userData.version).then(({ body }) => {
        userData = body;
      });
    }
    await renderNewAdress(newAdrData, createdAdr, profileContainer);
  }
  if (newAdrData.ship) {
    const bilBlockForNewAdr = document.querySelector(`${ProfileUserShipAdr.classNames}`);
    if (newAdrData.def) {
      await updateDefShipAdr(userData.id, createdAdr.id, userData.version).then(({ body }) => {
        userData = body;
      });
    } else {
      await addNewShipAdr(userData.id as string, createdAdr.id as string, userData.version).then(({ body }) => {
        userData = body;
      });
    }
    await renderNewAdress(newAdrData, createdAdr, profileContainer);
  }
  localStorage.setItem('night-customer', JSON.stringify(userData));
}

function fillNewAdrBlock(root: HTMLElement): void {
  createElement(ProfileUserNewAdrHeader, root);
  const selectAddress = inputCreator(CountryProFSelectLabel, CountrySelectBox, root);

  const select = selectAddress.querySelector(`#${CountrySelectBox.id}`) as HTMLElement;

  Object.values(countries).forEach((el) => {
    createElement(el, select, (e: Event) => {});
  });
  Object.values(addressProfFields).forEach((el) => inputProfileAdrCreator(el.label, el.input, root));
  [...root.getElementsByTagName(HtmlTags.INPUT)].forEach((input) => {
    input.addEventListener('input', (e: Event) => checkAdrInput(e, false));
  });
  const checkboxBlock = createElement(ProfileNewAdrCheckboxBlock, root);
  inputProfileAdrCreator(ProfileBilAddresslInputCheckbox, ProfileBilAddressLabelCheckbox, checkboxBlock);
  inputProfileAdrCreator(ProfileShipAddresslInputCheckbox, ProfileShipAddressLabelCheckbox, checkboxBlock);
  inputProfileAdrCreator(ProfileDefAddresslInputCheckbox, ProfileDefAddressLabelCheckbox, checkboxBlock);
  [...checkboxBlock.getElementsByTagName(HtmlTags.INPUT)].forEach((chbx) => {
    chbx.addEventListener('click', checkNewChecbox);
    chbx.addEventListener('click', checkNewAdrBtn);
    chbx.checked = false;
  });

  const newAdrSaveBtn = createElement(SaveAdrBtn, root, createAdress);
  disableElement(newAdrSaveBtn);
}
export function showAdresess(root: HTMLElement, customer: Customer): void {
  console.log(root, customer);
  const bilAdrBlock = createElement(ProfileUserBilAdr, root);
  fillAdrBlock(bilAdrBlock, customer.addresses, customer.billingAddressIds, customer.defaultBillingAddressId);
  const shipAdrBlock = createElement(ProfileUserShipAdr, root);
  fillAdrBlock(shipAdrBlock, customer.addresses, customer.shippingAddressIds, customer.defaultShippingAddressId);
  const newAdrBlock = createElement(ProfileUserNewAdr, root);
  fillNewAdrBlock(newAdrBlock);
}
