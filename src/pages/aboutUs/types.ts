export enum ContainerParam {
  elemTag = 'div',
  classNames = 'about-us__container',
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
  classNames = 'tab-link',
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
  name: string;
  photo: string;
  role: string;
  bio: string[];
  gitHub: string;
  attribute?: string;
  sprints: {
    Sprint1: string[];
    Sprint2: string[];
    Sprint3: string[];
    Sprint4: string[];
  };
}

export const CodersInfo: CodersTypes[] = [
  {
    name: 'Vladislav Klenovski',
    photo: 'https://vladklen.github.io/rsschool-cv/assets/img/profile-img.png',
    role: 'Team Lead',
    bio: [
      'Passionate junior front-end developer with a desire to learn and grow in a collaborative team environment. Skilled in HTML, CSS, JavaScript and react.',
      'Since 2014 i am working as a civil engineer.Work in the construction industry taught me how to solve the most unexpected problems.',
      'I am able to work in a team and also have skills of leadership and team management.',
    ],
    gitHub: 'https://github.com/vladklen',
    attribute: 'defaultOpen',
    sprints: {
      Sprint1: [
        'Development of Environment Configuration',
        '● adding Webpack, Typescript, ESlint,Prettier, Jest, Husky to the project and the necessary dependencies',
        'Development of Scripts',
        '● writing necessary scripts',
      ],
      Sprint2: [
        'Routing Implementation',
        '● implementation of routing for navigation between login, registration, main and 404 pages',
        'Registration Page Implementation',
        '● Finalization of client-side validation for all required fields in the registration form',
      ],
      Sprint3: [
        'Routing Implementation',
        '● implementation of routing for navigation between Catalog page, Product detail page, User Profile page and the other pages',
        'Catalog Page Implementation',
        '● creation of Product Filtering, Sorting, and Searching fields',
        'Code refactoring, bug fixing',
      ],
      Sprint4: [
        'Routing Implementation',
        '● implementation of routing for navigation to theBasket Page, About Us page and the other pages',
        'Catalog Page Enhancements',
        '● implementation and creation of the pagination',
        'Bug Fixing',
      ],
    },
  },
  {
    name: 'Alexandra Barmin',
    photo: 'https://media.githubusercontent.com/avatars/32935565?orig=1&token=AVVXZ7A2CK2SY3KIX2GO5TLFA6DRQ',
    role: 'Designer, ideological inspirer',
    bio: [
      'Very interested in creation of uniq and stylish apps and webpages that are beautiful outside and intelligent under the hood.',
      'My current goal and interest is: to focus on TS + React + Redux more deeply, probably to learn UI/Ux design in the future to stronger my work results and to make them look more interesting.',
    ],
    gitHub: 'https://github.com/Sandrainporto',
    sprints: {
      Sprint1: [
        'Repository Setup',
        '● creation of private repo with `main` and `develop` branches',
        '● add gitignore, pull_request_template files',
        '● add initial folder structure',
        'Task Board Setup',
        '● creation and making changes through the project period',
        'Comprehensive README',
      ],
      Sprint2: [
        'Main Page Creation',
        '● creation of centralise navigation, slider, columns, adding main categories',
        '404 Page Creation',
        '● creation of animation for the 404 page',
        'Evaluation Criteria for Header',
        '● adding show/hide functionality for log in/ log out / registration buttons',
        'Registration Page Implementation',
        '● adding date of birth, address and billing address fields',
        'Writing of unit tests',
      ],
      Sprint3: [
        'Catalog Page Implementation',
        '● creation of the products in the commercetools',
        '● displaying interactive products card list according to the commercetools data',
        '● creation of the category navigation (subcategories menu, breadcrumbs )',
        'Detailed Product Page Implementation',
        '● displaying interactive product card eith the necessary data and fields according to the commercetools data',
        '● adding image slider to each card',
        'Evaluation Criteria for Header',
      ],
      Sprint4: [
        'About Us Page Implementation',
        '● creation of the About Us page with the provided by team members information',
        'Catalog Page Enhancements',
        '● adding and fixing code lines according the requirements',
        'Detailed Product Page Implementation',
        '● displaying interactive "Add to Cart" button that changes it\'s view according to the product position in the cart',
        'Evaluation Criteria for Header ',
      ],
    },
  },
  {
    name: 'Artem Hlopov',
    photo: 'https://artemhlopov.github.io/rsschool-cv/assets/img/photo_2022-12-15_22-54-17.jpg',
    role: 'Backend communicater',
    bio: [
      "I'm tired of my job and I want to change my profession.",
      'Graduated from Belarusian National Technical University.',
      'Finished cources: Development of web applications with JavaScript, IT-academy; Website development using HTML, CSS and JavaScript, IT-academy',
    ],
    gitHub: 'https://github.com/ArtemHlopov',
    sprints: {
      Sprint1: [
        'CommerceTools Project and API Client Setup',
        '● creation of the project in CommerceTools, setting up the currencies, languages, and other configurations in the Merchant Center',
        "● creation of the API client for CommerceTools, enabling access to the platform's APIs and managing permissions and scopes required for the project.",
      ],
      Sprint2: [
        'Login Page Implementation',
        '● creation of login page with a client-side validation',
        '●  integration of the form with an authentication service',
        '● obtaining of the authentication token securely after a successful login attempt',
        'Registration Page Implementation',
        '● creation of the registration page with a client-side validation',
        '●  integration of the form with an authentication service',
        '● redirection of users upon successful account creation and automatic login. ',
      ],
      Sprint3: [
        'User Profile Page Implementation',
        '● creation of the User Profile Page with nessesary fields',
        '● adding ability to change user profile information',
      ],
      Sprint4: [
        'Basket Page Implementation',
        '● creation of the Basket Page with nessesary fields',
        'Catalog Page Enhancements',
        '● displaying items',
        '● modify product quantity',
        '● adding, removing products',
        '● calculation of hte total cost',
        '● ability to clear the shopping cart',
        '● ability to apply promocode',
      ],
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
  elemTag = 'div',
  classNames = 'personal__bio',
}
export enum BioParagraph {
  elemTag = 'p',
  classNames = 'bio__paragrahp',
}

export enum PersonalLink {
  elemTag = 'a',
  classNames = 'personal__link',
}
export enum LinkImg {
  elemTag = 'img',
  classNames = 'personal__link_img',
  alt ='github-logo'

}

export enum RsSchoolLink {
  elemTag = 'a',
  classNames = 'rsschool__link',
}
export enum RsSchoolImg {
  elemTag = 'img',
  classNames = 'rsschool__link_img',
  alt ='rsschool-logo'
}

export enum PersonalSprints {
  elemTag = 'div',
  classNames = 'personal__sprints',
}

export enum PersonalSprintContribution {
  elemTag = 'p',
  classNames = 'personal__contribution',
}
export const rsLink = 'https://rs.school/';
export const rsLogoLink = 'https://rollingscopes.com/images/logo_rs_text.svg';
