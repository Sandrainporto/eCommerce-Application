import './logo.scss';
import { createElement } from '../../utils/elementCreator';

enum LogoContainerParam {
  elemTag = 'div',
  classNames = 'header__logo',
}
enum LogoLinkParam {
  elemTag = 'a',
  classNames = 'logo__link',
  href = `/`,
}
enum Logo {
  elemTag = 'img',
  classNames = 'logo',
  src = './../assets/logo.png',
  alt = 'logo',
}

export default function showLogo(root: HTMLElement): HTMLElement {
  const logoContainer = createElement(LogoContainerParam, root);
  const logoLink = createElement(LogoLinkParam, logoContainer) as HTMLLinkElement;
  logoLink.href = LogoLinkParam.href;
  createElement(Logo, logoLink);
  return logoContainer;
}
