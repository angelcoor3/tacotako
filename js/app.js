// cargar componentes
function cargarComponente(id, ruta) {
  fetch(ruta)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
    });
}

// cargar vistas
function cargarVista(nombre) {
  fetch(`/views/${nombre}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById("app").innerHTML = html;
    });
}

// iniciar
window.onload = () => {
  cargarComponente("nav", "/components/navbar.html");
  cargarComponente("footer", "/components/footer.html");
  cargarVista("home");
};