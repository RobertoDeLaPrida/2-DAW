function marcarDesmarcar() {
  formulario.verano.checked = !formulario.verano.checked;
}

function addManejador() {
  let oBoton = document.getElementById("botonMarcar");
  oBoton.addEventListener("click", marcarDesmarcar);
}

function deleteManejador() {
  let oBoton = document.getElementById("botonMarcar");
  oBoton.removeEventListener("click", marcarDesmarcar);
}
