import { categoryPathes } from './../../components/Categories/categoryCard';
import { getCategoriesList } from '../../api/getCatalog';
import showFooter from '../../components/Footer/footerView';
import showHeader from '../../components/Header/headerView';
import { createElement } from '../../utils/elementCreator';
import { ContentPageContainer } from '../error/types';
import { CatalogListParam, CatalogPageParam } from './types';

export default async function showCatalogPage(root: HTMLElement):Promise<void> {
  showHeader(root);
  const catalogPage = createElement(CatalogPageParam, root);
  const pageContent = createElement(ContentPageContainer, catalogPage);

  const catalogList = createElement(CatalogListParam, pageContent);

  await getCategoriesList(catalogList);
  
  console.log(categoryPathes)
  const links = document.querySelectorAll('a');
console.log(links)

  showFooter(root);
}
