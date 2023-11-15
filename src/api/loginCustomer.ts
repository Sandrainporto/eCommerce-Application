import { apiRoot } from './createClient';
import { ILoginUser } from '../pages/login/authTypes';
// import { redirect } from '../router/routes';

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
    .then((body) => {
      addHintText('Customer Log In', hint);
      localStorage.setItem('night-customer-email', JSON.stringify(body.body.customer.email));
      localStorage.setItem('night-customer', JSON.stringify(body.body.customer));
      localStorage.setItem('userName', `${body.body.customer.firstName} ${body.body.customer.lastName}`);
      window.history.replaceState({}, '', '/');
      window.history.go();
    })
    .catch(() => addHintText('User not found', hint));
}
