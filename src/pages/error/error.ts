import './error.scss';
import showFooter from '../../components/Footer/footerView';
import showHeader from '../../components/Header/headerView';
import { MainPageParam } from '../../types/types';
import { createElement } from '../../utils/elementCreator';

export default function showErrorPage(root: HTMLElement): void {
  showHeader(root);
  const errorPage = createElement(MainPageParam, root);
  errorPage.innerHTML = '404 Page not found';
  showFooter(root);
}
