import showMainPage from '../pages/main/mainView';

const renderPage = (productKey?: string): void => {
  const pathString = window.location.href.replace(window.location.origin, '').trim();
  showMainPage(pathString, productKey);
};

const addListener = (): void => {
  window.onpopstate = (): void => {
    renderPage();
  };
  window.addEventListener(
    'click',
    (event) => {
      console.log('Переход по ссылке А');
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
