import { ClientResponse, CustomerPagedQueryResponse } from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';
import { INewUser } from '../pages/login/authTypes';

// import { redirect } from '../router/routes';: Promise<void>

export const returnCustomerByEmail = (
  userInfo: INewUser,
  hint: HTMLElement,
): Promise<ClientResponse<CustomerPagedQueryResponse>> => {
  // const element = hint;
  return apiRoot
    .customers()
    .get({
      queryArgs: {
        where: `email="${userInfo.email}"`,
      },
    })
    .execute();
  // .then(({ body }) => {
  //   // As email addresses must be unique, either 0 or 1 Customers will be returned.
  //   // If 0, then no Customer exists with this email address.
  //   if (body.results.length === 0) {
  //     createCustomer(userInfo);
  //     element.textContent = 'User created';
  //     // redirect();
  //   } else {
  //     // Since there can be only one Customer resource in the result, it must be the first entry of the results array. This outputs the Customer's id.
  //     // console.log(body.results[0].id);
  //     element.textContent = 'User with this email exist';
  //   }
  // })
  // .catch();
};
export const getCustomerByEmail = async (email: string): Promise<ClientResponse<CustomerPagedQueryResponse>> => {
  return apiRoot
    .customers()
    .get({
      queryArgs: {
        where: `email=${email}`,
      },
    })
    .execute();
};
