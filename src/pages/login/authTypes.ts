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
export const specSymbol = '!@#$%^&*';
export const passLength = 8;
export const upperLetters = /[A-Z]/g;
export const lowerLetters = /[a-z]/g;
export const numbers = /[0-9]/g;
