const url = "https://practica-obligatoria-b745e-default-rtdb.europe-west1.firebasedatabase.app/";

let selectCategorias = document.getElementsByName("categorias")[0];
let selectComerciales = document.getElementsByName("comerciales")[0];
let selectProductos = document.getElementsByName("productos")[0];

let selectComercialesClon = document.getElementsByName("comerciales")[1];
let selectCategoriaClon = document.getElementsByName("categorias")[1];
let selectProductoClon = document.getElementsByName("productos")[1];
let selectEditarProductoCategoriaClon = document.getElementsByName("categorias")[2];

let comercialActual = 0;
let categoriaActual = 0;

let divTodosLosClientes = document.createElement("div");
divTodosLosClientes.id = "divClientes";
document.getElementById("clientes").append(divTodosLosClientes);

let botonCategorias = document.getElementById("btnGestionCategorias");
let botonComerciales = document.getElementById("btnGestionComerciales");
let botonProductos = document.getElementById("btnGestionProductos");
let botonClientes = document.getElementById("btnGestionClientes");
botonCategorias.addEventListener("click", mostrarFormulario);
botonComerciales.addEventListener("click", mostrarFormulario);
botonProductos.addEventListener("click", mostrarFormulario);
botonClientes.addEventListener("click", mostrarFormulario);

selectComerciales.addEventListener("change", (event) => {
    comercialActual = parseInt(event.target.value);
    cargarClientes();
});
selectCategorias.addEventListener("change", (event) => {
    categoriaActual = parseInt(event.target.value);
    cargarProductos();
});

let formularioNuevaCategoria = document.getElementById("frmNuevaCategoria");
formularioNuevaCategoria.addEventListener("submit", crearNuevaCategoria);

let formularioBorrarCategoria = document.getElementById("frmBorrarCategoria");
formularioBorrarCategoria.addEventListener("submit", borrarCategoria);
let formularioEditarCategoria = document.getElementById("frmEditarCategoria");
formularioEditarCategoria.addEventListener("submit", editarCategoria);

let formularioNuevoComercial = document.getElementById("frmNuevoComercial");
formularioNuevoComercial.addEventListener("submit", crearNuevoComercial);
let formularioBorrarComercial = document.getElementById("frmBorrarComercial");
formularioBorrarComercial.addEventListener("submit", borrarComercial)
let formularioEditarComercial = document.getElementById("frmEditarComercial");
formularioEditarComercial.addEventListener("submit", editarComercial);

let formularioNuevoCliente = document.getElementById("frmNuevoCliente");
formularioNuevoCliente.addEventListener("submit", crearNuevoCliente);
let formularioBorrarCliente = document.getElementById("frmBorrarCliente");
formularioBorrarCliente.addEventListener("submit", borrarCliente);
let formularioEditarCliente = document.getElementById("frmEditarCliente");
formularioEditarCliente.addEventListener("submit", editarCliente);

let formularioNuevoProducto = document.getElementById("frmNuevoProducto");
formularioNuevoProducto.addEventListener("submit", crearNuevoProducto);
let formularioBorrarProducto = document.getElementById("frmBorrarProducto");
formularioBorrarProducto.addEventListener("submit", borrarProducto);
let formularioEditarProducto = document.getElementById("frmEditarProducto");
formularioEditarProducto.addEventListener("submit", editarProducto);

recuperarDatos();

function recuperarDatos() {
    cargarCategorias();
    cargarProductos();
    cargarClientes();
    cargarComerciales();
}


function cargarCategorias() {
    fetch(url + "categorias.json")
        .then((response) => response.json())
        .then((objetoJson) => {
            añadirCategorias(objetoJson);
        });
}

function cargarProductos() {
    fetch(url + "productos.json")
        .then((response) => response.json())
        .then((data) => {
            añadirProductos(data);
        });
}

function cargarClientes() {
    fetch(url + "clientes.json")
        .then((response) => response.json())
        .then((objetoJson) => {
            añadirClientes(objetoJson);
        });
}

function cargarComerciales() {

    fetch(url + "comerciales.json")
        .then((response) => response.json())
        .then((objetoJson) => {
            añadirComerciales(objetoJson);
        });
}

