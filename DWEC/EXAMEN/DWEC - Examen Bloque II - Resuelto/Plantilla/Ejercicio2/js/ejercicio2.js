document.getElementById("botonRestaurar").addEventListener("click", () => location.reload());
document.getElementById("botonEjecutar").addEventListener("click", function() {
  // Obtener todos los elementos marcados en el recuadro de origen
  var elementosMarcados = document.querySelectorAll('#origen input[name="seleccionImagen"]:checked');
  
  // Obtener la capa de destino seleccionada
  var capaDestinoSeleccionada = document.querySelector('input[name="destinos"]:checked').parentNode;
  
  // Obtener la operación seleccionada
  var operacion = document.querySelector('input[name="aplicarFuncion"]:checked').value;
  
  // Verificar si se debe clonar la selección
  var clonarSeleccion = document.querySelector('input[name="clonarImagen"]:checked').value === "si";
  
  // Iterar sobre los elementos marcados y moverlos o clonarlos según corresponda
  elementosMarcados.forEach(function(elemento) {
      if (clonarSeleccion) {
          var elementoClonado = elemento.parentElement.cloneNode(true);
          capaDestinoSeleccionada[operacion](elementoClonado);
      } else {
          capaDestinoSeleccionada[operacion](elemento.parentElement);
      }
  });
});
