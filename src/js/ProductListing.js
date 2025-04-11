import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
//js for the main html page
import { loadHeaderFooter, getParams } from "./utils.mjs";

//load header/footer wk 3
loadHeaderFooter();

const category = getParams("category");
// first create an instance of our ExternalServices class.
const dataSource = new ExternalServices();
// then get the element we want the product list to render in
const listElement = document.querySelector(".product-list");
// then create an instance of our ProductList class and send it the correct information.
const myList = new ProductList(category, dataSource, listElement);

// Update page with new sorted product list
const sortBySelect = document.getElementById("sort-by");

myList.init();

sortBySelect.addEventListener("change", () => {
  if (myList) {
    myList.init(sortBySelect.value);
  }
});

// finally call the init method to show our products