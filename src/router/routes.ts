import showMainContent from '../components/mainContent/mainContent';
import showCatalogPage from '../pages/catalog/catalogView';
import showErrorPage from '../pages/error/error';
import { showAuthPage } from '../pages/login/authView';
import showDetailsPage from '../pages/productDetails.ts/detailsPage';
import showProductsPage from '../pages/products/productViewPage';
import { showRegPage } from '../pages/registration/regView';

export const Routes = {
  '': showMainContent,
  login: showAuthPage,
  register: showRegPage,
  catalog: showCatalogPage,
  products: showProductsPage,

  details: showDetailsPage,

  '404': showErrorPage,
};
