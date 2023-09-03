import './breadcrumbs.scss';
import { createElement } from '../../utils/elementCreator';
import { BreadcrumLinkParam, BreadcrumbBlockParam, BreadcrumbListParam } from './navigationTypes';

interface BreadcrumParams {
  path: string;
  name: string;
}

export default function showBreadcrumb(root: HTMLElement): void {
  const breadcrumbBlock = createElement(BreadcrumbBlockParam, root);
  const breadcrumbList = createElement(BreadcrumbListParam, breadcrumbBlock);

  const titleizeWord = (str: string): string => `${str[0].toUpperCase()}${str.slice(1)}`;
  const kebabToTitle = (str: string): string => str.split('-').map(titleizeWord).join(' ');

  const splitToBreadcrumbs = (
    pathname: string,
    { rootName = 'Home', nameTransform = (s: string): string => s } = {},
  ): BreadcrumParams[] => {
    let paths: string[];
    if (pathname.includes('-card')) {
      paths = pathname.replace('-card', '').split('/').filter(Boolean);
    } else paths = pathname.split('/').filter(Boolean);

    const breadcrumbs: BreadcrumParams[] = paths.map((path, index) => {
      const pathSegments = paths.slice(0, index + 1);
      return {
        path: `/${pathSegments.join('/')}`,
        name: nameTransform(path),
      };
    });

    breadcrumbs.unshift({ path: '/', name: rootName });
    return breadcrumbs;
  };

  const currentUrl: string = window.location.href;
  const { pathname } = new URL(currentUrl);
  const breadcrumbs = splitToBreadcrumbs(pathname, { nameTransform: kebabToTitle });

  breadcrumbs.map(({ path, name }): HTMLElement => {
    const breadcrumb = createElement(BreadcrumLinkParam, breadcrumbList);
    if (breadcrumb instanceof HTMLAnchorElement) {
      breadcrumb.innerText = `${name}`;
      breadcrumb.href = `${path}`;
    }
    return breadcrumb;
  });
}
