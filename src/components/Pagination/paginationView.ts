import './pagination.scss';
import { createElement } from '../../utils/elementCreator';
import {
  FirstPageButton,
  IButtons,
  LastPageButton,
  NextPageButton,
  PageNumber,
  PaginationBlock,
  PaginationButtons,
  PrevPageButton,
} from './paginationTypes';

let activePage = 1;
let lastPage = 1;
let callBack: (arg0: number) => void;
let paginationContainer: HTMLElement;
const BUTTONS: IButtons = {};

const checkButtons = (): void => {
  if (BUTTONS.firstPage && BUTTONS.prevPage) {
    if (activePage === 1) {
      BUTTONS.firstPage.disabled = true;
      BUTTONS.prevPage.disabled = true;
    } else {
      BUTTONS.firstPage.disabled = false;
      BUTTONS.prevPage.disabled = false;
    }
  }
  if (BUTTONS.lastPage && BUTTONS.nextPage) {
    if (activePage === lastPage) {
      BUTTONS.lastPage.disabled = true;
      BUTTONS.nextPage.disabled = true;
    } else {
      BUTTONS.lastPage.disabled = false;
      BUTTONS.nextPage.disabled = false;
    }
  }
};

const updatePage = (): void => {
  if (BUTTONS.pageNumber) BUTTONS.pageNumber.innerText = activePage.toString();
  callBack(activePage);
  checkButtons();
};

const selectNextPage = (): void => {
  activePage += 1;
  updatePage();
};

const selectPrevPage = (): void => {
  activePage -= 1;
  updatePage();
};

const selectFirstPage = (): void => {
  activePage = 1;
  updatePage();
};

const selectLastPage = (): void => {
  activePage = lastPage;
  updatePage();
};

const createButtons = (root: HTMLElement): void => {
  const paginationButtons = createElement(PaginationButtons, root);
  BUTTONS.firstPage = createElement(FirstPageButton, paginationButtons, selectFirstPage) as HTMLButtonElement;
  BUTTONS.prevPage = createElement(PrevPageButton, paginationButtons, selectPrevPage) as HTMLButtonElement;
  BUTTONS.pageNumber = createElement(PageNumber, paginationButtons);
  BUTTONS.pageNumber.innerText = activePage.toString();
  BUTTONS.nextPage = createElement(NextPageButton, paginationButtons, selectNextPage) as HTMLButtonElement;
  BUTTONS.lastPage = createElement(LastPageButton, paginationButtons, selectLastPage) as HTMLButtonElement;
  checkButtons();
};

export const changePagesAmount = (value: number): void => {
  lastPage = value;
  checkButtons();
};

export const paginationInit = (
  root: HTMLElement,
  changePageCallBack: { (page: number): void; (arg0: number): void },
  totalPages: number,
): void => {
  lastPage = totalPages;
  paginationContainer = createElement(PaginationBlock, root);
  callBack = changePageCallBack;
  createButtons(paginationContainer);
};
