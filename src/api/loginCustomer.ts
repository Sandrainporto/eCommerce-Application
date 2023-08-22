import { apiRoot } from './createClient';
import { ILoginUser } from '../pages/login/authTypes';
import { redirect } from '../router/redirectToMain';

export function addHintText(text: string, curHint: HTMLElement): void {
  /* eslint no-param-reassign: "error" */
  curHint.textContent = text;
}

export function loginCustomer(loginInfo: ILoginUser, hint: HTMLElement): Promise<string | void> {
  return apiRoot
    .me()
    .login()
    .post({ body: { email: loginInfo.email, password: loginInfo.pas } })
    .execute()
    .then(() => {
      addHintText('Customer Log In', hint);
      redirect()
      // console.log({ body });
    })
    .catch(() => addHintText('User not found', hint));
}
