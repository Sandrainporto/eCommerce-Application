import showMainPage from '../pages/main/mainView';

let url: URL;

const renderPage = (productKey?: string): void => {
  showMainPage(productKey);
};

const addListener = (): void => {
  window.onpopstate = (): void => {
    renderPage();
  };
  window.addEventListener(
    'click',
    (event) => {
      const target = event.target as HTMLLinkElement;
      if (target.tagName === 'A' || target.closest('A')) {
        event.preventDefault();
        const element = target.closest('A') as HTMLLinkElement;
        if (element.href) {
          const newUrl = new URL(element.href);
          if (newUrl.hostname === url.hostname) {
            window.history.replaceState({}, '', element.href);
            renderPage(element.id);
          } else {
            window.open(`${element.href}`, '_blank');
          }
        }
      }
    },
    false,
  );
};

export const routerInit = (): void => {
  url = new URL(window.location.href);
  renderPage();
  addListener();
};
