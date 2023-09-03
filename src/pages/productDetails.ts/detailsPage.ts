import { createElement } from '../../utils/elementCreator';
import { DetailsParam } from './types';

export default async function showDetailsPage(root: HTMLElement, key: string) {
  const productsPage = createElement(DetailsParam, root);
  productsPage.innerHTML = `${key}`;
}
