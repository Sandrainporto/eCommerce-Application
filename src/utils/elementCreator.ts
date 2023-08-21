import { Callback, ElementParams } from '../types/types';

function chooseElementToCreate(params: ElementParams): HTMLElement {
  let element = document.createElement(params.elemTag);

  switch (params.elemTag) {
    case 'input':
      if (params.placeholder) {
        (element as HTMLInputElement).placeholder = params.placeholder;
      }
      if (params.type) {
        (element as HTMLInputElement).type = params.type;
      }
      if (params.value) {
        (element as HTMLInputElement).value = params.value;
      }
      break;
    case 'label':
      if (params.for) {
        (element as HTMLOptionElement).setAttribute('for', params.for);
      }

      break;
    case 'option':
      if (params.value) {
        (element as HTMLOptionElement).value = params.value;
      }

      break;
    case 'img':
      if (params.alt && params.src) {
        (element as HTMLImageElement).src = params.src;
        (element as HTMLImageElement).alt = params.alt;
      }
      break;
    case 'a':
      if (params.href) {
        (element as HTMLAnchorElement).href = params.href;
      }
      break;
    default:
      element = document.createElement(params.elemTag);
      break;
  }
  return element;
}

export function createElement(params: ElementParams, root: HTMLElement, callback?: Callback): HTMLElement {
  const element = chooseElementToCreate(params);

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

  root.appendChild(element);
  return element;
}
