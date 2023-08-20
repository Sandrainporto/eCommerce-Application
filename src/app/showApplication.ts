import showMainPage from '../pages/main/mainView';
import { OpacityParam, WrapperParam } from '../types/types';
import { createElement } from '../utils/elementCreator';

export default function showApplication(): void {
  const wrapper = createElement(WrapperParam, document.body);
  createElement(OpacityParam, wrapper);
  showMainPage(wrapper);
}
