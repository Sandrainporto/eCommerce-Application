import './showApplication.scss';
import { WrapperParam } from '../types/types';
import { createElement } from '../utils/elementCreator';
import { initRouter } from '../router/routes';

export default function showApplication(): void {
  const wrapper = createElement(WrapperParam, document.body);
  initRouter(wrapper);
}
