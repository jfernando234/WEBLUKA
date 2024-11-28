document.addEventListener('DOMContentLoaded', function () {
  fetch('listarProductos.php')
      .then(response => response.json())
      .then(data => renderProductos(data))
      .catch(error => console.error('Error:', error));
});

function renderProductos(data) {
  const container = document.getElementById('productosContainer');
  container.innerHTML = ''; // Limpia el contenedor antes de renderizar

  for (const [categoria, productos] of Object.entries(data)) {
      // Crear un contenedor para la categoría
      const categoryWrapper = document.createElement('div');
      categoryWrapper.classList.add('product-carousel-wrapper');

      // Título de la categoría
      const categoryTitle = document.createElement('h2');
      categoryTitle.textContent = categoria;
      categoryWrapper.appendChild(categoryTitle);

      // Estructura del carrusel
      const carousel = document.createElement('div');
      carousel.classList.add('product-carousel');

      const leftButton = document.createElement('button');
      leftButton.classList.add('carousel-button', 'left');
      leftButton.setAttribute('onclick', 'scrollCarousel(-1)');
      leftButton.innerHTML = '&#8249;';

      const rightButton = document.createElement('button');
      rightButton.classList.add('carousel-button', 'right');
      rightButton.setAttribute('onclick', 'scrollCarousel(1)');
      rightButton.innerHTML = '&#8250;';

      const carouselContainer = document.createElement('div');
      carouselContainer.classList.add('carousel-container');

      const carouselTrack = document.createElement('div');
      carouselTrack.classList.add('carousel-track');

      // Crear tarjetas de producto
      productos.forEach(producto => {
          const productCard = document.createElement('div');
          productCard.classList.add('product-card');

          const img = document.createElement('img');
          img.src = producto.imagen; // Cambiar por la columna `imagen` de la BD
          img.alt = producto.nombre;

          const name = document.createElement('p');
          name.textContent = producto.nombre;

          const price = document.createElement('p');
          price.innerHTML = `<strong>S/ ${producto.precio}</strong>`;

          const button = document.createElement('button');
          button.classList.add('add-button');
          button.textContent = 'Agregar';

          productCard.appendChild(img);
          productCard.appendChild(name);
          productCard.appendChild(price);
          productCard.appendChild(button);

          carouselTrack.appendChild(productCard);
      });

      carouselContainer.appendChild(carouselTrack);
      carousel.appendChild(leftButton);
      carousel.appendChild(carouselContainer);
      carousel.appendChild(rightButton);
      categoryWrapper.appendChild(carousel);

      container.appendChild(categoryWrapper);
  }
}
