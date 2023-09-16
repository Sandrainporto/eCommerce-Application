import { Category } from '@commercetools/platform-sdk';
import './mainContent.scss';
import { showSlider } from './Slider/sliderView';
import createCategoriesCard from '../Categories/categoryCard';
import showPageInfo from './PageInfo/pageInfoView';
import { ElementParams } from '../../types/types';
import { createElement } from '../../utils/elementCreator';
import { showAuthContent } from '../../pages/login/authContent';
import { ContentPageContainer } from '../../pages/error/types';
import { showProfileContent } from '../../pages/profile/profileContent';
import { showBasketContent } from '../../pages/basket/basketContent';

let categoryData: void | Category[];

const getPageContent = async (root: HTMLElement): Promise<void> => {
  showSlider(root);
  showPageInfo(root);
  createCategoriesCard(root, categoryData);
};

export default function showMainContent(root: HTMLElement, data: void | Category[]): void {
  categoryData = data;
  const activePage: ElementParams = ContentPageContainer;
  let activePageContent: (root: HTMLElement) => void;
  console.log(root.id);
  if (root.id === 'main') {
    activePageContent = getPageContent;
  } else if (root.id === 'prof') {
    activePageContent = showProfileContent;
  } else if (root.id === 'cart') {
    activePageContent = showBasketContent;
  } else {
    activePageContent = showAuthContent;
  }
  const pageContent = createElement(activePage, root);
  activePageContent(pageContent);
}
