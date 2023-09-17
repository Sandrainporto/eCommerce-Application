import './aboutUs.scss';
import gitHubIcon from './../../assets/icons/github-icon.svg';
import { createElement } from '../../utils/elementCreator';
import {
  AboutUsBlock,
  AboutUsPage,
  CodersInfo,
  ImageBox,
  InfoContainer,
  PersonalBio,
  PersonalContent,
  PersonalImage,
  PersonalInfo,
  PersonalLink,
  PersonalName,
  PersonalRole,
  PersonalSprintContribution,
  PersonalSprints,
  TabsBtns,
  TabsContent,
  TabsParam,
  CodersTypes,
  BtnParam,
  Content,
  Btns,
  BioParagraph,
  LinkImg,
} from './types';

function openTab(chosenSprint: string, event?): void {
  const tabContent: HTMLElement[] = Array.from(
    document.getElementsByClassName(TabsContent.classNames) as HTMLCollectionOf<HTMLElement>,
  );

  tabContent.forEach((content) => {
    content.style.display = 'none';
  });

  const tabLinks: HTMLElement[] = Array.from(
    document.getElementsByClassName(TabsBtns.classNames) as HTMLCollectionOf<HTMLElement>,
  );

  tabLinks.forEach((link) => {
    link.className.replace(' active', '');
  });

  (document.getElementById(chosenSprint) as HTMLElement).style.display = 'block';
  if (event) {
    event.currentTarget.className += ' active';
  }
}
function addPersonalInfo(root, chosenCoder): HTMLElement {
  const personalInfo = createElement(PersonalInfo, root);
  if (chosenCoder) {
    const { name, photo, role, bio, gitHub } = chosenCoder;

    const imageContainer = createElement(ImageBox, personalInfo);
    const personalImage = createElement(PersonalImage, imageContainer) as HTMLImageElement;
    personalImage.src = photo;
    personalImage.alt = `${name}-image`;

    const allInfo = createElement(InfoContainer, personalInfo);

    const personalName = createElement(PersonalName, allInfo);
    personalName.innerText = name;
    const personalRole = createElement(PersonalRole, allInfo);
    personalRole.innerText = role;
    const personalBio = createElement(PersonalBio, allInfo);
    
  bio.forEach((item) => {
      console.log(item)
      const paragraph = createElement(BioParagraph, personalBio);
      paragraph.innerText = item
    });
    const personalLink = createElement(PersonalLink, allInfo) as HTMLAnchorElement;
    personalLink.href =  gitHub;
    const linkImage = createElement(LinkImg, personalLink)as HTMLImageElement;
    linkImage.src =gitHubIcon ;
  }
  return personalInfo;
}
function showPersonalContribution(root: HTMLElement, chosenCoder: CodersTypes | undefined) {
  const personalSprints = createElement(PersonalSprints, root);
  const tabSprintsContainer = createElement(TabsParam, personalSprints);
  console.log(chosenCoder);
  if (chosenCoder) {
    const { sprints } = chosenCoder;

    Object.keys(sprints).forEach((key, index) => {
      const tabLinkSprints = createElement(TabsBtns, tabSprintsContainer);
      tabLinkSprints.innerText = key;
      const tabSprintsContent = createElement(TabsContent, personalSprints);
      tabSprintsContent.id = key;
      console.log(sprints[Object.keys(sprints)[index]])
      sprints[Object.keys(sprints)[index]].forEach(line=>{
        const sprintContribution = createElement(PersonalSprintContribution, tabSprintsContent);
        if(!line.includes('●')){
          console.log(line)
          sprintContribution.classList.add('colored')

        }
        sprintContribution.innerText = line;

      })

      tabLinkSprints.addEventListener('click', (e: MouseEvent) => {
        const chosenSprint = (e.target as HTMLElement).innerText;
        console.log(chosenSprint);
        openTab(chosenSprint, e);
      });
    });
  }
}
function openContent(coderName: string, personalContainer: HTMLElement, event?): void {
  console.log(coderName);
  personalContainer.id = coderName;
  const previousInfo = document.querySelector(`.${PersonalInfo.classNames}`)?.remove();
  const previousSprints = document.querySelector(`.${PersonalSprints.classNames}`)?.remove();

  const chosenCoder: CodersTypes | undefined = CodersInfo.find((coder) => coder.name === personalContainer.id);
  addPersonalInfo(personalContainer, chosenCoder);
  showPersonalContribution(personalContainer, chosenCoder);

  const firstSprint = document.querySelectorAll(`.${TabsBtns.classNames}`)[0];
  firstSprint.setAttribute('defaultState', 'defaultOpen');
  openTab(firstSprint.innerHTML);
}

export function showAboutUsPage(root: HTMLElement): HTMLElement {
  const page = createElement(AboutUsPage, root);
  const aboutUs = createElement(AboutUsBlock, page);
  const btnsContainer = createElement(BtnParam, aboutUs);
  const content = createElement(Content, aboutUs);
  const personalContainer = createElement(PersonalContent, content);

  CodersInfo.map(({ name, attribute }) => {
    const tabLink = createElement(Btns, btnsContainer);
    tabLink.innerText = name;
    tabLink.id = `${name}`;
    if (attribute) {
      tabLink.setAttribute('defaultState', attribute);
      openContent(tabLink.innerText, personalContainer);
    }

    tabLink.addEventListener('click', (e: MouseEvent) => {
      const coderName = (e.target as HTMLElement).innerText;
      openContent(coderName, personalContainer, e);
    });
  });

  return page;
}
