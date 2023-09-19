import { createElement } from '../../utils/elementCreator';
import './classesPage.scss';
import {
  ClassesPageParam,
  PageContainer,
  ClassesBanner,
  ClassesInfo,
  ClassesBannerImg,
  ClassesText,
  ClassesTitle,
  ClassesTextAddress,
} from './types';

export function showClassesPage(root: HTMLElement): void {
  const pageContainer = createElement(PageContainer, root);
  const classesPage = createElement(ClassesPageParam, pageContainer);
  const classesBanner = createElement(ClassesBanner, classesPage);
  const classesBannerImg = createElement(ClassesBannerImg, classesBanner);

  const classesInfo = createElement(ClassesInfo, classesPage);
  const classesTitle = createElement(ClassesTitle, classesInfo);
  const classesText = createElement(ClassesText, classesInfo);
  const classesAddress = createElement(ClassesTextAddress, classesInfo);
  classesAddress.innerHTML = `
  <p class="address-text"><span class="span">The first master class time:</span>  On the day of the full moon, the time of the toad.</p>
<p class="address-text"><span class="span">Address:</span>   Old Spreading Oak Tavern in the Tikhomirskoye Forest.</p>`;
}