function añadirComerciales(dataComerciales) {
    limpiarComerciales();
    let comerciales = Object.values(dataComerciales);
    let keys = Object.keys(dataComerciales);
    limpiarComerciales();
    let contador = 0;
    for (let comercial of comerciales) {
        let option = document.createElement("option");
        option.textContent = comercial;
        option.setAttribute("idFirebaseComerciales", keys[contador]);
        option.value = contador;
        selectComerciales.append(option);
        let optionClon = option.cloneNode(true);
        selectComercialesClon.append(optionClon);
        contador++;
    }
}

function añadirCategorias(categorias) {
    limpiarCategorias();
    let contador = 0;
    for (let claveCategoria in categorias) {
        let option = document.createElement("option");
        option.textContent = categorias[claveCategoria];
        option.setAttribute("indiceCategoria", contador);
        option.value = contador;
        selectCategorias.append(option);
        let optionClon = option.cloneNode(true);
        let optionClon2 = option.cloneNode(true);
        selectCategoriaClon.append(optionClon);
        selectEditarProductoCategoriaClon.append(optionClon2);

        contador++;
    }
}

function añadirClientes(dataClientes) {
    limpiarClientes();
    let clientes = Object.values(dataClientes);
    let keyComercialActual = Object.keys(dataClientes)[comercialActual];
    let clientesComercialActual = clientes[comercialActual];
    let contador = 0;
    for (let cliente of clientesComercialActual) {
        let divClientes = document.createElement("div");
        divClientes.textContent = cliente;
        divClientes.classList.add("cliente", "pagado");
        divClientes.setAttribute("idFirebaseCliente", keyComercialActual);
        divClientes.setAttribute("indiceCliente", contador);
        divTodosLosClientes.append(divClientes);
        contador++;
    }
}

function añadirProductos(productos) {
    borrarProductos();
    let contador = 0;
    let arrayProductos = Object.values(productos);
    let arrayProductosCategoriaActual = arrayProductos.filter(producto => producto.idCategoria == categoriaActual);
    let keys = Object.keys(arrayProductosCategoriaActual);
    for (let producto of arrayProductosCategoriaActual) {
        let option = document.createElement("option");
        option.textContent = producto.nombreProducto;
        option.value = producto.idProducto;
        option.setAttribute("idFirebaseCategoria", keys[contador]);
        selectProductos.append(option);
        contador++;
    }
}

function limpiarComerciales() {
    let comercialesOption = document.querySelectorAll('[idfirebasecomerciales]');
    for (let option of comercialesOption) {
        option.remove();
    }
}

function limpiarClientes() {
    let clientes = divTodosLosClientes.querySelectorAll('.cliente')
    for (let cliente of clientes) {
        cliente.remove();
    }
}

function limpiarCategorias() {
    let categoriasOption = document.querySelectorAll('[indiceCategoria]');
    for (let option of categoriasOption) {
        option.remove();
    }
}


function borrarProductos() {
    let productosOption = document.querySelectorAll('[idFirebaseCategoria]');
    for (let option of productosOption) {
        option.remove();
    }
}

function crearNuevaCategoria(event) {
    event.preventDefault();
    let nuevaCategoria = document.getElementById("txtNuevaCategoria").value.trim();
    fetch(url + "categorias.json", {
        method: "POST",
        body: JSON.stringify(nuevaCategoria)
    })
        .then(() => cargarCategorias());
}

function borrarCategoria(event) {
    event.preventDefault();
    let categoriaABorrar = document.getElementById("txtBorrarCategoria").value.trim();
    fetch(url + "categorias.json")
        .then((response) => response.json())
        .then((data) => {
            let keys = Object.keys(data);
            let valores = Object.values(data);
            let indiceABorrar = keys[valores.indexOf(categoriaABorrar)];

            fetch(url + "categorias/" + indiceABorrar + ".json", {
                method: "DELETE"
            })
                .then(() => cargarCategorias())
        });
};

function editarCategoria(event) {
    event.preventDefault();
    let categoriaAEditar = document.getElementById("txtNombreAntiguoCategoria").value.trim();
    let categoriaEditada = document.getElementById("txtNombreNuevoCategoria").value.trim();


    fetch(url + "categorias.json")
        .then(response => response.json())
        .then(data => {

            let categoriaID = Object.keys(data).find(key => data[key] === categoriaAEditar)
            if (categoriaID) {

                let nuevaCategoria = {};
                nuevaCategoria[categoriaID] = categoriaEditada;
                fetch(url + "categorias.json", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify(nuevaCategoria),
                })
                    .then(() => cargarCategorias())
                    .catch(error => console.error("Error al editar la categoría:", error));
            } else {
                alert("La categoría a editar no fue encontrada.");
            }
        })
        .catch(error => console.error("Error al recuperar datos de categorías:", error));
}

