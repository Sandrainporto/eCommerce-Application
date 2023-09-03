import './products.scss';
import { getProductsList } from '../../api/getProducts';
import { createElement } from '../../utils/elementCreator';
import { ContentPageContainer } from '../error/types';
import {
  ProductsPageParam,
  ProductsList,
  ProductCard,
  ProductName,
  ProductImage,
  ProductImageBox,
  ProductDescription,
  ProductCardLink,
} from './types';
import { showSortPanel } from '../../components/FilterSort/Sort/sortPanel';

export default async function showProductsPage(root: HTMLElement, id: string): Promise<void> {
  const currentUrl = window.location.href;
  const productsPage = createElement(ProductsPageParam, root);
  const sortPanel = showSortPanel(productsPage);
  const pageContent = createElement(ContentPageContainer, productsPage);
  const productsList = createElement(ProductsList, pageContent);
  productsList.id = id;
  const productData = await getProductsList(id);

  productData.forEach((product) => {
    const productCard = createElement(ProductCard, productsList);

    const productIconBox = createElement(ProductImageBox, productCard);
    const productIcon = createElement(ProductImage, productIconBox) as HTMLImageElement;
    const productImagesData = product.masterVariant.images;
    productImagesData?.forEach((image) => (productIcon.src = image.url));

    const productTitle = createElement(ProductName, productCard);
    productTitle.innerText = product.name['en-US'];

    const productDescription = createElement(ProductDescription, productCard);
    if (product.description) {
      productDescription.innerText = product.description['en-US'];
    } else {
      productDescription.innerText = '';
    }

    const productLink = createElement(ProductCardLink, productCard) as HTMLAnchorElement;
    productLink.href = `${currentUrl}/product/${product.key}`;
  });
}
