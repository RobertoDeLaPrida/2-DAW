formulario.boton.addEventListener("click", mostrarDatos);

function mostrarDatos() {
  for (let opcion of formulario.provincias.options) {
    if (opcion.selected) {
      console.log("Provincia: " + opcion.text + " - Código: " + opcion.value);
    }
  }
}
