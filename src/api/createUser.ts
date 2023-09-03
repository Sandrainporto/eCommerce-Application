import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';
import { INewUser } from '../pages/login/authTypes';
// import { redirect } from '../router/routes';

// : Promise<void | ClientResponse<Customer>>
export const updateCustomerName = (customerID: string, userinfo: INewUser) => {
  return (
    apiRoot
      .customers()
      .withId({ ID: customerID })
      .post({
        body: {
          version: 1,
          actions: [
            {
              action: 'setFirstName',
              firstName: `${userinfo.fname}`,
            },
            {
              action: 'setLastName',
              lastName: `${userinfo.lname}`,
            },
          ],
        },
      })
      .execute()
      // .then(({ body }) => {
      //   const customer = body;
      //   localStorage.setItem('night-customer', JSON.stringify(customer));
      //   localStorage.setItem('reg-customer-name', JSON.stringify(`${customer.firstName} ${customer.lastName}`));
      //   console.log(customer, customerID, userinfo);
      // })
      .catch()
  );
};
// : Promise<void>
export const createCustomer = (info: INewUser) => {
  return (
    apiRoot
      .customers()
      .post({
        // The CustomerDraft is the object within the body
        body: {
          email: info.email,
          password: info.pas,
        },
      })
      .execute()
      // .then(({ body }) => {
      //   updateCustomerName(body.customer.id, info)
      //     .then(() => {
      //       const customer = body;
      //       localStorage.setItem('night-customer', JSON.stringify(customer));
      //       // redirect();
      //     })
      //     .catch();
      // })
      .catch()
  );
};
