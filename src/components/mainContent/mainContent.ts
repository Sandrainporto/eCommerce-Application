import './mainContent.scss';
import { ContentMainPageParam } from '../../types/types';
import { createElement } from '../../utils/elementCreator';
import showCategories from './Categories/categoriesView';
import { showSlider } from './Slider/sliderView';
import showPageInfo from './PageInfo/pageInfoView';

const getPageContent = (root: HTMLElement): void => {
  showSlider(root);
  showPageInfo(root);
  showCategories(root);
};

export default function showMainContent(root: HTMLElement): void {
  let activePage;
  let activePageContent;

  // Временно сделал такую проверку. Навернео в дальнейшем надо будет тут проверять по url какой открыт и в заисимости от этого уже рисовать контент.
  if (root.id === 'main') {
    activePage = ContentMainPageParam;
    activePageContent = getPageContent;
  }

  const pageContent = createElement(activePage, root);
  activePageContent(pageContent);
}
