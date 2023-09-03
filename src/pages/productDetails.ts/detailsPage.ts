import { createElement } from "../../utils/elementCreator";
import { DetailsParam } from "./types";


export default async function showDetailsPage(root: HTMLElement, id: string) {
  console.log(id);
 
  const productsPage = createElement(DetailsParam, root);
  productsPage.innerHTML =`hello`

}
