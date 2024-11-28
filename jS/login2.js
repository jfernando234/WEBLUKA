// Declarando variables
const formularioLogin = document.querySelector(".formulario__login");
const formularioRegister = document.querySelector(".formulario__register");
const contenedorLoginRegister = document.querySelector(".contenedor__login-register");
const cajaTraseraLogin = document.querySelector(".caja__trasera-login");
const cajaTraseraRegister = document.querySelector(".caja__trasera-register");

// Función para ajustar la vista dependiendo del ancho
function anchoPage() {
    if (window.innerWidth > 850) {
        cajaTraseraRegister.style.display = "block";
        cajaTraseraLogin.style.display = "block";
    } else {
        cajaTraseraRegister.style.display = "block";
        cajaTraseraRegister.style.opacity = "1";
        cajaTraseraLogin.style.display = "none";
        formularioLogin.style.display = "block";
        contenedorLoginRegister.style.left = "0px";
        formularioRegister.style.display = "none";
    }
}

anchoPage();
window.addEventListener("resize", anchoPage);

// Función para manejar el registro
function register() {
    const nombreCompleto = document.querySelector("#nombre_completo").value;
    const email = document.querySelector("#email_register").value;
    const usuario = document.querySelector("#usuario").value;
    const password = document.querySelector("#password_register").value;

    if (!nombreCompleto || !email || !usuario || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    fetch("auth.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `action=register&nombre_completo=${encodeURIComponent(nombreCompleto)}&email=${encodeURIComponent(email)}&usuario=${encodeURIComponent(usuario)}&password=${encodeURIComponent(password)}`
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.status === "success") iniciarSesion();
    })
    .catch(error => console.error("Error en la solicitud:", error));
}

// Función para manejar el inicio de sesión
function iniciarSesion() {
    const email = document.querySelector("#email_login").value;
    const password = document.querySelector("#password_login").value;

    if (!email || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    fetch("auth.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `action=login&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.status === "success") {
            window.location.href = "pagina_principal.html"; // Cambia según tu aplicación
        }
    })
    .catch(error => console.error("Error en la solicitud:", error));
}

document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
document.getElementById("btn__registrarse").addEventListener("click", register);
