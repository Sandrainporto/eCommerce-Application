import { PassHints } from '../authTypes';
import { CONSTANTS } from './constants';

export const checkPassword = (pass: string): string => {
  let hint: string;
  if (pass.includes(' ')) {
    hint = PassHints.SPACE;
  } else if (pass.length < CONSTANTS.PASS_LENGTH) {
    hint = PassHints.LENGTH;
  } else if (!CONSTANTS.UPPER_LETTERS.test(pass)) {
    hint = PassHints.UPPER_LET;
  } else if (!CONSTANTS.LOWER_LETTERS.test(pass)) {
    hint = PassHints.LOWER_LET;
  } else if (!CONSTANTS.NUMBERS.test(pass)) {
    hint = PassHints.NUMBERS;
  } else {
    hint = ' ';
  }
  return hint;
};
