import { apiRoot } from './createClient';
import { MyCustomerChangePassword } from '@commercetools/platform-sdk';

export const updateUserName = (customerID: string, name: string, version: number) => {
  return apiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version: version,
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
export const updateUserLName = (customerID: string, name: string, version: number) => {
  return apiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version: version,
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
export const updateUserBDay = (customerID: string, date: string, version: number) => {
  return apiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version: version,
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
export const updateUserEmail = (customerID: string, email: string, version: number) => {
  return apiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version: version,
        actions: [
          {
            action: 'changeEmail',
            email: email,
          },
        ],
      },
    })
    .execute()

    .catch();
};
export const updateUserPas = (curPas: string, newPas: string, version: number) => {
  return apiRoot
    .me()
    .password()
    .post({
      body: {
        version: version,
        currentPassword: curPas,
        newPassword: newPas,
      },
    })
    .execute()
    .catch();
};

export const updateAddress = () => {};
