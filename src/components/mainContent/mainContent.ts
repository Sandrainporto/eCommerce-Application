import { Category } from '@commercetools/platform-sdk';
import './mainContent.scss';
import { ElementParams } from '../../types/types';
import { createElement } from '../../utils/elementCreator';
import { showSlider } from './Slider/sliderView';
import showPageInfo from './PageInfo/pageInfoView';
import { showAuthContent } from '../../pages/login/authContent';
import { ContentPageContainer } from '../../pages/error/types';
import createCategoriesCard from '../Categories/categoryCard';
import showProductsPage from '../../pages/products/productViewPage';
import showDetailsPage from '../../pages/productDetails.ts/detailsPage';

let categoryData: void | Category[];

const getPageContent = async (root: HTMLElement): Promise<void> => {
  showDetailsPage(root, 'clone')
  // showProductsPage(root, '1a646b6c-dbe6-401f-ab7d-ddcdae8a3bc6')
  // showSlider(root);
  // createCategoriesCard(root, categoryData);
  // showPageInfo(root);
};

export default function showMainContent(root: HTMLElement, data: void | Category[]): void {
  categoryData = data;
  const activePage: ElementParams = ContentPageContainer;
  let activePageContent: (root: HTMLElement) => void;
  if (root.id !== 'main') {
    activePageContent = showAuthContent;
  } else {
    activePageContent = getPageContent;
  }
  const pageContent = createElement(activePage, root);
  activePageContent(pageContent);
}
