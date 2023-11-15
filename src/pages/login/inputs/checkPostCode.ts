import { PostCodesHints } from '../authTypes';

export const checkPostCode = (props: string): string => {
  // let hint: string;
  return props.length < 5 ? PostCodesHints.SHORT : props.length > 6 ? PostCodesHints.LONG : ' ';
};
