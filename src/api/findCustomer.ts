import { apiRoot } from './createClient';
import { INewUser } from '../pages/login/authTypes';
import { createCustomer } from './createUser';
import { redirect } from '../router/routes';

export const returnCustomerByEmail = (userInfo: INewUser, hint: HTMLElement): Promise<void> => {
  return apiRoot
    .customers()
    .get({
      queryArgs: {
        where: `email="${userInfo.email}"`,
      },
    })
    .execute()
    .then(({ body }) => {
      // As email addresses must be unique, either 0 or 1 Customers will be returned.
      // If 0, then no Customer exists with this email address.
      if (body.results.length === 0) {
        createCustomer(userInfo, hint);
        redirect();
      } else {
        // Since there can be only one Customer resource in the result, it must be the first entry of the results array. This outputs the Customer's id.
        console.log(body.results[0].id);
        hint.textContent = 'User with this email exist';
        redirect();
      }
    })
    .catch(console.error);
};
