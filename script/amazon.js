import { cart, products } from "../data/products.js";

let productHTML = "";

products.forEach((element) => {
  productHTML += `
     <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src=${element.image}
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${element.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${element.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">56</div>
          </div>

          <div class="product-price">$${(element.priceCents / 100).toFixed(
            2
          )}</div>

          <div class="product-quantity-container">
            <select class ="js-quantity-selector-${element.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${element.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${element.id}">Add to Cart</button>
        </div>
  `;
});

document.querySelector(".js-products-grid").innerHTML = productHTML;

console.log(products.name);

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    /*     const productId = button.dataset.productId; */
    const { productId } = button.dataset;

    const quantity = document.querySelector(
      `.js-quantity-selector-${productId}`
    ).value;

    let matchingItem;

    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += Number(quantity);
    } else {
      cart.push({
        productId,
        quantity: Number(quantity),
      });
    }

    let cartQuantity = 0;

    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

    const addedMessage = document.querySelector(
      `.js-added-to-cart-${productId}`
    );

    addedMessage.classList.add("added-to-cart-visible");

    setTimeout(() => {
      addedMessage.classList.remove("added-to-cart-visible");
    }, 2000);

    localStorage.setItem("cartItems", JSON.stringify(cart));
  });
});
