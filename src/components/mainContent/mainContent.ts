import './mainContent.scss';
import { ContentMainPageContainer, ContentMainPageParam } from '../../types/types';
import { createElement } from '../../utils/elementCreator';
import showCategories from '../Categories/categoriesView';
import { showSlider } from '../Slider/sliderView';

const getPageContent = (root: HTMLElement): void => {
  showSlider(root);
  showCategories(root);
};

export default function showMainContent(root: HTMLElement): void {
  let activePage;
  let activePageContainer;
  let activePageContent;

  // Временно сделал такую проверку. Навернео в дальнейшем надо будет тут проверять по url какой открыт и в заисимости от этого уже рисовать контент.
  if (root.id === 'main') {
    activePage = ContentMainPageParam;
    activePageContainer = ContentMainPageContainer;
    activePageContent = getPageContent;
  }

  const content = createElement(activePage, root);
  const contentContainer = createElement(activePageContainer, content);
  activePageContent(contentContainer);
}
