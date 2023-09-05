import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';
import { IDataAddress, INewDataAddress } from '../pages/profile/profileTypes';

export const updateUserName = (
  customerID: string,
  name: string,
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
            firstName: name,
          },
        ],
      },
    })
    .execute()

    .catch();
};
export const updateUserLName = (
  customerID: string,
  name: string,
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
            action: 'setLastName',
            lastName: name,
          },
        ],
      },
    })
    .execute()

    .catch();
};
export const updateUserBDay = (
  customerID: string,
  date: string,
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
            action: 'setDateOfBirth',
            dateOfBirth: date,
          },
        ],
      },
    })
    .execute()

    .catch();
};
export const updateUserEmail = (
  customerID: string,
  email: string,
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
            action: 'changeEmail',
            email,
          },
        ],
      },
    })
    .execute()

    .catch();
};

export const updateUserPas = (curPas: string, newPas: string, version: number): Promise<ClientResponse<Customer>> => {
  return apiRoot
    .me()
    .password()
    .post({
      body: {
        version,
        currentPassword: curPas,
        newPassword: newPas,
      },
    })
    .execute()
    .catch();
};

export const updateUserAdress = (
  customerID: string,
  data: IDataAddress,
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
            action: 'changeAddress',
            addressId: `${data.id}`,
            address: {
              country: `${data.country === 'USA' ? 'EN' : 'RU'}`,
              city: `${data.town}`,
              streetName: `${data.street}`,
              postalCode: `${data.postCode}`,
            },
          },
        ],
      },
    })
    .execute()

    .catch();
};

export const addNewCustomerAdress = (
  customerID: string,
  data: INewDataAddress,
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
              country: `${data.country === 'USA' ? 'EN' : 'RU'}`,
              city: `${data.town}`,
              streetName: `${data.street}`,
              postalCode: `${data.postCode}`,
            },
          },
        ],
      },
    })
    .execute()

    .catch();
};

export const addNewBilAdr = (customerID: string, bilID: string, version: number): Promise<ClientResponse<Customer>> => {
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
        ],
      },
    })
    .execute()

    .catch();
};
export const addNewShipAdr = (
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
        ],
      },
    })
    .execute()

    .catch();
};
