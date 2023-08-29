import { Category } from '@commercetools/platform-sdk';
import './main.scss';
import showMainContent from '../../components/mainContent/mainContent';

export default function showMainPage(root: HTMLElement, data: void | Category[]): void {
  console.log(data);
  showMainContent(root, data);
}
