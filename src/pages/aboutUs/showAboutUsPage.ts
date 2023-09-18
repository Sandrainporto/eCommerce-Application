import './aboutUs.scss';
import gitHubIcon from '../../assets/icons/github-icon.svg';
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
  ContainerParam,
  RsSchoolLink,
  RsSchoolImg,
  rsLogoLink,
  rsLink,
} from './types';

function openTab(chosenSprint: string, event?: MouseEvent | undefined): void {
  const tabContent: HTMLElement[] = Array.from(
    document.getElementsByClassName(TabsContent.classNames) as HTMLCollectionOf<HTMLElement>,
  );

  tabContent.forEach((content) => {
    const currentContent = content;
    currentContent.style.display = 'none';
  });

  const tabLinks: HTMLElement[] = Array.from(
    document.getElementsByClassName(TabsBtns.classNames) as HTMLCollectionOf<HTMLElement>,
  );

  tabLinks.forEach((link) => {
    link.className.replace(' active', '');
  });

  (document.getElementById(chosenSprint) as HTMLElement).style.display = 'block';
  if (event) {
    const currentTarget = event.currentTarget as HTMLElement;
    currentTarget.className += ' active';
  }
}

function addPersonalInfo(root: HTMLElement, chosenCoder: CodersTypes | undefined): HTMLElement {
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
      const paragraph = createElement(BioParagraph, personalBio);
      paragraph.innerText = item;
    });
    const personalLink = createElement(PersonalLink, allInfo) as HTMLAnchorElement;
    personalLink.href = gitHub;
    const linkImage = createElement(LinkImg, personalLink) as HTMLImageElement;
    linkImage.src = gitHubIcon;
  }
  return personalInfo;
}

function showPersonalContribution(root: HTMLElement, chosenCoder: CodersTypes | undefined): void {
  const personalSprints = createElement(PersonalSprints, root);
  const tabSprintsContainer = createElement(TabsParam, personalSprints);
  if (chosenCoder) {
    const { sprints } = chosenCoder;

    Object.keys(sprints).forEach((key, index) => {
      const tabLinkSprints = createElement(TabsBtns, tabSprintsContainer);
      tabLinkSprints.innerText = key;
      const tabSprintsContent = createElement(TabsContent, personalSprints);
      tabSprintsContent.id = key;
      sprints[Object.keys(sprints)[index]].forEach((line: string) => {
        const sprintContribution = createElement(PersonalSprintContribution, tabSprintsContent);
        if (!line.includes('●')) {
          sprintContribution.classList.add('colored');
        }
        sprintContribution.innerText = line;
      });

      tabLinkSprints.addEventListener('click', (e: MouseEvent) => {
        const chosenSprint = (e.target as HTMLElement).innerText;
        openTab(chosenSprint, e);
      });
    });
  }
}

function openContent(coderName: string, personalContainer: HTMLElement): void {
  const currentContainer = personalContainer;
  currentContainer.id = coderName;
  document.querySelector(`.${PersonalInfo.classNames}`)?.remove();
  document.querySelector(`.${PersonalSprints.classNames}`)?.remove();

  const chosenCoder: CodersTypes | undefined = CodersInfo.find((coder) => coder.name === personalContainer.id);
  addPersonalInfo(personalContainer, chosenCoder);
  showPersonalContribution(personalContainer, chosenCoder);

  const firstSprint = document.querySelectorAll(`.${TabsBtns.classNames}`)[0];
  firstSprint.setAttribute('defaultState', 'defaultOpen');
  openTab(firstSprint.innerHTML);
}

export function showAboutUsPage(root: HTMLElement): HTMLElement {
  const pageContainer = createElement(ContainerParam, root);
  const page = createElement(AboutUsPage, pageContainer);
  const aboutUs = createElement(AboutUsBlock, page);

  const btnsContainer = createElement(BtnParam, aboutUs);
  const content = createElement(Content, aboutUs);
  const personalContainer = createElement(PersonalContent, content);
  const rsSchoolLink = createElement(RsSchoolLink, content) as HTMLAnchorElement;
  rsSchoolLink.href = rsLink;
  const rsSchoolImage = createElement(RsSchoolImg, rsSchoolLink) as HTMLImageElement;
  rsSchoolImage.src = rsLogoLink;

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
      openContent(coderName, personalContainer);
    });
    return tabLink;
  });

  return page;
}
