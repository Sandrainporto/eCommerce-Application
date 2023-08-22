export enum AuthPageParam {
  elemTag = 'main',
  classNames = 'page__auth',
  id = 'auth',
}
export enum AuthContainerParam {
  elemTag = 'div',
  classNames = 'auth__container',
}
export enum AuthContainer {
  elemTag = 'div',
  classNames = 'auth__container',
}
export enum Form {
  elemTag = 'form',
  classNames = 'form',
}
export enum FormNav {
  elemTag = 'div',
  classNames = 'form_nav',
}
export enum FormNavLogin {
  elemTag = 'div',
  classNames = 'form_nav',
  innerText = 'Login',
  id = 'form-login',
  listenerType = 'click',
}
export enum FormNavSignUp {
  elemTag = 'div',
  classNames = 'form_nav',
  innerText = 'Sign Up',
  id = 'form-signup',
  listenerType = 'click',
}
export enum FormContent {
  elemTag = 'div',
  classNames = 'form_content',
}
export enum InputBlock {
  elemTag = 'div',
  classNames = 'input_block',
}
export enum LoginEmailInput {
  elemTag = 'input',
  type = 'email',
  classNames = 'login_email',
  id = 'login-email',
  required = '',
}
export enum LoginEmailLabel {
  elemTag = 'label',
  for = 'login-email',
  classNames = 'login_email_label',
  innerText = 'Email',
}
export enum LoginPaslInput {
  elemTag = 'input',
  type = 'text',
  classNames = 'login_pas',
  id = 'login-pas',
  required = '',
}
export enum LoginPasLabel {
  elemTag = 'label',
  for = 'login-pas',
  classNames = 'login_pas_label',
  innerText = 'Password',
}
export enum UserInfoBlock {
  elemTag = 'div',
  classNames = 'user-info_block',
}
export enum UserFNamelInput {
  elemTag = 'input',
  type = 'text',
  classNames = 'new-user_fname',
  id = 'user-fname',
  required = '',
}
export enum UserFNameLabel {
  elemTag = 'label',
  for = 'user-fname',
  classNames = 'user_fname_label',
  innerText = 'First name',
}
export enum UserLNamelInput {
  elemTag = 'input',
  type = 'text',
  classNames = 'new-user_lname',
  id = 'user-lname',
  required = '',
}
export enum UserLNameLabel {
  elemTag = 'label',
  for = 'user-lname',
  classNames = 'user_lname_label',
  innerText = 'Last name',
}
export enum UserLBirthlInput {
  elemTag = 'input',
  type = 'date',
  classNames = 'new-user_lbirth',
  id = 'user-lbirth',
  required = '',
}
export enum UserLBirthLabel {
  elemTag = 'label',
  for = 'user-lbirth',
  classNames = 'user_lbirth_label',
  innerText = 'Date of Birth',
}

export enum UserAddressBlock {
  elemTag = 'div',
  classNames = 'user-address_block',
  innerText = 'Address',
}
export enum AddresslInputCheckbox {
  elemTag = 'input',
  type = 'checkbox',
  classNames = 'new-user_laddress-checkbox',
  id = 'user-laddress-checkbox',
  required = '',
}
export enum AddressLabelCheckbox {
  elemTag = 'label',
  for = 'user-laddress-checkbox',
  classNames = 'user_laddress_label-checkbox',
  innerText = 'Set as default address',
}
export enum CountrySelectLabel {
  elemTag = 'label',
  for = 'country-select',
  innerText = 'Choose the country',
}
export enum CountrySelectBox {
  elemTag = 'select',
  classNames = 'new-user_laddress-country',
  required = '',
  id = 'country-select',
}
export enum CountryOptionUSA {
  elemTag = 'option',
  classNames = 'user_laddress_label-checkbox',
  value = 'Canada',
  innerText = 'USA',
}
export enum CountryOptionBelarus {
  elemTag = 'option',
  classNames = 'user_laddress_label-checkbox',
  value = 'Balarus',
  innerText = 'Belarus',
}

export enum UserLTownlInput {
  elemTag = 'input',
  type = 'text',
  classNames = 'new-user_ltown',
  id = 'user-ltown',
  required = '',
}
export enum UserLTownLabel {
  elemTag = 'label',
  for = 'user-ltown',
  classNames = 'user_ltown_label',
  innerText = 'Town',
}
export enum UserLStreetlInput {
  elemTag = 'input',
  type = 'text',
  classNames = 'new-user_lstreet',
  id = 'user-lstreet',
  required = '',
}
export enum UserLStreetLabel {
  elemTag = 'label',
  for = 'user-lstreet',
  classNames = 'user_lstreet_label',
  innerText = 'Street',
}

export enum UserLPostcodelInput {
  elemTag = 'input',
  type = 'text',
  classNames = 'new-user_lpostcode',
  id = 'user-lpostcode',
  required = '',
}
export enum UserLPostcodeLabel {
  elemTag = 'label',
  for = 'user-lpostcode',
  classNames = 'user_lpostcode_label',
  innerText = 'Postcode',
}

export enum DefAddresslInputCheckbox {
  elemTag = 'input',
  type = 'checkbox',
  classNames = 'new-user_ldefaddress-checkbox',
  id = 'user-ldefaddress-checkbox',
  required = '',
}
export enum DefAddressLabelCheckbox {
  elemTag = 'label',
  for = 'user-ldefaddress-checkbox',
  classNames = 'user_ldefaddress_label-checkbox',
  innerText = 'Set as address for shipping and billing ',
}
export enum SubmitAuthBtn {
  elemTag = 'a',
  classNames = 'form_btn',
  innerText = 'Submit',
  listenerType = 'click',
}
export enum FormHint {
  elemTag = 'div',
  classNames = 'form_hint',
}

export interface INewUser {
  fname: string;
  lname: string;
  email: string;
  pas: string;
}
export interface ILoginUser {
  email: string;
  pas: string;
}
export const specSymbol = '!@#$%^&*';
export const passLength = 8;
export const upperLetters = /[A-Z]/g;
export const lowerLetters = /[a-z]/g;
export const numbers = /[0-9]/g;
