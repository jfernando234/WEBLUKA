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