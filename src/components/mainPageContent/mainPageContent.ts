import './mainPageContent.scss';
import { ContentMainPageParam } from '../../types/types';
import { createElement } from '../../utils/elementCreator';

export default function showContentMainPage(root: HTMLElement): void {
  const content = createElement(ContentMainPageParam, root);
}
