document.getElementById("recuperarDatos").addEventListener("click", recuperarDatos);

function recuperarDatos() {
  const url = "alumnos.json";
  fetch(url)
    .then((res) => res.json())
    .then((objRespuesta) => objRespuesta.alumnos) // Acceder a la propiedad "alumnos"
    .then((alumnos) => mostrarAlumnos(alumnos)); // Pasar el objeto de alumnos a la función mostrarAlumnos
}

function mostrarAlumnos(alumnos) {
  const capaSalida = document.getElementById("salida");
  let salida = "";
  // Iterar sobre las claves del objeto alumnos
  Object.keys(alumnos).forEach((clave) => {
    const alumno = alumnos[clave]; // Obtener el objeto alumno usando la clave
    salida += clave + "  "; // Agregar la clave del alumno
    salida += JSON.stringify(alumno.id) + "  "; // Agregar el id
    salida += JSON.stringify(alumno.nombre) + "  "; // Agregar el nombre
    salida += JSON.stringify(alumno.apellidos) + "  "; // Agregar los apellidos
    salida += JSON.stringify(alumno.edad) + "<br>"; // Agregar la edad
  });
  capaSalida.innerHTML = salida;
}