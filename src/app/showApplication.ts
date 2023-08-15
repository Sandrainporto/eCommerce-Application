/* eslint-disable no-debugger */
import './showApplication.scss';
import { OpacityParam, WrapperParam } from '../types/types';
import { createElement } from '../utils/elementCreator';
import { Routes } from '../router/routes';

// eslint-disable-next-line max-lines-per-function
export default function showApplication(): void {
  const wrapper = createElement(WrapperParam, document.body);
  const background = createElement(OpacityParam, wrapper);
  let url = '/';
  let activePage = Routes[url];

  const RenderPage = (): void => {
    wrapper.innerHTML = '';
    wrapper.prepend(background);
    url = window.location.pathname;
    activePage = Routes[url] || Routes['404'];
    activePage(wrapper);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    addEventListener();
  };

  const onNavigate = (pathname: string): void => {
    window.history.pushState({}, pathname, `${window.location.origin}/${pathname}`);
    RenderPage();
  };

  const addEventListener = (): void => {
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
  };

  window.onpopstate = (): void => {
    RenderPage();
  };

  RenderPage();
}
