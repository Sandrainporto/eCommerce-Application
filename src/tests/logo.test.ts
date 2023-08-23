import showLogo from './../components/Logo/logoView';

describe('showLogo', () => {
  it('should add logo container, logo link, and logo image to the root element', () => {
    const rootElement = document.createElement('div');
    let logoContainer = showLogo(rootElement);

    expect(rootElement.children.length).toBe(1);

    logoContainer = rootElement.children[0] as HTMLElement;
    expect(logoContainer.tagName).toBe('DIV');
    expect(logoContainer.className).toBe('header__logo');

    const logoLink = logoContainer.children[0] as HTMLAnchorElement;
    expect(logoLink.tagName).toBe('A');
    expect(logoLink.className).toBe('logo__link');
    expect(logoLink.href).toBe('http://localhost/');

    const logoImage = logoLink.children[0] as HTMLImageElement;
    expect(logoImage.tagName).toBe('IMG');
    expect(logoImage.className).toBe('logo');
    expect(logoImage.src).toBe('http://localhost/assets/logo.png');
    expect(logoImage.alt).toBe('logo');
  });
});
