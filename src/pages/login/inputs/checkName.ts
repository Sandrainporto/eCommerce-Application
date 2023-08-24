import { NameHints } from '../authTypes';
import { CONSTANTS } from './constants';

export const checkName = (name: string): string => {
  let hint: string;
  if (name.length === 0) {
    hint = NameHints.LENGTH;
  } else if (CONSTANTS.NUMBERS.test(name)) {
    hint = NameHints.NUMBERS;
  } else if (CONSTANTS.SPEC_SYMBOL.test(name)) {
    hint = NameHints.SYMBOL;
  } else {
    hint = ' ';
  }
  return hint;
};
