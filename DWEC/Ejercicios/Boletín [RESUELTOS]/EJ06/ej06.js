let capa = document.getElementById("cuadrado");
let input = document.getElementById("txtEntrada");
capa.addEventListener("mouseenter", cursorDentro);
capa.addEventListener("mouseleave", cursorFuera);
input.addEventListener("keydown", teclaPulsada);

function cursorDentro(event) {
  document.getElementById("cuadrado").classList.add("amarillo");
  document.getElementById("salida").innerHTML =
    event.type +
    " en el " +
    event.currentTarget +
    "<br>Coordenadas: " +
    event.clientX +
    ":" +
    event.clientY;
}

function cursorFuera() {
  document.getElementById("cuadrado").classList.remove("amarillo");
  document.getElementById("salida").innerHTML = "";
}

function teclaPulsada(event) {
  document.getElementById("salida").innerHTML = "Tecla pulsada: " + event.key;
}
