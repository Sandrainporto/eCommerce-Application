import showMainPage from '../pages/main/mainView';

const renderPage = (productKey?: string): void => {
  showMainPage(productKey);
};

const addListener = (): void => {
  window.onpopstate = (): void => {
    console.log('сработал popstate');
    renderPage();
  };
  window.addEventListener(
    'click',
    (event) => {
      const target = event.target as HTMLLinkElement;
      if (target.tagName === 'A' || target.closest('A')) {
        event.preventDefault();
        const element = target.closest('A') as HTMLLinkElement;
        window.history.pushState({}, '', element.href);
        renderPage(element.id);
      }
    },
    false,
  );
};

export const routerInit = (): void => {
  renderPage();
  addListener();
};
