import './productDetails.scss';
import { Image, Price } from '@commercetools/platform-sdk';
import { getProductDetails } from '../../api/getProductDetails';
import { createElement } from '../../utils/elementCreator';
import {
  ContentPageContainer,
  DetailsParam,
  ProductCardLink,
  ProductDescription,
  ProductInfo,
  ProductName,
  ProductPrice,
  ProductSlider,
} from './types';
import { addSwiper } from '../../components/Swiper/swiperView';
import { initSlider } from '../../components/Swiper/swiperInitializer';

export default async function showDetailsPage(root: HTMLElement, key: string): Promise<void> {
  const productsPage = createElement(DetailsParam, root);
  const pageContent = createElement(ContentPageContainer, productsPage);
  const productSlider = createElement(ProductSlider, pageContent);
  const productInfo = createElement(ProductInfo, pageContent);

  const productData = await getProductDetails(key);
  const datapath = productData.masterData.current;

  const productImagesData = datapath.masterVariant.images;
  const slides: string[] = [];
  productImagesData?.forEach((image: Image) => {
    const imageUrl = image.url;
    slides.push(imageUrl);
  });

  addSwiper(productSlider, slides);
  initSlider();

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
  productPricesData?.forEach((prices) => {
    productPrice.innerText = `${prices.value.centAmount / 100} ${prices.value.currencyCode}`;
  });

  createElement(ProductCardLink, productInfo) as HTMLAnchorElement;
}
