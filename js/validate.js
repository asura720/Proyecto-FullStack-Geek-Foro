// ===============================
// VALIDACIÓN DE FORMULARIO DE CONTACTO (si existe)
// ===============================
const formContacto = document.getElementById("formContacto");
if (formContacto) {
  formContacto.addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();
    const resultado = document.getElementById("resultado");

    let errores = [];

    if (nombre.length < 3) errores.push("El nombre debe tener al menos 3 caracteres.");
    if (!/^[\w.-]+@[\w.-]+\.\w+$/.test(correo)) errores.push("El correo no es válido.");
    if (mensaje.length < 10) errores.push("El mensaje debe tener al menos 10 caracteres.");

    if (errores.length > 0) {
      resultado.innerHTML = errores.join("<br>");
      resultado.style.color = "red";
    } else {
      resultado.innerHTML = "Mensaje enviado correctamente.";
      resultado.style.color = "green";
      formContacto.reset();
    }
  });
}

// ===============================
// MANEJO DE SESIÓN Y MODALES
// ===============================
const btnLogin = document.getElementById("btnLogin");
const btnRegister = document.getElementById("btnRegister");
const btnLogout = document.getElementById("btnLogout");
const btnPerfil = document.getElementById("btnPerfil");

const modalLogin = document.getElementById("modalLogin");
const modalRegister = document.getElementById("modalRegister");

const closeLogin = document.getElementById("closeLogin");
const closeRegister = document.getElementById("closeRegister");

// Sección de login/registro en el cuerpo
const authSection = document.getElementById("authSection");

// Mostrar modales
if (btnLogin) btnLogin.addEventListener("click", () => modalLogin.style.display = "block");
if (btnRegister) btnRegister.addEventListener("click", () => modalRegister.style.display = "block");

// Cerrar modales
if (closeLogin) closeLogin.addEventListener("click", () => modalLogin.style.display = "none");
if (closeRegister) closeRegister.addEventListener("click", () => modalRegister.style.display = "none");

// Cerrar al hacer clic fuera del modal
window.addEventListener("click", (e) => {
  if (e.target === modalLogin) modalLogin.style.display = "none";
  if (e.target === modalRegister) modalRegister.style.display = "none";
});

// Formularios de login y registro
const formLogin = document.getElementById("formLogin");
const formRegister = document.getElementById("formRegister");

// LOGIN: validar contra usuarios registrados
if (formLogin) {
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    const correo = document.getElementById("loginCorreo").value.trim();
    const pass = document.getElementById("loginPass").value.trim();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(u => u.correo === correo && u.pass === pass);

    if (usuario) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
      alert("Sesión iniciada como " + usuario.correo);
      modalLogin.style.display = "none";
      actualizarEstadoSesion();
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  });
}

// REGISTRO: guardar en lista de usuarios
if (formRegister) {
  formRegister.addEventListener("submit", (e) => {
    e.preventDefault();
    const correo = document.getElementById("regCorreo").value.trim();
    const pass = document.getElementById("regPass").value.trim();

    if (correo && pass.length >= 6) {
      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      const existe = usuarios.find(u => u.correo === correo);
      if (existe) {
        alert("Este correo ya está registrado.");
        return;
      }

      const nuevoUsuario = {
        correo: correo,
        pass: pass,
        nombre: "Nuevo usuario",
        fecha: new Date().toLocaleDateString()
      };

      usuarios.push(nuevoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));

      alert("Cuenta creada y sesión iniciada como " + correo);
      modalRegister.style.display = "none";
      actualizarEstadoSesion();
    } else {
      alert("La contraseña debe tener al menos 6 caracteres.");
    }
  });
}

// Cerrar sesión
if (btnLogout) {
  btnLogout.addEventListener("click", () => {
    localStorage.removeItem("usuario");
    alert("Sesión cerrada");
    actualizarEstadoSesion();
  });
}

// Actualizar botones y secciones según estado
function actualizarEstadoSesion() {
  const usuario = localStorage.getItem("usuario");

  if (usuario) {
    if (btnLogin) btnLogin.style.display = "none";
    if (btnRegister) btnRegister.style.display = "none";
    if (btnLogout) btnLogout.style.display = "inline-block";
    if (btnPerfil) btnPerfil.style.display = "inline-block";
    if (authSection) authSection.style.display = "none";
  } else {
    if (btnLogin) btnLogin.style.display = "inline-block";
    if (btnRegister) btnRegister.style.display = "inline-block";
    if (btnLogout) btnLogout.style.display = "none";
    if (btnPerfil) btnPerfil.style.display = "none";
    if (authSection) authSection.style.display = "block";
  }
}

// Inicializar al cargar
actualizarEstadoSesion();