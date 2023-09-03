import './productDetails.scss'
import { Price } from '@commercetools/platform-sdk';
import { getProductDetails } from '../../api/getProductDetails';
import { createElement } from '../../utils/elementCreator';
import { ContentPageContainer, DetailsParam, ProductCardLink, ProductDescription, ProductInfo, ProductName, ProductPrice, ProductSlider } from './types';

export default async function showDetailsPage(root: HTMLElement, key: string) {
  const productsPage = createElement(DetailsParam, root);
  const pageContent = createElement(ContentPageContainer, productsPage);

const productSlider = createElement(ProductSlider, pageContent)

const productInfo = createElement(ProductInfo, pageContent)

const productData = await getProductDetails(key)
console.log(productData.masterData.current.name)
const datapath = productData.masterData.current;
  const productTitle = createElement(ProductName, productInfo);
  productTitle.innerText = datapath.name['en-US'];

  const productDescription = createElement(ProductDescription, productInfo);
  if (datapath.description) {
    productDescription.innerText = datapath.description['en-US'];
  } else {
    productDescription.innerText = 'No description';
  }

  
  const productPrice = createElement(ProductPrice, productInfo);
  const productPricesData: Price[] | undefined = datapath.masterVariant.prices;
  productPricesData?.forEach(
    (prices) => (productPrice.innerText = `${prices.value.centAmount / 100} ${prices.value.currencyCode}`),
  );

  const productLink = createElement(ProductCardLink, pageContent) as HTMLAnchorElement;




}
