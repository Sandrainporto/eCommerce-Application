import showMainContent from '../components/mainContent/mainContent';
import showCatalogPage from '../pages/catalog/catalogView';
import showErrorPage from '../pages/error/error';
import { showAuthPage } from '../pages/login/authView';
import showDetailsPage from '../pages/productDetails.ts/detailsPage';
import showProductsPage from '../pages/products/productViewPage';
import { showRegPage } from '../pages/registration/regView';
import { showProfPage } from '../pages/profile/profileView';
import { showClassesPage } from '../pages/classesPage/showClassesPage';
import { showBasketPage } from '../pages/basket/basketView';
import { showAboutUsPage } from '../pages/aboutUs/showAboutUsPage';

export const Routes = {
  '': showMainContent,
  login: showAuthPage,
  register: showRegPage,
  catalog: showCatalogPage,
  products: showProductsPage,
  cart: showBasketPage,
  profile: showProfPage,
  details: showDetailsPage,
  classes: showClassesPage,
  'about-us': showAboutUsPage,
  '404': showErrorPage,
};
