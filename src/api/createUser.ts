import { ClientResponse, Customer, _BaseAddress } from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';
import { INewUser } from '../pages/login/authTypes';
// import { redirect } from '../router/routes';

export const updateDefShipAdr = (customerID: string, shipID: string) => {
  return apiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version: 5,
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

    .catch();
};
export const updateDefBilpAdr = (customerID: string, bilID: string) => {
  return apiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version: 7,
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

    .catch();
};
export const updateCustomerAdress = (customerID: string, userinfo: INewUser) => {
  return (
    apiRoot
      .customers()
      .withId({ ID: customerID })
      .post({
        body: {
          version: 4,
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
      .catch()
  );
};
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
