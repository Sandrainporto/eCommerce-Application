import './burger.scss';
import { BurgerParam } from '../../types/types';
import { createElement } from '../../utils/elementCreator';

export default function showBurger(root: HTMLElement):HTMLElement {
  const burgerIcons = createElement(BurgerParam, root);
  burgerIcons.innerHTML = `<span></span>`;
  return burgerIcons
}
