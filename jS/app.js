document.addEventListener("DOMContentLoaded", () => {
  const catalog = document.getElementById("catalog");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  let cart = []; // Inicializa el carrito vacío

  // Cargar productos desde localStorage al iniciar la página
  loadProducts();

  // Función para cargar productos desde localStorage
  function loadProducts() {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    catalog.innerHTML = ""; // Limpiar el contenido previo

    if (savedProducts.length === 0) {
      catalog.innerHTML = "<p>No hay productos disponibles.</p>";
      return;
    }

    // Renderizar productos en el catálogo
    savedProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Precio: $${product.price.toFixed(2)}</p>
        <button data-id="${product.id}">Agregar al carrito</button>
      `;

      // Agregar evento para el botón "Agregar al carrito"
      productCard.querySelector("button").addEventListener("click", () => addToCart(product));

      catalog.appendChild(productCard);
    });
  }

  // Función para agregar un producto al carrito
  function addToCart(product) {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    updateCart();
  }

  // Función para actualizar el carrito
  function updateCart() {
    cartItems.innerHTML = ""; // Limpia la lista actual
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = total.toFixed(2); // Actualiza el total

    cart.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
      cartItems.appendChild(li);
    });
  }
});
