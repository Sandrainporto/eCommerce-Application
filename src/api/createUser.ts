import { apiRoot } from './createClient';
import { INewUser } from '../pages/login/authTypes';
export const createCustomer = (info: INewUser, hint: HTMLElement) => {
  return apiRoot
    .customers()
    .post({
      // The CustomerDraft is the object within the body
      body: {
        email: info.email,
        password: info.pas,
      },
    })
    .execute()
    .then(({ body }) => {
      updateCustomerName(body.customer.id, info.fname, info.lname)
        .then(({ body }) => {
          const customer = body;
          localStorage.setItem('night-customer', JSON.stringify(customer));
          console.log(customer);
        })
        .catch();
    })
    .catch();
};

const updateCustomerName = (customerID: string, fname: string, lname: string) => {
  return apiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      // The CustomerUpdate is the object within the body
      body: {
        // The version of a new Customer is 1. This value is incremented every time an update action is applied to the Customer. If the specified version does not match the current version, the request returns an error.
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
