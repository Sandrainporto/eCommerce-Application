import './footer.scss';
import { FooterContainerParam, FooterParam } from '../../types/types';
import { createElement } from '../../utils/elementCreator';

export function addFooterLink(root: HTMLElement): HTMLLinkElement {
  enum FooterLinkParam {
    elemTag = 'a',
    classNames = 'footer__link',
    innerText = 'About Us',
  }
  const linkToAboutUs = createElement(FooterLinkParam, root) as HTMLLinkElement;
  linkToAboutUs.href = '/about-us';
  return linkToAboutUs;
}

function addFooterText(root: HTMLElement): HTMLElement {
  enum FooterTextParam {
    elemTag = 'p',
    classNames = 'footer__text',
    innerText = 'Created by three night coders 🌃',
  }
  const footerText = createElement(FooterTextParam, root);
  return footerText;
}

export default function showFooter(root: HTMLElement): void {
  const footer = createElement(FooterParam, root);
  const footerContainer = createElement(FooterContainerParam, footer);
  addFooterLink(footerContainer);
  addFooterText(footerContainer);
}
