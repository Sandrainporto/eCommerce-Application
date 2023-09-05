// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Scrollbar } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function initSlider(): void {
  const swiper = new Swiper('.swiper', {
    modules: [Navigation, Scrollbar],

    direction: 'horizontal',
    loop: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
  });
}
