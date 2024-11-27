// Seleccionar elementos
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const formContent = document.getElementById("formContent");
const mainContent = document.querySelector(".main-content");

// Mostrar modal con contenido dinámico
loginBtn.addEventListener("click", () => {
    formContent.innerHTML = `
        <h2>Iniciar Sesión</h2>
        <form id="loginForm">
            <input type="text" id="loginUser" placeholder="Usuario" required>
            <input type="password" id="loginPassword" placeholder="Contraseña" required>
            <button type="submit">Entrar</button>
        </form>
    `;
    modal.classList.remove("hidden");

    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", handleLogin);
});

registerBtn.addEventListener("click", () => {
    formContent.innerHTML = `
        <h2>Registrarse</h2>
        <form id="registerForm">
            <input type="text" id="registerName" placeholder="Nombre" required>
            <input type="email" id="registerEmail" placeholder="Correo Electrónico" required>
            <input type="password" id="registerPassword" placeholder="Contraseña" required>
            <button type="submit">Registrar</button>
        </form>
    `;
    modal.classList.remove("hidden");

    const registerForm = document.getElementById("registerForm");
    registerForm.addEventListener("submit", handleRegister);
});

// Cerrar modal
closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
});

// Cerrar modal al hacer clic fuera del contenido
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden");
    }
});

// Manejar el inicio de sesión
function handleLogin(e) {
    e.preventDefault();

    const user = document.getElementById("loginUser").value;
    const password = document.getElementById("loginPassword").value;

    if (user === "admin" && password === "admin") {
        // Mostrar vista de administrador
        window.location.href = "/Html/Administrador.html";
    } else {
        // Buscar en localStorage si existe el usuario
        const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const foundUser = savedUsers.find((u) => u.email === user && u.password === password);

        if (foundUser) {
            // Mostrar vista de cliente
            window.location.href = "/Html/index.html";           
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    }
}

// Manejar el registro de usuario
function handleRegister(e) {
    e.preventDefault();

    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    const newUser = { name, email, password };

    // Obtener los usuarios actuales del localStorage
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Verificar si el correo ya está registrado
    const emailExists = savedUsers.some((user) => user.email === email);
    if (emailExists) {
        alert("Este correo ya está registrado.");
        return;
    }

    // Guardar el nuevo usuario en localStorage
    savedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(savedUsers));

    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    modal.classList.add("hidden");
}
