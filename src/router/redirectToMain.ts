import { RenderPage, onNavigate } from './routes';

const mainPage = '';

export const redirect = (): void => {
  onNavigate(mainPage);
  RenderPage();
};

