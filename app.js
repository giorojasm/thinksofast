// ===== SISTEMA DE AUTENTICACIÓN (DEMO LOCAL) =====
const auth = {
  get user() {
    return JSON.parse(localStorage.getItem("demoUser") || "null");
  },
  login(email) {
    const user = { 
      email, 
      role: email.endsWith("@colegio.edu") ? "docente" : "invitado" 
    };
    localStorage.setItem("demoUser", JSON.stringify(user));
    return user;
  },
  logout() { 
    localStorage.removeItem("demoUser"); 
  }
};

// ===== ELEMENTOS DEL DOM =====
const views = document.querySelectorAll(".view");
const nav = document.getElementById("nav");
const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");
const loginModal = document.getElementById("loginModal");
const perfilInfo = document.getElementById("perfilInfo");

// ===== FUNCIONES DE VISTA Y UI =====
function setView(name) {
  views.forEach(v => v.classList.remove("active"));
  const el = document.getElementById(`view-${name}`);
  if (el) el.classList.add("active");
}

function updateUI() {
  const user = auth.user;
  document.querySelectorAll(".auth-only").forEach(el => {
    el.style.display = user ? "" : "none";
  });
  btnLogin.style.display = user ? "none" : "";
  btnLogout.style.display = user ? "" : "none";
  perfilInfo.textContent = user 
    ? `Correo: ${user.email} | Rol: ${user.role}` 
    : "No has iniciado sesión.";
}

// Inicializa la vista y la interfaz
updateUI(); 
setView("inicio");

// ===== EVENTOS DE NAVEGACIÓN =====
nav.addEventListener("click", (e) => {
  const link = e.target.closest("[data-view]");
  if (link) { 
    e.preventDefault(); 
    setView(link.dataset.view); 
  }
});

// ===== BOTONES DE LOGIN/LOGOUT =====
btnLogin.addEventListener("click", () => loginModal.showModal());

btnLogout.addEventListener("click", () => { 
  auth.logout(); 
  updateUI(); 
  setView("inicio"); 
});

// ===== EVENTO: BOTÓN “ENTRAR” DEL MODAL =====
document.getElementById("doLogin").addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const pass  = document.getElementById("pass").value.trim();

  if (email && pass) {
    auth.login(email);
    loginModal.close();
    updateUI();

    // 🔹 Redirección directa al archivo de Material de Estudio
    // Asegúrate de que el archivo esté en la misma carpeta que final.html
    window.location.href = "./material_de_estudio.html";
  } else {
    alert("Por favor ingresa tu correo y contraseña.");
  }
});
