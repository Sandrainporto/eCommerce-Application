import { EmailHints } from '../authTypes';

export const checkEmail = (email: string): string => {
  let hint: string;
  if (email.includes(' ')) {
    hint = EmailHints.SPACE;
  } else if (!email.includes('@')) {
    hint = EmailHints.SYMBOL;
  } else {
    const textLastPart = email.split('@')[1];
    const domainLeft = textLastPart.split('.')[0];
    const domainRight = textLastPart.split('.')[1];
    if (
      !textLastPart.includes('.') ||
      textLastPart.split('').filter((el) => el === '.').length > 1 ||
      domainLeft.length < 2 ||
      domainRight.length < 2
    ) {
      hint = EmailHints.DOMAIN;
    } else {
      hint = '';
    }
  }
  return hint;
};
