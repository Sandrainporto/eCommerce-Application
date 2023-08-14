/* eslint-disable no-debugger */
import './showApplication.scss';
import { OpacityParam, WrapperParam } from '../types/types';
import { createElement } from '../utils/elementCreator';
import { Routes } from '../router/routes';

// eslint-disable-next-line max-lines-per-function
export default function showApplication(): void {
  const wrapper = createElement(WrapperParam, document.body);
  let url = '/';
  let activePage = Routes[url];

  const RenderPage = (): void => {
    wrapper.innerHTML = '';
    url = window.location.pathname;
    createElement(OpacityParam, wrapper);
    activePage = Routes[url] || Routes['404'];
    activePage(wrapper);
  };

  const onNavigate = (pathname: string): void => {
    url = `/${pathname}`;
    window.history.pushState({}, pathname, `${window.location.origin}/${pathname}`);
    RenderPage();
  };

  window.onpopstate = (): void => {
    RenderPage();
  };

  window.addEventListener(
    'onhashchange',
    () => {
      console.log('The hash has changed!');
    },
    false,
  );

  RenderPage();

  const links = document.querySelectorAll('a');
  links.forEach((el) => {
    if (el.id) {
      const pathname = el.id;
      if (pathname)
        el.addEventListener('click', (event) => {
          event.preventDefault();
          onNavigate(pathname);
        });
    }
  });
}
