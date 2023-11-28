let oVivero = new Vivero();

datosIniciales();

function datosIniciales() {
  oVivero.altaArbol(new Perenne(oVivero.siguienteCodigoArbol(), 100, "Olivo", true));
  oVivero.altaArbol(new Caduco(oVivero.siguienteCodigoArbol(), 78, "Melocotonero", "abril"));
  oVivero.altaArbol(new Perenne(oVivero.siguienteCodigoArbol(), 50, "Ciprés", false));
  oVivero.altaArbol(new Perenne(oVivero.siguienteCodigoArbol(), 75, "Pino piñonero", true));
  oVivero.altaArbol(new Caduco(oVivero.siguienteCodigoArbol(), 81, "Melocotonero", "abril"));
  oVivero.altaArbol(new Caduco(oVivero.siguienteCodigoArbol(), 110, "Manzano", "mayo"));
  oVivero.altaArbol(new Perenne(oVivero.siguienteCodigoArbol(), 80, "Cedro", false));
  oVivero.altaArbol(new Caduco(oVivero.siguienteCodigoArbol(), 67, "Naranjo", "marzo"));
  oVivero.altaArbol(new Perenne(oVivero.siguienteCodigoArbol(), 90, "Alcornoque", true));
  oVivero.altaArbol(new Caduco(oVivero.siguienteCodigoArbol(), 70, "Peral", "marzo"));
}

// Gestión de formularios
function gestionFormularios(sFormularioVisible) {
  ocultarTodosLosFormularios();

  // Hacemos visible el formulario que llega como parámetro
  switch (sFormularioVisible) {
    case "frmAltaArbol":
      frmAltaArbol.style.display = "block";
      break;
    case "frmTallaje":
      frmTallaje.style.display = "block";
      break;
    case "frmListadoPerennes":
      frmListadoPerennes.style.display = "block";
      break;
    case "frmListadoCaducos":
      frmListadoCaducos.style.display = "block";
      break;
    case "TotalArboles":
      alert("Hay " + oVivero.totalArbolesVenta() + " árboles a la venta");
      break;
  }
}

function mostrarAltaArbol() {
  ocultarTodosLosFormularios();

  // Hacemos visible el formulario
  frmAltaArbol.style.display = "block";
}

function ocultarTodosLosFormularios() {
  let oFormularios = document.querySelectorAll("form");

  for (let i = 0; i < oFormularios.length; i++) {
    oFormularios[i].style.display = "none";
  }
}

// aceptarAltaArbol
function aceptarAltaArbol() {
  let iTallaje = parseInt(frmAltaArbol.txtTallaje.value.trim());
  let sEspecie = frmAltaArbol.txtEspecie.value.trim();
  let sMesFloracion = frmAltaArbol.txtMesFloracion.value.trim();
  let sFrutal = frmAltaArbol.rbtFrutal.value;
  let bFrutal = sFrutal == "S" ? true : false;
  let oArbol;

  if (
    isNaN(iTallaje) ||
    sEspecie.length == 0 ||
    (frmAltaArbol.rbtTipoArbol.value == "caduco" && sMesFloracion.length == 0)
  ) {
    alert("Faltan datos por rellenar");
  } else {
    // Continuo con el alta del árbol
    let iCodigo = oVivero.siguienteCodigoArbol();
    if (frmAltaArbol.rbtTipoArbol.value == "caduco") {
      oArbol = new Caduco(iCodigo, iTallaje, sEspecie, sMesFloracion);
    } else {
      oArbol = new Perenne(iCodigo, iTallaje, sEspecie, bFrutal);
    }

    // Insertar el nuevo árbol
    if (oVivero.altaArbol(oArbol)) {
      alert("Arbol registrado OK");
      frmAltaArbol.reset(); // Vaciamos los campos del formulario
      frmAltaArbol.style.display = "none";
    } else {
      alert("Arbol registrado previamente");
    }
  }
}

function aceptarTallaje() {
  let iCodigo = parseInt(frmTallaje.txtCodigoArbol.value.trim());
  let iTallaje = parseInt(frmTallaje.txtTallajeArbol.value.trim());

  if (isNaN(iCodigo) || isNaN(iTallaje)) {
    alert("Faltan datos por rellenar");
  } else {
    // Continuo con el registro del tallaje
    let sRespuesta = oVivero.tallajeArbol(iCodigo, iTallaje);

    alert(sRespuesta);

    if (sRespuesta.includes("Correcto") > 0) {
      frmTallaje.reset();
      frmTallaje.style.display = "none";
    }
  }
}

function aceptarListadoPerennes() {
  let iAlturaMinima = parseInt(frmListadoPerennes.txtAlturaMinima.value.trim());
  let sListado = oVivero.listadoPerennes(iAlturaMinima);

  let oVentana = open("", "_blank", "");

  oVentana.document.open();
  oVentana.document.write(
    "<h1>Listado de árboles perennes de altura mínima: " + iAlturaMinima + " cm</h1>"
  );
  oVentana.document.write(sListado);
  oVentana.document.close();
  oVentana.document.title = "Listado perennes";

  // Reseteamos y ocultamos el formulario
  frmListadoPerennes.reset();
  frmListadoPerennes.style.display = "none";
}

function aceptarListadoCaducos() {
  let sMesFloracion = frmListadoCaducos.txtMesListado.value.trim();
  let sListado = oVivero.listadoCaducos(sMesFloracion);

  let oVentana = open("", "_blank", "");

  oVentana.document.open();
  oVentana.document.write(
    "<h1>Listado de árboles caducos con floración el mes: " + sMesFloracion + "</h1>"
  );
  oVentana.document.write(sListado);
  oVentana.document.close();
  oVentana.document.title = "Listado caducos";

  // Reseteamos y ocultamos el formulario
  frmListadoCaducos.reset();
  frmListadoCaducos.style.display = "none";
}