function crearNuevoProducto(event) {
    event.preventDefault();
    let idCategoria = parseInt(selectCategoriaClon.value);
    let nombreProducto = document.getElementById("txtNombreProducto").value.trim();
    let precioUnidad = parseFloat(document.getElementById("txtPrecioUnidadProducto").value);
    let productoNuevo = {
        idCategoria: idCategoria,
        idProducto: 0, 
        nombreProducto: nombreProducto,
        precioUnidad: precioUnidad
    };
    fetch(url + "productos.json")
        .then(response => response.json())
        .then(data => {
            let idProducto = Object.keys(data).length + 1;

            productoNuevo.idProducto = idProducto;
            return fetch(url + "productos.json", {
                method: "POST",
                body: JSON.stringify(productoNuevo)
            });
        })
        .then(() => cargarProductos());
}

function borrarProducto(event) {
    event.preventDefault();
    let nombreProductoABorrar = document.getElementById("txtBorrarProducto").value.trim();

    fetch(url + "productos.json")
        .then(response => response.json())
        .then(data => {
            let keys = Object.keys(data);
            let keyFirebaseProducto = keys.find(key => data[key].nombreProducto === nombreProductoABorrar);
            if (keyFirebaseProducto) {
                return fetch(url + "productos/" + keyFirebaseProducto + ".json", {
                    method: "DELETE"
                })
                    .then(() => cargarProductos());
            }
            else
                alert("No se ha encontrado ningún producto llamado" + nombreProductoABorrar);
        }
        )
}

function editarProducto(event) {
    event.preventDefault();
    let nombreProductoAEditar = document.getElementById("txtNombreAntiguoProducto").value.trim();

    let IDCategoriaNuevo = parseInt(selectEditarProductoCategoriaClon.value);
    let nombreNuevo = document.getElementById("txtNombreNuevoProducto").value.trim();
    let precioNuevo = parseFloat(document.getElementById("txtPrecioUnidadProductoNuevo").value.trim());


    fetch(url + "productos.json")
        .then(response => response.json())
        .then(data => {
            let keyFireBase = Object.keys(data).find(key => data[key].nombreProducto === nombreProductoAEditar);
            let idProducto = Object.values(data).find(producto => producto.nombreProducto === nombreProductoAEditar).idProducto;

            if (keyFireBase) {

                let productoNuevo = {
                    idCategoria: IDCategoriaNuevo,
                    idProducto: idProducto,
                    nombreProducto: nombreNuevo,
                    precioUnidad: precioNuevo,
                };

                return fetch(url + "productos/" + keyFireBase + ".json", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify(productoNuevo),
                })
            }

            else
                alert("No se ha encontrado el producto" + nombreAEditar);
        })
        .then(() => cargarProductos());

}

function crearNuevoComercial(event) {
    event.preventDefault();
    let nuevoComercial = document.getElementById("txtNuevoComercial").value.trim();
    let arrayClientes = ["Borrame"];


    fetch(url + "comerciales.json", {
        method: "POST",
        body: JSON.stringify(nuevoComercial)
    })
        .then(() => cargarComerciales()) 
        .then(() => {

            return fetch(url + "clientes.json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(arrayClientes)
            });
        })
}

function borrarComercial(event) {
    event.preventDefault();
    let comercialABorrar = document.getElementById("txtBorrarComercial").value.trim();

    fetch(url + "comerciales.json")
        .then(response => response.json())
        .then(data => {
            let indiceFirebaseComercial = Object.keys(data).find(key => data[key] === comercialABorrar);
            if (indiceFirebaseComercial) {
                fetch(url + "comerciales/" + indiceFirebaseComercial + ".json", {
                    method: "DELETE"
                })
                    .then(() => cargarComerciales());


            }
            else
                alert("El comercial no fue encontadro")
        }



        );
}

function editarComercial(event) {
    event.preventDefault();
    let comercialAEditar = document.getElementById("txtNombreAntiguoComercial").value.trim();
    let comercialEditado = document.getElementById("txtNombreNuevoComercial").value.trim();

    fetch(url + "comerciales.json")
        .then(response => response.json())
        .then(data => {
            let indiceFirebaseComercial = Object.keys(data).find(key => data[key] === comercialAEditar);
            if (indiceFirebaseComercial) {
                let nuevoComercial = {};
                nuevoComercial[indiceFirebaseComercial] = comercialEditado;

                fetch(url + "comerciales.json", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify(nuevoComercial),
                })
                    .then(() => cargarComerciales());
            }
            else
                alert("No se ha encontrado al comercial");
        })
}

