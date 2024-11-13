import { products } from "../data/products.js";

const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

let matchingProducts = [];

products.forEach((product) => {
  const matchingItem = cartItems.find((item) => item.productId === product.id);

  if (matchingItem) {
    matchingProducts.push({
      product,
      quantity: matchingItem.quantity,
    });
  }
});

let listingProduct = "";

const showQuantity = (quantity) => {
  let optionElement = "";
  for (let i = 1; i <= 9; i++) {
    if (i == quantity) {
      optionElement += `<option selected value=${i}>${i}</option>`;
      continue;
    }

    optionElement += `<option value=${i}>${i}</option>`;
  }
  return optionElement;
};

matchingProducts.forEach((cartItem) => {
  listingProduct += `
    <div class="cart-item-container">
      <div class="delivery-date">Delivery date: Wednesday, June 15</div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${cartItem.product.image}" alt="${
    cartItem.product.name
  }" />

        <div class="cart-item-details">
          <div class="product-name">${cartItem.product.name}</div>
          <div class="product-price">$${(
            cartItem.product.priceCents / 100
          ).toFixed(2)}</div>
          <div class="product-quantity">
            <span> Quantity: <span class="quantity-label">
            
            <select class="js-select-quantity" data-product-id =${
              cartItem.product.id
            }>
            ${showQuantity(cartItem.quantity)}
            </select>
            
            </span> </span>

            <span class="update-quantity-link link-primary js-update-quantity" data-product-id=${
              cartItem.product.id
            }>Update</span>
            <span class="delete-quantity-link link-primary">Delete</span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">Choose a delivery option:</div>

          <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-2-${
              cartItem.product.id
            }" />
            <div>
              <div class="delivery-option-date">Tuesday, June 21</div>
              <div class="delivery-option-price">FREE Shipping</div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" checked class="delivery-option-input" name="delivery-option-2-${
              cartItem.product.id
            }" />
            <div>
              <div class="delivery-option-date">Wednesday, June 15</div>
              <div class="delivery-option-price">$4.99 - Shipping</div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-2-${
              cartItem.product.id
            }" />
            <div>
              <div class="delivery-option-date">Monday, June 13</div>
              <div class="delivery-option-price">$9.99 - Shipping</div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
});

document.querySelector(".js-order-summary").innerHTML = listingProduct;

// TODO: Aşağıda kod satırları update işlemi için kullanılıyor onlclick event için arrow fonksiyon oluşturmayı deneyerek yap.
document.querySelectorAll(".js-update-quantity").forEach((spanHTMLElement) => {
  spanHTMLElement.addEventListener("click", () => {
    const spanProductId = spanHTMLElement.dataset.productId;
    const selectHTMLElement = document.querySelector(
      `.js-select-quantity[data-product-id="${spanProductId}"]`
    );

    if (selectHTMLElement) {
      const newQuantity = selectHTMLElement.value;
      selectHTMLElement.innerHTML = showQuantity(newQuantity);
    }
  });
});
