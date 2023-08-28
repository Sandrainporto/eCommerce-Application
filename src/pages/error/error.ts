import './error.scss';
import showFooter from '../../components/Footer/footerView';
import showHeader from '../../components/Header/headerView';
import {
  MoonImgBlockParam,
  ErrorPageParam,
  WitchImgBlockParam,
  ErrorCodeBlockParam,
  ErrorDescriptionParam,
  ContentPageContainer,
} from './types';
import { createElement } from '../../utils/elementCreator';
import moonImg from '../../assets/errorPageImg/moon.png';
import witchImg from '../../assets/errorPageImg/witch-shadow.png';

export default function showErrorPage(root: HTMLElement): void {
  showHeader(root);
  const errorPage = createElement(ErrorPageParam, root);
  const errorPageContent = createElement(ContentPageContainer, errorPage);

  const moonImageBlock = createElement(MoonImgBlockParam, errorPageContent);
  moonImageBlock.innerHTML = `<img src=${moonImg} alt="moon-image">`;

  const witchImageBlock = createElement(WitchImgBlockParam, errorPageContent);
  witchImageBlock.innerHTML = `<img src=${witchImg} alt="moon-image">`;

  const errorMessageCode = createElement(ErrorCodeBlockParam, errorPageContent);
  errorMessageCode.innerText = '404';

  const errorDescription = createElement(ErrorDescriptionParam, errorPageContent);
  errorDescription.innerHTML = `<p>Oops, the requested URL was not found.</p> 
  <a href="#"><span>Go to main page </span></a> `;

  showFooter(root);
}
