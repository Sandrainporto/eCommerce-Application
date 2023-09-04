import showMainPage from '../pages/main/mainView';

const renderPage = (path: string, productKey?: string): void => {
  const pathString = path.replace(window.location.origin, '').trim();
  const currentPage = path.split('/').slice(-1).join('');
  window.history.pushState({}, currentPage, `${path}`);
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
      event.preventDefault();
      const target = event.target as HTMLLinkElement;
      if (target.tagName === 'A' || target.closest('A')) {
        const element = target.closest('A') as HTMLLinkElement;
        renderPage(element.href, element.id);
      }
    },
    false,
  );
};

export const routerInit = (): void => {
  addListener();
};
