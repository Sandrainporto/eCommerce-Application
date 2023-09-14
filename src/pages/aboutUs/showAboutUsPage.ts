import { createElement } from '../../utils/elementCreator';
import './aboutUs.scss';
import {
  AboutUsBlock,
  AboutUsPage,
  CODERS,
  CodersInfo,
  ImageBox,
  InfoContainer,
  PersonalContent,
  PersonalImage,
  PersonalInfo,
  PersonalName,
  PersonalSprints,
  TabsBtns,
  TabsContent,
  TabsParam,
} from './types';

function openContent(coderName: string, event?):void {
  let tabContent: HTMLElement[] = Array.from(
    document.getElementsByClassName(TabsContent.classNames) as HTMLCollectionOf<HTMLElement>,
  );

  tabContent.forEach((content) => {
    content.style.display = 'none';
  });

  let tabLinks: HTMLElement[] = Array.from(
    document.getElementsByClassName(TabsBtns.classNames) as HTMLCollectionOf<HTMLElement>,
  );

  tabLinks.forEach((link) => {
    link.className.replace(' active', '');
  });

  (document.getElementById(coderName) as HTMLElement).style.display = 'block';
  if(event){
  event.currentTarget.className += ' active';
  }
}

export function showAboutUsPage(root: HTMLElement): HTMLElement {
  const page = createElement(AboutUsPage, root);
  const aboutUs = createElement(AboutUsBlock, page);
  const tabContainer = createElement(TabsParam, aboutUs);
  CodersInfo.map(({name, photo, id}) => {
    const tabLink = createElement(TabsBtns, tabContainer);
    tabLink.innerText = name;


    const tabContent = createElement(TabsContent, aboutUs);
    tabContent.id = name;
    if(id){
      tabLink.id = id;
      openContent(tabContent.id)
    }


    const personalContainer = createElement(PersonalContent, tabContent);
    const personalInfo = createElement(PersonalInfo, personalContainer);

    const imageContainer = createElement(ImageBox, personalInfo);
    const personalImage = createElement(PersonalImage, imageContainer)as HTMLImageElement;
      personalImage.src = photo;
      personalImage.alt = `${name}-image`

const allInfo= createElement(InfoContainer, personalInfo)

    const personalName = createElement(PersonalName, allInfo);
    personalName.innerText = name;

    const personalSprints = createElement(PersonalSprints, personalContainer);

    tabLink.addEventListener('click', (e: MouseEvent) => {
      const coderName = (e.target as HTMLElement).innerText;
      openContent(coderName, e);
    });
  });

  return page;
}

// .addEventListener("click", function (event) { event.currentTarget.className += " active"; });
