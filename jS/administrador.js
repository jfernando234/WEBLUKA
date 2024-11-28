// Cambios: Función para alternar la visibilidad de los paneles
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

// Función para registrar productos
document.getElementById('productForm').addEventListener('submit', function (e) {
  e.preventDefault();

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

  const imageUrl = URL.createObjectURL(imageFile);

  const product = {
    id: Date.now().toString(),
    name,
    description,
    price,
    stock,
    category,
    image: imageUrl,
  };

  const products = JSON.parse(localStorage.getItem('products')) || [];
  products.push(product);
  localStorage.setItem('products', JSON.stringify(products));

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

  this.reset();
  alert('Producto registrado y almacenado correctamente.');
});

// Funciones para manejar citas
function loadAppointments() {
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  const tableBody = document.getElementById('appointmentsTable').querySelector('tbody');
  tableBody.innerHTML = "";

  appointments.forEach((appointment, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${appointment.date}</td>
      <td>${appointment.time}</td>
      <td>${appointment.service}</td>
      <td>${appointment.vehicleBrand} ${appointment.vehicleModel} (${appointment.vehicleYear})</td>
      <td><button onclick="cancelAppointment(${index})">Cancelar</button></td>
    `;
    tableBody.appendChild(row);
  });
}

function scheduleAppointment() {
  const date = document.getElementById('appointmentDate').value;
  const time = document.getElementById('appointmentTime').value;
  const service = document.getElementById('serviceType').value;
  const vehicleBrand = document.getElementById('vehicleBrand').value;
  const vehicleModel = document.getElementById('vehicleModel').value;
  const vehicleYear = document.getElementById('vehicleYear').value;

  if (!date || !time || !service || !vehicleBrand || !vehicleModel || !vehicleYear) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

  const isConflict = appointments.some(
    appointment => appointment.date === date && appointment.time === time
  );

  if (isConflict) {
    alert("Este horario ya está ocupado. Por favor, elige otro.");
    return;
  }

  appointments.push({ date, time, service, vehicleBrand, vehicleModel, vehicleYear });
  localStorage.setItem('appointments', JSON.stringify(appointments));

  alert("Cita agendada con éxito.");
  loadAppointments();
}

function cancelAppointment(index) {
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  appointments.splice(index, 1);
  localStorage.setItem('appointments', JSON.stringify(appointments));

  alert("Cita cancelada con éxito.");
  loadAppointments();
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  showContent('productos'); // Cambiar la pestaña activa al cargar
  loadAppointments(); // Cargar citas al inicio
});
