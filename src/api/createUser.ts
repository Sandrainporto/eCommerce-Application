import { ClientResponse, Customer, CustomerSignInResult } from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';
import { INewUser } from '../pages/login/authTypes';
// import { redirect } from '../router/routes';

export const updateDefShipAdr = (
  customerID: string,
  shipID: string,
  version: number,
): Promise<ClientResponse<Customer>> => {
  return apiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'addShippingAddressId',
            addressId: shipID,
          },
          {
            action: 'setDefaultShippingAddress',
            addressId: shipID,
          },
        ],
      },
    })
    .execute()
};
export const updateDefBilpAdr = (
  customerID: string,
  bilID: string,
  version: number,
): Promise<ClientResponse<Customer>> => {
  return apiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'addBillingAddressId',
            addressId: bilID,
          },
          {
            action: 'setDefaultBillingAddress',
            addressId: bilID,
          },
        ],
      },
    })
    .execute()
};
export const updateCustomerAdress = (
  customerID: string,
  userinfo: INewUser,
  version: number,
): Promise<ClientResponse<Customer>> => {
  return (
    apiRoot
      .customers()
      .withId({ ID: customerID })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'addAddress',
              address: {
                country: `${userinfo.country === 'USA' ? 'EN' : 'RU'}`,
                city: `${userinfo.town}`,
                streetName: `${userinfo.street}`,
                postalCode: `${userinfo.postCode}`,
              },
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
  );
};
// : Promise<void | ClientResponse<Customer>>
export const updateCustomerName = (
  customerID: string,
  userinfo: INewUser,
  version: number,
): Promise<ClientResponse<Customer>> => {
  return (
    apiRoot
      .customers()
      .withId({ ID: customerID })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'setFirstName',
              firstName: `${userinfo.fname}`,
            },
            {
              action: 'setLastName',
              lastName: `${userinfo.lname}`,
            },
            {
              action: 'setDateOfBirth',
              dateOfBirth: `${userinfo.birth}`,
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
export const createCustomer = (info: INewUser): Promise<ClientResponse<CustomerSignInResult>> => {
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
  );
};
