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
  let marca = frmAltaCatalogo.txtMarca.value.trim();
  let modelo = frmAltaCatalogo.txtModelo.value.trim();
  let precio = parseInt(frmAltaCatalogo.txtPrecio.value.trim()); 
  let sdiscoSSD = frmAltaCatalogo.rbtOrdenador.value;
  let discoSSD = sdiscoSSD == "S" ? true : false;
  let pulgadas = frmAltaCatalogo.txtPulgadas.value.trim();
  let tarjetaGrafica = frmAltaCatalogo.txtGrafica.value.trim();
  let oOdenador; 

  if(frmAltaArbol.rbtOrdenador.value == "Sobremesa"){
    oOrdenador = new Sobremesa (marca,modelo,precio,tarjetaGrafica)
  }
  else{
    oOrdenador = new Portatil (marca,modelo,precio,pulgadas,discoSSD)
  }

  if (oOrdenador.altaCatalogo(oOrdenador)) {
    alert("El ordenador se ha registrado ");
    frmAltaArbol.reset(); // Vaciamos los campos del formulario
    frmAltaArbol.style.display = "none";
  } else {
    alert("Ordenador registrado previamente");
  }


}

function aceptarEntradaStock() {
  let marca = frmEntradaStock.txtMarca.value.trim();
  let modelo = frmEntradaStock.txtModelo.value.trim();
  let unidades = parseInt(frmEntradaStock.txtUnidades.value.trim());
  entradaStock()
}

function aceptarSalidaStock() {
  let marca = frmEntradaStock.txtMarca.value.trim();
  let modelo = frmEntradaStock.txtModelo.value.trim();
  let unidades = parseInt(frmEntradaStock.txtUnidades.value.trim());
  salidaStock()
}

function mostrarListadoCatalogo() {

  let oVentana = open("", "_blank", "");

  oVentana.document.open();
  oVentana.document.write(
    "<h1>Listado ordenadores en el catalogo</h1>"
  );
  oVentana.document.write(Tienda.listadoCatalogo());
  oVentana.document.close();
  oVentana.document.title = "Listado catalogo";


}

function mostrarListadoStock() {


  let oVentana = open("", "_blank", "");

  oVentana.document.open();
  oVentana.document.write(
    "<h1>Listado de ordenadores en stock </h1>"
  );
  oVentana.document.write(Tienda.listtadoStock());
  oVentana.document.close();
  oVentana.document.title = "Listado stock";
}

function mostrarTotales() {
  let oVentana = open("", "_blank", "");
  let totalPortatiles = Tienda.numPortatilesStock();
  let totalSobremesa = Tienda.numSobremesaStock();


  oVentana.document.open();
  oVentana.document.write(
    "<h1>Totales</h1>"
  );
  oVentana.document.write("<h2>Total stock portátiles: "+totalPortatiles+"</h2>");
  oVentana.document.write("<h2>Total stock portátiles: "+totalSobremesa+"</h2>");

  oVentana.document.close();
  oVentana.document.title = "Listado catalogo";
}
