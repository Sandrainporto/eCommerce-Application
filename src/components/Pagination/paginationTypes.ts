export enum PaginationBlock {
  elemTag = 'div',
  classNames = 'pagination__panel',
}

export enum PaginationButtons {
  elemTag = 'div',
  classNames = 'panel__buttons',
}

export enum PageNumber {
  elemTag = 'div',
  classNames = 'button__number',
}

export enum NextPageButton {
  elemTag = 'button',
  classNames = 'button__next',
  id = '',
  innerText = '>',
  listenerType = 'click',
}

export enum PrevPageButton {
  elemTag = 'button',
  classNames = 'button__prev',
  id = '',
  innerText = '<',
  listenerType = 'click',
}

export enum LastPageButton {
  elemTag = 'button',
  classNames = 'button__last',
  id = '',
  innerText = '>>',
  listenerType = 'click',
}

export enum FirstPageButton {
  elemTag = 'button',
  classNames = 'button__first',
  id = '',
  innerText = '<<',
  listenerType = 'click',
}

export interface IButtons {
  pageNumber?: HTMLElement;
  firstPage?: HTMLButtonElement;
  prevPage?: HTMLButtonElement;
  lastPage?: HTMLButtonElement;
  nextPage?: HTMLButtonElement;
}
