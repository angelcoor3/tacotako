function cargarComponente(id, ruta) {
  fetch(ruta)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
    });
}

function cargarVista(nombre) {
  fetch(`/views/${nombre}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById("app").innerHTML = html;

      if (nombre === "home") cargarConfig();
    });
}

function cargarConfig() {
  fetch("/config.json")
    .then(res => res.json())
    .then(data => {

      const ahora = new Date();
      const ahoraMin = ahora.getHours() * 60 + ahora.getMinutes();

      const [hA, mA] = data.horario.apertura.split(":").map(Number);
      const [hC, mC] = data.horario.cierre.split(":").map(Number);

      const aperturaMin = hA * 60 + mA;
      const cierreMin = hC * 60 + mC;

      const estadoEl = document.getElementById("estado");

      if (ahoraMin >= aperturaMin && ahoraMin < cierreMin) {
        estadoEl.innerText = "🟢 ABIERTO";
        estadoEl.className = "abierto";
      } else {
        estadoEl.innerText = "🔴 CERRADO";
        estadoEl.className = "cerrado";
      }

      document.getElementById("horario").innerText = data.texto;
      document.getElementById("logo").src = data.logo;
    });
}

// modal
function abrirModal(src) {
  document.getElementById("modal").style.display = "block";
  document.getElementById("modal-img").src = src;
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}

window.onload = () => {
  cargarComponente("nav", "/components/navbar.html");
  cargarComponente("footer", "/components/footer.html");
  cargarVista("home");
};