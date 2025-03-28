import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  // If cartItems is null or undefined, show empty cart
  if (!cartItems) {
    document.querySelector(".product-list").innerHTML =
      "<li class='cart-card'>Your cart is empty</li>";
    document.querySelector(".cart-total").textContent = "Total: $0.00";
    return;
  }

  // Convert to array if it's a single object
  const itemsArray = Array.isArray(cartItems) ? cartItems : [cartItems];

  // Generate HTML for each item
  const htmlItems = itemsArray.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Compute and display total price
  const totalPrice = itemsArray.reduce((total, item) => total + item.FinalPrice, 0);
  document.querySelector(".cart-total").textContent = `Total: $${totalPrice.toFixed(2)}`;
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
