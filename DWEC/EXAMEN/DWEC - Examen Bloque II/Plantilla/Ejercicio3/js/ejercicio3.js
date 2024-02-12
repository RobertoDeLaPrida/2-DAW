formulario.addEventListener("submit", validarFormulario);

function validarFormulario(event){
    const regExpPrecio = /\d[,|.]\d\d[€]/;
    const regExpHora = /[0-24][:][0-60]/;
    const regExpFecha = /^\d\d\/\d\d\/\d\d\d\d$/;
    const regExpIp = /[0-255][.][0-255][.][0-255][.][0-255]/;
    const regExpColor = /[#]\xdd\xdd\xdd/;

    let errores = [];
    let vacios = [];
    let hayErrores = false;
    let salida = "";

    const precio = formualrio.precio.value.trim()
    const hora = formualrio.hora.value.trim()
    const fecha = formualrio.fecha.value.trim()
    const direccionIp = formualrio.direccionIp.value.trim()
    const color = formualrio.color.value.trim()


    if (precio.length == 0){
        vacios.push("precio");
        hayErrores = true;
    } else if (!regExpPrecio.test(precio)){
        errores.push("precio");
        hayErrores = true;
    }

    if (hora.length == 0){
        vacios.push("hora");
        hayErrores=true;
    } else if (!regExpHora.test(hora)){
        errores.push("hora");
        hayErrores = true;
    }

    if (fecha.length == 0){
        vacios.push("fecha");
        hayErrores=true;
    }   else if (!regExpFecha.test(fecha)) {
        errores.push("fecha");
        hayErrores = true;
    }

    if (direccionIp.length == 0){
        vacios.push("direccionIp");
        hayErrores=true;
    } else if (!regExpIp.test(direccionIp)){
        errores.push("direccionIP");
        hayErrores = true;
    }

    if (color == 0){
        vacios.push("Color Hexadecimal");
        hayErrores=true;
    } else if (!regExpColor.test(color)){
        errores.push("color hexadecimal");
        hayErrores = true;
    }
    


    if (hayErrores) {
        event.preventDefault(); //no me para el evento por que dice que no sabe lo que es formulario
        if (vacios.length > 0) {
          salida += "<h3>CAMPOS VACÍOS:</h3><ul>";
          for (let elem of vacios) {
            salida += "<li>" + elem + "</li>";
          }
          salida += "</ul>";
        }
        if (errores.length > 0) {
          salida += "<h3>CAMPOS CON ERRORES:</h3><ul>";
          for (let elem of errores) {
            salida += "<li>" + elem + "</li>";
          }
          salida += "</ul>";
        }
        document.getElementById("salida").innerHTML = salida;
    }
}