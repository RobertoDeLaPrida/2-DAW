formulario.consultar.addEventListener("click", mostrarDatos);
function mostrarDatos() {
  // También valdría
  // console.log(formulario.actores.value);

  for (let actor of formulario.actores) {
    if (actor.checked) {
      console.log(actor.value);
    }
  }
}
