import { apiRoot } from './createClient';
import { ILoginUser } from '../pages/login/authTypes';
export function loginCustomer(loginInfo: ILoginUser, hint: HTMLElement) {
  return apiRoot
    .me()
    .login()
    .post({ body: { email: loginInfo.email, password: loginInfo.pas } })
    .execute()
    .then(({ body }) => {
      hint.textContent = 'Customer Log In';
      console.log({ body });
    })
    .catch(() => (hint.textContent = 'User not found'));
}
