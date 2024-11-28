document.getElementById('productForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Obtener valores del formulario
  const name = document.getElementById('productName').value;
  const description = document.getElementById('productDescription').value;
  const price = parseFloat(document.getElementById('productPrice').value);
  const stock = parseInt(document.getElementById('productStock').value);
  const category = document.getElementById('productCategory').value;
  const imageFile = document.getElementById('productImage').files[0];

  // Validar datos
  if (!name || !description || price <= 0 || stock <= 0 || !category || !imageFile) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
  }

  // Crear objeto FormData para enviar datos y archivo de imagen
  const formData = new FormData();
  formData.append('action', 'addProduct');
  formData.append('name', name);
  formData.append('description', description);
  formData.append('price', price);
  formData.append('stock', stock);
  formData.append('category', category);
  formData.append('image', imageFile);

  // Enviar datos al servidor con fetch
  fetch('products.php', {
      method: 'POST',
      body: formData,
  })
  .then(response => response.json())
  .then(data => {
      if (data.status === 'success') {
          alert(data.message);

          // Crear una nueva fila en la tabla
          const table = document.getElementById('productTable').querySelector('tbody');
          const newRow = table.insertRow();

          newRow.innerHTML = `
              <td><img src="${data.imageUrl}" alt="${name}" style="width: 100px;"></td>
              <td>${name}</td>
              <td>${description}</td>
              <td>$${price.toFixed(2)}</td>
              <td>${stock}</td>
              <td>${category}</td>
          `;

          // Resetear formulario
          this.reset();
      } else {
          alert(data.message);
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert('Error al guardar el producto.');
  });
});

// Cargar citas desde localStorage
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

// Agendar una cita
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

  // Validar disponibilidad
  const isConflict = appointments.some(
    appointment => appointment.date === date && appointment.time === time
  );

  if (isConflict) {
    alert("Este horario ya está ocupado. Por favor, elige otro.");
    return;
  }

  // Agregar nueva cita
  appointments.push({ date, time, service, vehicleBrand, vehicleModel, vehicleYear });
  localStorage.setItem('appointments', JSON.stringify(appointments));

  alert("Cita agendada con éxito.");
  loadAppointments();
}

// Cancelar una cita
function cancelAppointment(index) {
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  appointments.splice(index, 1);
  localStorage.setItem('appointments', JSON.stringify(appointments));

  alert("Cita cancelada con éxito.");
  loadAppointments();
}

// Inicializar citas
document.addEventListener('DOMContentLoaded', () => {
  loadAppointments();
});
