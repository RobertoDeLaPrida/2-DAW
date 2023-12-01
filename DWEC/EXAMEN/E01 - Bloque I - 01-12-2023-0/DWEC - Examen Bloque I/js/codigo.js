datosIniciales();

function datosIniciales() {}

// Gestión de formularios
function gestionFormularios(sFormularioVisible) {
  ocultarTodosLosFormularios();

  // Hacemos visible el formulario que llega como parámetro
  switch (sFormularioVisible) {
    case "frmAltaCatalogo":
      frmAltaCatalogo.style.display = "block";
      break;
    case "frmEntradaStock":
      frmEntradaStock.style.display = "block";
      break;
    case "frmSalidaStock":
      frmSalidaStock.style.display = "block";
      break;
  }
}

function ocultarTodosLosFormularios() {
  let oFormularios = document.querySelectorAll("form");

  for (let i = 0; i < oFormularios.length; i++) {
    oFormularios[i].style.display = "none";
  }
}

function aceptarAltaCatalogo() {
  // Añadir código
}

function aceptarEntradaStock() {
  // Añadir código
}

function aceptarSalidaStock() {
  // Añadir código
}

function mostrarListadoCatalogo() {
  // Añadir código
}

function mostrarListadoStock() {
  // Añadir código
}

function mostrarTotales() {
  // Añadir código
}
