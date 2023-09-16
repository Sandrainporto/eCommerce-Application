export enum ContainerParam {
  elemTag = 'div',
  classNames = 'about-us_container',
}
export enum AboutUsPage {
  elemTag = 'div',
  classNames = 'page__about-us',
}

export enum AboutUsBlock {
  elemTag = 'div',
  classNames = 'about-us__block',
}

export enum BtnParam {
  elemTag = 'div',
  classNames = 'tab-btn',
}
export enum Btns {
  elemTag = 'button',
  classNames = 'tab-btn__button',
}
export enum Content {
  elemTag = 'div',
  classNames = 'tab-btn__content',
}

export enum TabsParam {
  elemTag = 'div',
  classNames = 'tab',
}
export enum TabsBtns {
  elemTag = 'button',
  classNames = 'tabLink',
}

export enum TabsContent {
  elemTag = 'div',
  classNames = 'tabcontent',
}

export enum PersonalContent {
  elemTag = 'div',
  classNames = 'personal__content',
  id = '1',
}

export enum PersonalInfo {
  elemTag = 'div',
  classNames = 'personal__info',
}

export interface CodersTypes {
  id: string;
  name: string;
  photo: string;
  role: string;
  bio: string;
  gitHub: string;
  attribute?: string;
  sprints: {
    sprint1: string;
    sprint2: string;
    sprint3: string;
    sprint4: string;
  };
}

export const CodersInfo:CodersTypes[] = [
  {
    id: '1',
    name: 'Vladislav Klenovski',
    photo: 'https://vladklen.github.io/rsschool-cv/assets/img/profile-img.png',
    role: 'role',
    bio: "Passionate junior front-end developer with a desire to learn and grow in a collaborative team environment. Skilled in HTML, CSS, JavaScript and react. Since 2014 i'am working as a civil engineer.Work in the construction industry taught me how to solve the most unexpected problems. I am able to work in a team and also have skills of leadership and team management.",
    gitHub: 'https://github.com/vladklen',
    attribute: 'defaultOpen',
    sprints: {
      sprint1: '111',
      sprint2: '222',
      sprint3: '333',
      sprint4: '4444',
    },
  },
  {
    id: '2',
    name: 'Alexandra Barmin',
    photo: 'https://avatars.githubusercontent.com/u/90930428?v=4',
    role: 'role',
    bio: 'bio',
    gitHub: 'https://github.com/Sandrainporto',
    sprints: {
      sprint1: '121',
      sprint2: '232',
      sprint3: '343',
      sprint4: '4844',
    },
  },
  {
    id: '3',
    name: 'Artem Hlopov',
    photo: 'https://artemhlopov.github.io/rsschool-cv/assets/img/photo_2022-12-15_22-54-17.jpg',
    role: 'role',
    bio: "I'm tired of my job and I want to change my profession",
    gitHub: 'https://github.com/ArtemHlopov',
    sprints: {
      sprint1: '77',
      sprint2: '2862',
      sprint3: '365',
      sprint4: '9644',
    },
  },
];

export enum ImageBox {
  elemTag = 'div',
  classNames = 'personal__image-box',
}
export enum PersonalImage {
  elemTag = 'img',
  classNames = 'personal__image',
}

export enum InfoContainer {
  elemTag = 'div',
  classNames = 'info-container',
}

export enum PersonalName {
  elemTag = 'h3',
  classNames = 'personal__name',
}
export enum PersonalRole {
  elemTag = 'h4',
  classNames = 'personal__role',
}
export enum PersonalBio {
  elemTag = 'p',
  classNames = 'personal__bio',
}

export enum PersonalLink {
  elemTag = 'a',
  classNames = 'personal__link',
}

export enum PersonalSprints {
  elemTag = 'div',
  classNames = 'personal__sprints',
}

export enum PersonalSprintContribution {
  elemTag = 'p',
  classNames = 'personal__contribution',
}
