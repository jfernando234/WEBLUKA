document.addEventListener("DOMContentLoaded", () => {
  const catalog = document.getElementById("catalog");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  let products = JSON.parse(localStorage.getItem('products')) || [];
  let cart = [];

  function displayProducts(items) {
    catalog.innerHTML = "";
    items.forEach(product => {
      const productCard = document.createElement("div");
      productCard.classList.add("product");
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p><strong>$${product.price}</strong></p>
        <p>Stock: ${product.stock}</p>
        <button class="add-to-cart" data-id="${product.id}">Añadir al Carrito</button>
      `;
      catalog.appendChild(productCard);
    });

    document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", addToCart);
    });
  }

  function addToCart(e) {
    const productId = e.target.getAttribute("data-id");
    const product = products.find(p => p.id === productId);

    if (product && product.stock > 0) {
      cart.push(product);
      product.stock -= 1;
      updateCart();
      displayProducts(products);
    } else {
      alert("Producto sin stock disponible.");
    }
  }

  function updateCart() {
    cartItems.innerHTML = "";
    const total = cart.reduce((sum, product) => sum + product.price, 0);
    cartTotal.textContent = total.toFixed(2);

    cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - $${item.price}`;
      cartItems.appendChild(li);
    });
  }

  document.getElementById("filter-button").addEventListener("click", () => {
    const category = document.getElementById("filter-category").value;
    const minPrice = parseFloat(document.getElementById("filter-min-price").value) || 0;
    const maxPrice = parseFloat(document.getElementById("filter-max-price").value) || Infinity;

    const filteredProducts = products.filter(p => {
      return (!category || p.category === category) &&
             p.price >= minPrice &&
             p.price <= maxPrice;
    });

    displayProducts(filteredProducts);
  });

  // Inicializa la visualización
  displayProducts(products);
  populateCategories(products);
});