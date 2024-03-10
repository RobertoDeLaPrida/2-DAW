const formulario = document.querySelector('form');

formulario.addEventListener("submit", validarFormulario);

function validarFormulario(event){
    event.preventDefault(); // Detenemos el envío del formulario para procesarlo aquí
    
    const regExpPrecio = /^\d+(\.|,)\d{2}€$/;
    const regExpHora = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    const regExpFecha = /^\d{2}\/\d{2}\/\d{4}$/;
    const regExpIp = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const regExpColor = /^#[0-9A-Fa-f]{6}$/;

    let errores = [];
    let vacios = [];
    let hayErrores = false;
    let salida = "";

    const precio = formulario.precio.value.trim();
    const hora = formulario.hora.value.trim();
    const fecha = formulario.fecha.value.trim();
    const direccionIp = formulario.direccionIP.value.trim();
    const color = formulario.color.value.trim();

    if (precio.length === 0){
        vacios.push("Precio");
        hayErrores = true;
    } else if (!regExpPrecio.test(precio)){
        errores.push("Precio");
        hayErrores = true;
    }

    if (hora.length === 0){
        vacios.push("Hora");
        hayErrores=true;
    } else if (!regExpHora.test(hora)){
        errores.push("Hora");
        hayErrores = true;
    }

    if (fecha.length === 0){
        vacios.push("Fecha");
        hayErrores=true;
    }   else if (!regExpFecha.test(fecha)) {
        errores.push("Fecha");
        hayErrores = true;
    }

    if (direccionIp.length === 0){
        vacios.push("Dirección IP");
        hayErrores=true;
    } else if (!regExpIp.test(direccionIp)){
        errores.push("Dirección IP");
        hayErrores = true;
    }

    if (color.length === 0){
        vacios.push("Color Hexadecimal");
        hayErrores=true;
    } else if (!regExpColor.test(color)){
        errores.push("Color Hexadecimal");
        hayErrores = true;
    }

    if (hayErrores) {
        if (vacios.length > 0) {
          salida += "<h3>CAMPOS VACÍOS:</h3><ul>";
          vacios.forEach(elem => {
            salida += "<li>" + elem + "</li>";
          });
          salida += "</ul>";
        }
        if (errores.length > 0) {
          salida += "<h3>CAMPOS CON ERRORES:</h3><ul>";
          errores.forEach(elem => {
            salida += "<li>" + elem + "</li>";
          });
          salida += "</ul>";
        }
    } else {
        formulario.submit();
        return;
    }
    document.getElementById("salida").innerHTML = salida;
}
