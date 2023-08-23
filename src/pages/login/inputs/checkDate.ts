import { DateHints } from '../authTypes';
import { CONSTANTS } from './constants';

export const checkDate = (date: string): string => {
  let hint: string;
  const birth = new Date(date);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dateOfBirth = new Date(birth.getFullYear(), birth.getMonth(), birth.getDate());
  let age = today.getFullYear() - dateOfBirth.getFullYear();
  if (today < dateOfBirth) {
    age -= 1;
  }
  if (age < CONSTANTS.AGE) {
    hint = DateHints.TO_YOUNG;
  } else {
    hint = '';
  }
  return hint;
};
