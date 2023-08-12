import './burger.scss';
import { BurgerParam } from '../../types/types';
import { createElement } from '../../utils/elementCreator';
import burgerImage from '../../assets/burger-icon.png';

function animateBurger(burgerIcon, navigation, navList): void {
  const opacity = document.querySelector('.opacity');
  burgerIcon.addEventListener('click', () => {
    navigation.classList.toggle('active');
    opacity?.classList.toggle('active');
    document.body.classList.toggle('_lock');
  });

  opacity?.addEventListener('click', () => {
    navigation.classList.remove('active');
    opacity.classList.remove('active');
    document.body.classList.remove('_lock');
  });

  navList.addEventListener('click', (e: MouseEvent) => {
    const target: HTMLAnchorElement | null = e.target instanceof HTMLAnchorElement ? e.target : null;
    if (target) {
      navigation.classList.remove('active');
      opacity?.classList.remove('active');
      document.body.classList.remove('_lock');
    }
  });
}

export default function showBurger(root: HTMLElement, navigation: HTMLElement, navlist: HTMLElement): HTMLElement {
  const burgerIcon = createElement(BurgerParam, root);
  burgerIcon.innerHTML = `<img src=${burgerImage} alt="burger-icon">
  `;
  animateBurger(burgerIcon, navigation, navlist);
  root.before(burgerIcon);
  return burgerIcon;
}
