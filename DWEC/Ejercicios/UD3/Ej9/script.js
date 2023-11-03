function compruebaFecha(){
    fecha1 = new Date(document.getElementById("fecha1").value);
    fecha2 = new Date(document.getElementById("fecha2").value);

    if (fecha1 < fecha2) {
        diferenciaMs=fecha2-fecha1
        diferenciaDias = diferenciaMs / (1000 * 60 * 60 * 24);
        document.getElementById("salida").innerHTML="fecha1 es anterior a fecha2 en "+diferenciaDias+" dias"
    } else if (fecha1 > fecha2) {
        diferenciaMs=fecha1-fecha2
        diferenciaDias = diferenciaMis / (1000 * 60 * 60 * 24);
        document.getElementById("salida").innerHTML="fecha1 es posterior a fecha2 en "+diferenciaDias+" dias"
    } else {
        document.getElementById("salida").innerHTML="fecha1 y fecha2 son iguales"
    }
}