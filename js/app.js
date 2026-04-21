function cargarConfig() {
  fetch("/config.json")
    .then(res => res.json())
    .then(data => {

      const ahora = new Date();
      const horaActual = ahora.getHours();
      const minutosActual = ahora.getMinutes();

      // convertir todo a minutos
      const ahoraMin = horaActual * 60 + minutosActual;

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

      // horario
      document.getElementById("horario").innerText = data.texto;

      // logo
      document.getElementById("logo").src = data.logo;
    });
}