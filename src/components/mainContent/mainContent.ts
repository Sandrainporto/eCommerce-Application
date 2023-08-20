import './mainContent.scss';
import { ContentMainPageParam, ElementParams } from '../../types/types';
import { createElement } from '../../utils/elementCreator';
import showCategories from './Categories/categoriesView';
import { showSlider } from './Slider/sliderView';
import showPageInfo from './PageInfo/pageInfoView';
import { showAuthContent } from '../../pages/login/authContent';

const getPageContent = (root: HTMLElement): void => {
  showSlider(root);
  showPageInfo(root);
  showCategories(root);
};

export default function showMainContent(root: HTMLElement): void {
  let activePage: ElementParams;
  let activePageContent: (root: HTMLElement) => void;

  if (root.id !== 'main') {
    activePage = ContentMainPageParam;
    activePageContent = showAuthContent;
  } else {
    activePage = ContentMainPageParam;
    activePageContent = getPageContent;
  }
  const pageContent = createElement(activePage, root);
  activePageContent(pageContent);
}
