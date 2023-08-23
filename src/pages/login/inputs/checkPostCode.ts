import { PostCodesHints } from '../authTypes';
import { CONSTANTS } from './constants';

export const checkPostCode = (props: string): string => {
  let hint: string;
  if (props.length < 5) {
    hint = PostCodesHints.SHORT;
  } else if (props.length > 6) {
    hint = PostCodesHints.LONG;
  } else {
    hint = ' ';
  }
  return hint;
};
