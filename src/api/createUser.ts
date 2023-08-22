import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';
import { INewUser } from '../pages/login/authTypes';
import { redirect } from '../router/routes';

const updateCustomerName = (customerID: string, fname: string, lname: string): Promise<ClientResponse<Customer>> => {
  return apiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version: 1,
        actions: [
          {
            action: 'setFirstName',
            firstName: `${fname}`,
          },
          {
            action: 'setLastName',
            lastName: `${lname}`,
          },
        ],
      },
    })
    .execute();
};

export const createCustomer = (info: INewUser, hint: HTMLElement): Promise<void> => {
  return apiRoot
    .customers()
    .post({
      body: {
        email: info.email,
        password: info.pas,
      },
    })
    .execute()
    .then(({ body }) => {
      updateCustomerName(body.customer.id, info.fname, info.lname)
        .then(() => {
          const customer = body;
          localStorage.setItem('night-customer', JSON.stringify(customer));
          redirect();
        })
        .catch();
    })
    .catch();
};
