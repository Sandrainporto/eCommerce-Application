import './mainPageContent.scss';
import { ContentMainPageContainer, ContentMainPageParam } from '../../types/types';
import { createElement } from '../../utils/elementCreator';
import showCategories from '../Categories/categoriesView';

export default function showContentMainPage(root: HTMLElement): void {
  const content = createElement(ContentMainPageParam, root);
  const contentContainer = createElement(ContentMainPageContainer, content);
  showCategories(contentContainer);
}