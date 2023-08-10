import './main.scss';
import showFooter from '../../components/Footer/footerView';
import showHeader from '../../components/Header/headerView';
import showContentMainPage from '../../components/mainPageContent/mainPageContent';
import { MainPageParam } from '../../types/types';
import { createElement } from '../../utils/elementCreator';

export default function showMainPage(root: HTMLElement): void {
  const mainPage = createElement(MainPageParam, root);
  showHeader(mainPage);
  showContentMainPage(mainPage);
  showFooter(mainPage);
}