function crearNuevoCliente(event) {
    event.preventDefault();
    let IndiceComercialSeleccionado = selectComercialesClon.value;
    let nuevoCliente = document.getElementById("txtNuevoCliente").value.trim();
    fetch(url + "clientes.json")
        .then(response => response.json())
        .then(data => {
            let indiceFireBaseComercial = Object.keys(data)[IndiceComercialSeleccionado];
            let arrayClientes = data[indiceFireBaseComercial];
            if (arrayClientes[0] === "Borrame") { 
                arrayClientes = [];
            }
            arrayClientes.push(nuevoCliente);
            fetch(url + "clientes/" + indiceFireBaseComercial + ".json", {
                method: "PUT",
                body: JSON.stringify(arrayClientes)
            })
                .then(() => cargarClientes())
        });

}

function borrarCliente(event) {
    event.preventDefault();
    let clienteABorrar = document.getElementById("txtBorrarCliente").value.trim();
    let IndiceComercialSeleccionado = selectComercialesClon.value;

    fetch(url + "clientes.json")
        .then(response => response.json())
        .then(data => {
            let indiceFireBaseComercial = Object.keys(data)[IndiceComercialSeleccionado];
            let arrayClientes = data[indiceFireBaseComercial];
            let clienteFireBase = arrayClientes.find(cliente => cliente === clienteABorrar);
            if (clienteFireBase) {
                arrayClientes.splice(arrayClientes.indexOf(clienteFireBase), 1); 
                fetch(url + "clientes/" + indiceFireBaseComercial + ".json", {
                    method: "PUT",
                    body: JSON.stringify(arrayClientes)
                })
                    .then(() => cargarClientes());
            }

            else
                alert("No se encontró al cliente " + clienteABorrar);
        })
}

function editarCliente(event) {
    event.preventDefault();
    let IndiceComercialSeleccionado = selectComercialesClon.value;
    let clienteAEditar = document.getElementById("txtNombreAntiguoCliente").value.trim();
    let clienteEditado = document.getElementById("txtNombreNuevoCliente").value.trim();

    fetch(url + "clientes.json")
        .then(response => response.json())
        .then(data => {
            let indiceFireBaseComercial = Object.keys(data)[IndiceComercialSeleccionado];
            let arrayClientes = data[indiceFireBaseComercial];
            let clienteAEditarFireBase = arrayClientes.find(cliente => cliente === clienteAEditar);

            if (clienteAEditarFireBase)
            {
                arrayClientes[arrayClientes.indexOf(clienteAEditarFireBase)] = clienteEditado; 
                fetch(url + "clientes/" + indiceFireBaseComercial + ".json", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify(arrayClientes),
                })
                    .then(() => cargarClientes());

            }
            else
                alert("No se encontró al cliente " + clienteAEditar);
        })
}


function mostrarFormulario(event) {
    let divCRUDCategorias = document.getElementById("divCRUDCategorias");
    let divCRUDComerciales = document.getElementById("divCRUDComerciales");
    let divCRUDProductos = document.getElementById("divCRUDProductos");
    let divCRUDClientes = document.getElementById("divCRUDClientes");

    switch (event.target.id) {
        case "btnGestionCategorias":
            divCRUDCategorias.style.display = "block";
            divCRUDComerciales.style.display = "none";
            divCRUDProductos.style.display = "none";
            divCRUDClientes.style.display = "none";
            break;
        case "btnGestionComerciales":
            divCRUDCategorias.style.display = "none";
            divCRUDComerciales.style.display = "block";
            divCRUDProductos.style.display = "none";
            divCRUDClientes.style.display = "none";
            break;
        case "btnGestionProductos":
            divCRUDCategorias.style.display = "none";
            divCRUDComerciales.style.display = "none";
            divCRUDProductos.style.display = "block";
            divCRUDClientes.style.display = "none";
            break;
        case "btnGestionClientes":
            divCRUDCategorias.style.display = "none";
            divCRUDComerciales.style.display = "none";
            divCRUDProductos.style.display = "none";
            divCRUDClientes.style.display = "block";
            break;
    }
}

