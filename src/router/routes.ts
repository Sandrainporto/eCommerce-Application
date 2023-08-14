import showMainPage from '../pages/main/mainView';
import showErrorPage from '../pages/error/error';

export const Routes = {
  '/': showMainPage,
  '404': showErrorPage,
};
