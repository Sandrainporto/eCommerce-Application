import {
  UserFNameLabel,
  UserFNamelInput,
  UserLNameLabel,
  UserLNamelInput,
  UserLBirthLabel,
  UserLBirthlInput,
  LoginEmailLabel,
  LoginEmailInput,
} from '../login/authTypes';

export enum ProfilePageParam {
  elemTag = 'main',
  classNames = 'profile_page',
  id = 'prof',
}
export enum ProfileInfo {
  elemTag = 'div',
  classNames = 'profile_info',
}
export enum ProfileHeader {
  elemTag = 'h2',
  classNames = 'profile_header',
  innerText = 'Profile',
}
export enum ProfileUserInfo {
  elemTag = 'div',
  classNames = 'profile_info__user-info',
}
export enum ProfileUserAresses {
  elemTag = 'div',
  classNames = 'profile_info__user-adr',
}
export enum ProfileUserBilAdr {
  elemTag = 'div',
  classNames = 'profile_adr__bil',
}
export enum ProfileUserShipAdr {
  elemTag = 'div',
  classNames = 'profile_adr__ship',
}
export enum ProfileUserNewAdr {
  elemTag = 'div',
  classNames = 'profile_adr__new',
}
export enum ProfileUserNewAdrHeader {
  elemTag = 'h3',
  classNames = 'profile_adr__new-header',
  innerText = 'Add adress',
}

export const userProfileFields = {
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
  email: {
    label: LoginEmailLabel,
    input: LoginEmailInput,
  },
};

export enum SaveUserInfoBtn {
  elemTag = 'button',
  classNames = 'save-user-info',
  innerText = 'SAVE',
}
export enum InputPasBlock {
  elemTag = 'div',
  classNames = 'input-pas_block',
}
export enum LoginCurPaslInput {
  elemTag = 'input',
  type = 'text',
  classNames = 'login_pas__cur',
  id = 'login-pas-cur',
  required = '',
}
export enum LoginCurPasLabel {
  elemTag = 'label',
  for = 'login-pas-cur',
  classNames = 'login_pas-cur_label',
  innerText = 'Current password',
}
export enum LoginNewPaslInput {
  elemTag = 'input',
  type = 'text',
  classNames = 'login_pas__new',
  id = 'login-pas-new',
  required = '',
}
export enum LoginNewPasLabel {
  elemTag = 'label',
  for = 'login-pas-new',
  classNames = 'login_pas-new_label',
  innerText = 'New password',
}
export const UserPasFields = {
  curPass: {
    label: LoginCurPasLabel,
    input: LoginCurPaslInput,
  },
  newPass: {
    label: LoginNewPasLabel,
    input: LoginNewPaslInput,
  },
};

export enum BilAdrHeader {
  elemTag = 'h3',
  classNames = 'profile_bil_header',
  innerText = 'Billing Adresses',
}
export enum ShipAdrHeader {
  elemTag = 'h3',
  classNames = 'profile_ship_header',
  innerText = 'Shipping Adresses',
}

export enum AdrBlock {
  elemTag = 'div',
  classNames = 'profile_adr-block',
}
export enum ProfLTownlInput {
  elemTag = 'input',
  type = 'text',
  classNames = 'new-user_ltown',
  required = '',
}
export enum ProfTownLabel {
  elemTag = 'label',
  for = 'user-ltown',
  classNames = 'user_ltown_label',
  innerText = 'Town',
}
export enum ProfStreetlInput {
  elemTag = 'input',
  type = 'text',
  classNames = 'new-user_lstreet',
  required = '',
}
export enum ProfStreetLabel {
  elemTag = 'label',
  for = 'user-lstreet',
  classNames = 'user_lstreet_label',
  innerText = 'Street',
}

export enum ProfPostcodelInput {
  elemTag = 'input',
  type = 'text',
  classNames = 'new-user_lpostcode',
  required = '',
}
export enum ProfPostcodeLabel {
  elemTag = 'label',
  for = 'user-lpostcode',
  classNames = 'user_lpostcode_label',
  innerText = 'Postcode',
}
export const addressProfFields = {
  town: {
    label: ProfTownLabel,
    input: ProfLTownlInput,
  },
  street: {
    label: ProfStreetLabel,
    input: ProfStreetlInput,
  },
  post: {
    label: ProfPostcodeLabel,
    input: ProfPostcodelInput,
  },
};
export enum CountryProFSelectLabel {
  elemTag = 'label',
  for = 'country-select',
  innerText = 'Country',
  id = 'country-label',
}

export enum SaveAdrBtn {
  elemTag = 'button',
  classNames = 'save-adr-btn',
  innerText = 'SAVE',
}
export enum DelAdrBtn {
  elemTag = 'button',
  classNames = 'del-adr-btn',
  innerText = 'DELETE',
}
export enum DefHeader {
  elemTag = 'h3',
  classNames = 'defheader',
  innerText = 'Deafault address',
}

export interface IDataAddress {
  id: string;
  country: string;
  town: string;
  street: string;
  postCode: string;
}
export interface INewDataAddress {
  country: string;
  town: string;
  street: string;
  postCode: string;
  bil?: boolean;
  ship?: boolean;
  def?: boolean;
}

export enum ProfileNewAdrCheckboxBlock {
  elemTag = 'div',
  classNames = 'new-adr_checkbox-block',
}
export enum ProfileBilAddresslInputCheckbox {
  elemTag = 'input',
  type = 'checkbox',
  checked = 'true',
  classNames = 'new-bil_laddress-checkbox',
  id = 'new-billing-adr',
}
export enum ProfileBilAddressLabelCheckbox {
  elemTag = 'label',
  for = 'new-billing-adr',
  classNames = 'new-bil_label-checkbox',
  innerText = 'Set as billing address',
  // value = 'chosen',
}
export enum ProfileShipAddresslInputCheckbox {
  elemTag = 'input',
  type = 'checkbox',
  classNames = 'new-ship_laddress-checkbox',
  id = 'new-ship-adr',
}
export enum ProfileShipAddressLabelCheckbox {
  elemTag = 'label',
  for = 'new-ship-adr',
  classNames = 'new-ship_label-checkbox',
  innerText = 'Set as shipping address',
  // value = 'chosen',
}
export enum ProfileDefAddresslInputCheckbox {
  elemTag = 'input',
  type = 'checkbox',
  classNames = 'new_def_adr-checkbox',
  id = 'new-default-adr',
}
export enum ProfileDefAddressLabelCheckbox {
  elemTag = 'label',
  for = 'new-default-adr',
  classNames = 'new_def_adr-label',
  innerText = 'Set as default',
}
export const DefAdrClassName = 'default';
