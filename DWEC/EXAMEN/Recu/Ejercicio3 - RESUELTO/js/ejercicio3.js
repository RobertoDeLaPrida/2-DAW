const formulario = document.querySelector("form")

formulario.addEventListener("submit", compruebaFormulario);


function compruebaFormulario(event){
    event.preventDefault();

    const regExpMarcaModelo = /^[A-Z]/;
    const regExpFecha = /^\d{2}\-\d{2}\-\d{4}$/;
    const regExpColor = /^\D/;

    let errores = [];
    let vacios = [];
    let hayErrores = false;
    let salida = "";


    const marca = formulario.marca.value.trim();
    const modelo = formulario.modelo.value.trim();
    const fecha = formulario.fechaMatriculacion.value.trim();
    const tipo = formulario.tipoMatricula.value.trim();
    const matricula = formulario.matricula.value.trim();
    const color = formulario.color.value.trim();

    if (marca.length === 0){
        vacios.push("Marca");
        hayErrores = true;
    } else if (!regExpMarcaModelo.test(marca)){
        errores.push("Marca");
        hayErrores = true;
    }
    if (modelo.length === 0){
        vacios.push("Modelo");
        hayErrores = true;
    } else if (!regExpMarcaModelo.test(modelo)){
        errores.push("Modelo");
        hayErrores = true;
    }

    if (fecha.length === 0){
        vacios.push("Fecha matriculación");
        hayErrores = true;
    } else if (!regExpFecha.test(fecha)){
        errores.push("Fecha matriculación");
        hayErrores = true;
    }
    if(color.length === 0){
        vacios.push("Color");
        hayErrores = true;
    } else if (!regExpColor.test(color)){
        errores.push("Color");
        hayErrores = true;
    }
    // console.log(tipo)
    switch(tipo){
        case "actual":
            regExpMatricula = /^[0-9]{4}[A-Z]{3}$/
            break;
        case "antigua":
            regExpMatricula =/[A-Z]{2}\-[0-9]{4}\-[A-Z]{2}$/
            break;
        case "historica":
            regExpMatricula =/^\H[0-9]{4}[A-Z]{3}$/
            break;
    }

    if (matricula.length===0){
        vacios.push("Matricula");
        hayErrores = true;
    } else if (!regExpMatricula.test(matricula)){
        errores.push("Matricula")
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
        console.log("Deberia haberse enviado el formulario")
        formulario.submit()
        return;
    }
    document.getElementById("salida").innerHTML = salida;
}