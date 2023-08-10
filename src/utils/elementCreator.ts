import { Callback, ElementParams } from '../types/types';

export function createElement(params: ElementParams, root: HTMLElement, callback?: Callback): HTMLElement {
  const element = document.createElement(params.elemTag);

  if (typeof params.classNames === 'string') {
    element.classList.add(params.classNames);
  } else {
    params.classNames?.forEach((name) => {
      element.classList.add(name);
    });
  }

  if (params.id) element.id = params.id;
  if (params.innerText) element.innerText = params.innerText;

  if (params.listenerType === undefined && callback) {
    element.addEventListener('click', callback);
  } else if (params.listenerType && callback) {
    element.addEventListener(params.listenerType, callback);
  }
  if (params.alt && params.src) {
    if (element instanceof HTMLImageElement) {
      element.alt = params.alt;
      element.src = params.src;
    }
  }
  // if (params.href) {
  //   if (element instanceof HTMLLinkElement) {
  //     element.href = params.href;
  //   }
  // }
  if (params.type && params.placeholder && params.value)
    if (element instanceof HTMLInputElement) {
      element.type = params.type;
      element.placeholder = params.placeholder;
      element.value = params.value;
    }
  root.append(element);
  return element;
}
