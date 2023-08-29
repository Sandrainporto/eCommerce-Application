import { WrapperParam } from '../types/types';
import { createElement } from '../utils/elementCreator';
import { initRouter } from '../router/routes';


export default async function showApplication(): Promise<void> {
  const wrapper = createElement(WrapperParam, document.body);
  initRouter(wrapper);
}
