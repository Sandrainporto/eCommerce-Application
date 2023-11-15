import { ClientResponse, Customer, CustomerSignInResult } from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';
import { INewUser } from '../pages/login/authTypes';

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
    .execute();
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
    .execute();
};
export const updateCustomerAdress = (
  customerID: string,
  userinfo: INewUser,
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
    .execute();
};

export const updateCustomerName = (
  customerID: string,
  userinfo: INewUser,
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
    .catch();
};

export const createCustomer = (info: INewUser): Promise<ClientResponse<CustomerSignInResult>> => {
  return apiRoot
    .customers()
    .post({
      body: {
        email: info.email,
        password: info.pas,
      },
    })
    .execute();
};
