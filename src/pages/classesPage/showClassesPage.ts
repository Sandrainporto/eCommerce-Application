import { createElement } from '../../utils/elementCreator';
import './classesPage.scss';
import { ClassesPageParam } from './types';

export function showClassesPage(root: HTMLElement):void {
  const classesPage = createElement(ClassesPageParam, root);
}
