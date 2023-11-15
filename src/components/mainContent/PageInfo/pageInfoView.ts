import './pageInfo.scss';
import { createElement } from '../../../utils/elementCreator';
import money from '../../../assets/icons/money.png';
import product from '../../../assets/icons/products.png';
import anonymous from '../../../assets/icons/anonymous.png';

enum InfoBlockParam {
  elemTag = 'div',
  classNames = 'info__container',
}
enum InfoTitleParam {
  elemTag = 'h2',
  classNames = 'info__title',
  innerText = 'Why Choose Us?',
}
enum InfoColumnsParam {
  elemTag = 'div',
  classNames = 'info__columns',
}
enum ColumnsParam {
  elemTag = 'div',
  classNames = 'column',
}
enum ColumnTitleParam {
  elemTag = 'div',
  classNames = 'column__title',
}
enum ColumnIconParam {
  elemTag = 'img',
  classNames = 'column__icon',
}
enum ColumnTextParam {
  elemTag = 'div',
  classNames = 'column__text',
}
export interface ColumnParam {
  title: string;
  icon: string;
  text: string;
}
export const columnData: ColumnParam[] = [
  {
    title: 'Best price guarantee',
    icon: money,
    text: 'We don’t run with a vast administrative set up and an enormous advertising budget; and we pass on the benefit to you in our low prices. You get an amazing product at an ultra low price.',
  },
  {
    title: 'High quality products',
    icon: product,
    text: 'We guarantee the highest quality of all the products we sell. Many years of successful selling and thousands of happy customers make us feel certain about that.',
  },
  {
    title: 'Stay anonymous',
    icon: anonymous,
    text: "We do not share customer's personal information and maintain the complete anonymity of your orders. Optionally, your order can be secretly delivered to the right place at the right time.",
  },
];

export default function showPageInfo(root: HTMLElement): HTMLElement {
  const infoContainer = createElement(InfoBlockParam, root);
  createElement(InfoTitleParam, infoContainer);
  const infoColumns = createElement(InfoColumnsParam, infoContainer);

  columnData.forEach((columInfo) => {
    const column = createElement(ColumnsParam, infoColumns);

    const columnTitle = createElement(ColumnTitleParam, column);
    columnTitle.innerText = columInfo.title;

    const columnIcon = createElement(ColumnIconParam, column) as HTMLImageElement;
    columnIcon.src = columInfo.icon;
    columnIcon.alt = 'column-icon';

    const columnText = createElement(ColumnTextParam, column);
    columnText.innerText = columInfo.text;
  });
  return infoContainer;
}
