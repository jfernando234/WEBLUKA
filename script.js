// script.js
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');

// Abrir el modal
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'flex';
});

// Cerrar el modal
closeModal.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

// Cerrar el modal al hacer clic fuera de él
window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    }
});