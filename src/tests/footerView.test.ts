import showFooter from '../components/Footer/footerView';

describe('showFooter', () => {
  it('should add footer link and footer text to the root element', () => {
    const rootElement = document.createElement('div');
    showFooter(rootElement);

    expect(rootElement.children.length).toBe(1);
    const footer = rootElement.children[0];
    expect(footer.tagName).toBe('FOOTER');

    const footerContainer = footer.children[0];
    expect(footerContainer.className).toBe('footer__container');

    const footerLink = footerContainer.children[0] as HTMLAnchorElement;
    expect(footerLink.tagName).toBe('A');
    expect(footerLink.className).toBe('footer__link');
    expect(footerLink.innerText).toBe('About Us');
    expect(footerLink.href).toBe('http://localhost/#');

    const footerText = footerContainer.children[1] as HTMLAnchorElement;
    expect(footerText.tagName).toBe('P');
    expect(footerText.className).toBe('footer__text');
  });
});
