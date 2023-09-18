import { ClientResponse, Customer } from '@commercetools/platform-sdk';
import { apiRoot } from './createClient';
import { IDataAddress, INewDataAddress } from '../pages/profile/profileTypes';
import { addHintText } from './loginCustomer';

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
    .execute();
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
    .execute();
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
    .execute();
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
    .execute();
};

export const updateUserPas = (
  id: string,
  curPas: string,
  newPas: string,
  version: number,
  hint: HTMLElement,
): Promise<ClientResponse<Customer>> => {
  return apiRoot
    .customers()
    .password()
    .post({
      body: {
        id: id,
        version: version,
        currentPassword: curPas,
        newPassword: newPas,
      },
    })
    .execute();
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
              country: `${data.country === 'Canada' ? 'US' : 'BY'}`,
              city: `${data.town}`,
              streetName: `${data.street}`,
              postalCode: `${data.postCode}`,
            },
          },
        ],
      },
    })
    .execute();
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
              country: `${data.country === 'Canada' ? 'US' : 'BY'}`,
              city: `${data.town}`,
              streetName: `${data.street}`,
              postalCode: `${data.postCode}`,
            },
          },
        ],
      },
    })
    .execute();
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
    .execute();
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
    .execute();
};
export const removeBilAdr = (customerID: string, bilID: string, version: number): Promise<ClientResponse<Customer>> => {
  return apiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'removeBillingAddressId',
            addressId: bilID,
          },
          {
            action: 'removeAddress',
            addressId: bilID,
          },
        ],
      },
    })
    .execute()

    .catch();
};
export const removeShipAdr = (
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
            action: 'removeShippingAddressId',
            addressId: bilID,
          },
          {
            action: 'removeAddress',
            addressId: bilID,
          },
        ],
      },
    })
    .execute()

    .catch();
};
