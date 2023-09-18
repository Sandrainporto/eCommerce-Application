import './basket.scss';
import showMainContent from '../../components/mainContent/mainContent';
import { BasketPageParam } from './basketTypes';
import { createElement } from '../../utils/elementCreator';

export function showBasketPage(root: HTMLElement): void {
  const mainPage = createElement(BasketPageParam, root);
  showMainContent(mainPage);
}
