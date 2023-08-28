import { getCategoriesList } from './../../api/getCatalog';
import './mainContent.scss';
import { ElementParams } from '../../types/types';
import { createElement } from '../../utils/elementCreator';
import { showSlider } from './Slider/sliderView';
import showPageInfo from './PageInfo/pageInfoView';
import { showAuthContent } from '../../pages/login/authContent';
import showCatalogPage from '../../pages/catalog/catalogView';
import { ContentPageContainer } from '../../pages/error/types';

const getPageContent = (root: HTMLElement): void => {
  showSlider(root);
  showPageInfo(root);
  getCategoriesList(root);
};

export default function showMainContent(root: HTMLElement): void {
  let activePage: ElementParams = ContentPageContainer;
  let activePageContent: (root: HTMLElement) => void;
  if (root.id !== 'main') {
    activePageContent = showAuthContent;
  } else {
    activePageContent = getPageContent;
  }
  const pageContent = createElement(activePage, root);
  activePageContent(pageContent);
}
