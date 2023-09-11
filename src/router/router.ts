import showMainPage from '../pages/main/mainView';

const renderPage = (path: string, productKey?: string): void => {
  const pathString = path.replace(window.location.origin, '').trim();
  showMainPage(pathString, productKey);
};

const addListener = (): void => {
  window.onpopstate = (): void => {
    const path = window.location.href;
    renderPage(path);
  };
  window.addEventListener(
    'click',
    (event) => {
      const target = event.target as HTMLLinkElement;
      if (target.tagName === 'A' || target.closest('A')) {
        event.preventDefault();
        const element = target.closest('A') as HTMLLinkElement;
        window.history.pushState({}, '', target.href);
        renderPage(window.location.href, element.id);
      }
    },
    false,
  );
};

export const routerInit = (): void => {
  const path = window.location.href;
  renderPage(path);
  addListener();
};
