function showContent(section) {
    // Ocultar todos los paneles
    const panels = document.querySelectorAll('.content-panel');
    panels.forEach(panel => panel.classList.add('hidden'));
  
    // Mostrar el panel seleccionado
    const selectedPanel = document.getElementById(section);
    selectedPanel.classList.remove('hidden');
  
    // Quitar clase activa de todos los botones
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));
  
    // Agregar clase activa al botón seleccionado
    const activeButton = document.querySelector(`.tab-button[onclick="showContent('${section}')"]`);
    activeButton.classList.add('active');
  }
  
  function showContent(section) {
    const panels = document.querySelectorAll('.content-panel');
    panels.forEach(panel => panel.classList.add('hidden'));
  
    const selectedPanel = document.getElementById(section);
    selectedPanel.classList.remove('hidden');
  
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));
  
    const activeButton = document.querySelector(`.tab-button[onclick="showContent('${section}')"]`);
    activeButton.classList.add('active');
  }

  document.getElementById('productForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Obtener valores del formulario
    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const stock = parseInt(document.getElementById('productStock').value);
    const category = document.getElementById('productCategory').value;
    const imageFile = document.getElementById('productImage').files[0];
  
    if (!name || !description || price <= 0 || stock <= 0 || !category || !imageFile) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }
  
    // Crear una URL de imagen temporal para mostrarla
    const imageUrl = URL.createObjectURL(imageFile);
  
    // Crear una nueva fila en la tabla
    const table = document.getElementById('productTable').querySelector('tbody');
    const newRow = table.insertRow();
  
    newRow.innerHTML = `
      <td><img src="${imageUrl}" alt="${name}"></td>
      <td>${name}</td>
      <td>${description}</td>
      <td>$${price.toFixed(2)}</td>
      <td>${stock}</td>
      <td>${category}</td>
    `;
  
    // Limpiar el formulario
    this.reset();
  });

  /* repuestos */
  let products = [
    { name: "Filtro A", description: "Filtro de aire", price: 20, category: "Filtros", stock: 10 },
    { name: "Aceite B", description: "Aceite sintético", price: 50, category: "Aceites", stock: 5 },
    { name: "Bujía C", description: "Bujía estándar", price: 15, category: "Bujías", stock: 0 },
  ];
  
  let cart = [];
  
  function showContent(section) {
    const panels = document.querySelectorAll('.content-panel');
    panels.forEach(panel => panel.classList.add('hidden'));
  
    const selectedPanel = document.getElementById(section);
    selectedPanel.classList.remove('hidden');
  
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));
  
    const activeButton = document.querySelector(`.tab-button[onclick="showContent('${section}')"]`);
    activeButton.classList.add('active');
  }
  
  function loadCatalog() {
    const table = document.getElementById('catalogTable').querySelector('tbody');
    table.innerHTML = "";
  
    products.forEach((product, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.description}</td>
        <td>$${product.price.toFixed(2)}</td>
        <td>${product.category}</td>
        <td>${product.stock > 0 ? product.stock : "Agotado"}</td>
        <td>
          <button ${product.stock === 0 ? "disabled" : ""} onclick="addToCart(${index})">Añadir al carrito</button>
        </td>
      `;
      table.appendChild(row);
    });
  }
  
  function applyFilters() {
    const category = document.getElementById('filterCategory').value;
    const minPrice = parseFloat(document.getElementById('filterPriceMin').value) || 0;
    const maxPrice = parseFloat(document.getElementById('filterPriceMax').value) || Infinity;
    const inStock = document.getElementById('filterInStock').checked;
  
    const filteredProducts = products.filter(product => {
      return (
        (!category || product.category === category) &&
        product.price >= minPrice &&
        product.price <= maxPrice &&
        (!inStock || product.stock > 0)
      );
    });
  
    // Actualizar tabla con productos filtrados
    products = filteredProducts;
    loadCatalog();
  }
  
  function addToCart(index) {
    const product = products[index];
    const existing = cart.find(item => item.name === product.name);
  
    if (existing) {
      if (existing.quantity < product.stock) {
        existing.quantity++;
      }
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    updateCart();
  }
  
  function updateCart() {
    const table = document.getElementById('cartTable').querySelector('tbody');
    table.innerHTML = "";
  
    let total = 0;
  
    cart.forEach((item, index) => {
      const row = document.createElement('tr');
      const totalItemPrice = item.quantity * item.price;
      total += totalItemPrice;
  
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>$${totalItemPrice.toFixed(2)}</td>
        <td><button onclick="removeFromCart(${index})">Eliminar</button></td>
      `;
      table.appendChild(row);
    });
  
    document.getElementById('totalPrice').textContent = total.toFixed(2);
  }
  
  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
  }
  
  function completePurchase() {
    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }
  
    alert("Compra completada con éxito. ¡Gracias por tu compra!");
    cart = [];
    updateCart();
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    loadCatalog();
  });