import './navigation.scss';
import { createElement } from '../../utils/elementCreator';
import { BreadcrumbBlockParam, BreadcrumbListParam } from './navigationTypes';

export default function showBreadcrumb(root: HTMLElement): HTMLElement {
  const breadcrumbBlock = createElement(BreadcrumbBlockParam, root);

  const breadcrumbList = createElement(BreadcrumbListParam, breadcrumbBlock);

  return breadcrumbBlock;
}
