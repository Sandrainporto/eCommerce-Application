import './swiper.scss';
import { createElement } from '../../utils/elementCreator';
import {
  SwiperBtnNext,
  SwiperBtnPrev,
  SwiperContainer,
  SwiperImage,
  SwiperPagination,
  SwiperScroll,
  SwiperSlide,
  SwiperSlideContainer,
  SwiperWrapper,
} from './types';

export function addSwiper(root, allImages: string[]): HTMLElement {
  const swiper = createElement(SwiperContainer, root);
  const swiperWrapper = createElement(SwiperWrapper, swiper);

  allImages.forEach((image) => {
    const swiperSlide = createElement(SwiperSlide, swiperWrapper);
    const swiperSlideContainer = createElement(SwiperSlideContainer, swiperSlide);
    const swiperImage = createElement(SwiperImage, swiperSlideContainer) as HTMLImageElement;
    swiperImage.src = image;
  });

 createElement(SwiperPagination, swiper);
createElement(SwiperBtnPrev, swiper);
createElement(SwiperBtnNext, swiper);
createElement(SwiperScroll, swiper);
  return swiper;
}
