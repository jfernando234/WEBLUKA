const modal = document.getElementById("modal");
const formContent = document.getElementById("formContent");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const closeModal = document.getElementById("closeModal");

function showLoginForm() {
    formContent.innerHTML = `
        <h2>Iniciar Sesión</h2>
        <form id="loginForm">
            <input type="text" placeholder="Usuario" required>
            <input type="password" placeholder="Contraseña" required>
            <input type="submit" value="Iniciar Sesión">
        </form>
    `;
    modal.classList.remove("hidden");
}

function showRegisterForm() {
    formContent.innerHTML = `
        <h2>Registro</h2>
        <form id="registerForm">
            <input type="text" placeholder="Nombre Completo" required>
            <input type="email" placeholder="Correo Electrónico" required>
            <input type="text" placeholder="Dirección" required>
            <input type="password" placeholder="Contraseña" required>
            <input type="submit" value="Registrarse">
        </form>
    `;
    modal.classList.remove("hidden");
}

loginBtn.addEventListener("click", showLoginForm);
registerBtn.addEventListener("click", showRegisterForm);

closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
});
