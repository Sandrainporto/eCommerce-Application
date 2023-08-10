import './showApplication.scss';
import showMainPage from '../pages/main/mainView';
import { WrapperParam } from '../types/types';
import { createElement } from '../utils/elementCreator';

export default function showApplication(): void {
  const wrapper = createElement(WrapperParam, document.body);
  showMainPage(wrapper);
}
