import './slider.scss';
import { createElement } from '../../../utils/elementCreator';
import { LeftBtn, RightBtn, SlideParamImage, SlideParamLink, Slider, SliderContainer } from './sliderTypes';

function createSlider(root: HTMLElement): HTMLElement {
  const slider = createElement(Slider, root);

  const linkHrefs = ['/classes', '/sale', 'link3'];

  for (let i = 1; i <= linkHrefs.length; i += 1) {
    const sliderLink = createElement(SlideParamLink, slider) as HTMLAnchorElement;
    sliderLink.href = linkHrefs[i - 1];
    const slide = createElement(SlideParamImage, sliderLink) as HTMLImageElement;
    slide.src = `../../assets/slider/banner${i}.png`;
    slide.alt = 'slider-image';
  }

  return slider;
}
function updateSlider(slides: HTMLImageElement[], slideIndex: number): void {
  slides.forEach((slide: HTMLImageElement, index: number) => {
    const theSlide = slide;
    if (index === slideIndex) {
      theSlide.style.display = 'block';
    } else {
      theSlide.style.display = 'none';
    }
  });
}

function animateSlider(
  slider: HTMLElement,
  leftBtn: HTMLElement,
  rightBtn: HTMLElement,
  sliderContainer: HTMLElement,
): void {
  const slides: HTMLImageElement[] = Array.from(slider.querySelectorAll('img'));
  const slideCount: number = slides.length;
  let slideIndex = 0;

  updateSlider(slides, slideIndex);

  function showNextSlide(): void {
    slideIndex = (slideIndex + 1) % slideCount;
    updateSlider(slides, slideIndex);
  }

  let interval = setInterval(showNextSlide, 3000);

  leftBtn.addEventListener('click', () => {
    slideIndex = (slideIndex - 1 + slideCount) % slideCount;
    updateSlider(slides, slideIndex);
  });
  rightBtn.addEventListener('click', showNextSlide);

  sliderContainer.addEventListener('mouseover', () => {
    clearInterval(interval);
  });
  sliderContainer.addEventListener('mouseout', () => {
    interval = setInterval(showNextSlide, 3000);
  });
  updateSlider(slides, slideIndex);
}

export function showSlider(root: HTMLElement): HTMLElement {
  const sliderContainer = createElement(SliderContainer, root);
  const leftBtn = createElement(LeftBtn, sliderContainer);
  const slider = createSlider(sliderContainer);
  const rightBtn = createElement(RightBtn, sliderContainer);
  animateSlider(slider, leftBtn, rightBtn, sliderContainer);
  return sliderContainer;
}
