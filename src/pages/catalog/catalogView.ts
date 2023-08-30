import createCategoriesCard from '../../components/Categories/categoryCard';
import showFooter from '../../components/Footer/footerView';
import showHeader from '../../components/Header/headerView';
import { createElement } from '../../utils/elementCreator';
import { ContentPageContainer } from '../error/types';
import { CatalogListParam, CatalogPageParam } from './types';

export default async function showCatalogPage(root: HTMLElement): Promise<void> {
  const catalogPage = createElement(CatalogPageParam, root);
  const pageContent = createElement(ContentPageContainer, catalogPage);
  const catalogList = createElement(CatalogListParam, pageContent);

  createCategoriesCard(catalogList);
}
