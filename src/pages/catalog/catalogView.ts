import { getCategoriesList } from '../../api/getCatalog';
import showBreadcrumb from '../../components/Breadcrumb/breadcrumbsView';
import createCategoriesCard from '../../components/Categories/categoryCard';
import showFooter from '../../components/Footer/footerView';
import showHeader from '../../components/Header/headerView';
import { createElement } from '../../utils/elementCreator';
import { ContentPageContainer } from '../error/types';
import { CatalogListParam, CatalogPageParam } from './types';

export default async function showCatalogPage(root: HTMLElement): Promise<void> {
  showHeader(root);
  const catalogPage = createElement(CatalogPageParam, root);
  const pageContent = createElement(ContentPageContainer, catalogPage);

  const catalogList = createElement(CatalogListParam, pageContent);

  createCategoriesCard(catalogList);

  showFooter(root);
}
