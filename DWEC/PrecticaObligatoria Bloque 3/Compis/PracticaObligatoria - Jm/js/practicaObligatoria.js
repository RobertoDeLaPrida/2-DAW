
let comerciales = [];
let clientes = [];
let categorias = [];
let catalogo = new Catalogo();
let gestor;

const url = "https://practica-obligatoria-b745e-default-rtdb.europe-west1.firebasedatabase.app/";

function CargarDatosIniciales() {
    fetch(url + ".json")
        .then((response) => response.json())
        .then((data) => {
            console.log("Datos recibidos:", data);

            añadirComerciales(data.comerciales);
            añadirClientes(data.clientes);
            añadirCategorias(data.categorias);
            añadirProductos(data.productos);

            gestor = new Gestor(categorias, comerciales, clientes);
            gestor.comercialActual = 0;
            gestor.clienteActual = 0;


            CargarComerciales();
            CargarClientes();
            CargarCategorias();
            CargarProductos();


            document.getElementById("btnGestionCategorias").addEventListener("click", CRUD_Categorias);

            document.getElementById("btnGestionProductos").addEventListener("click", CRUD_Productos);

            document.getElementById("btnGestionComerciales").addEventListener("click", CRUD_Comerciales);

            document.getElementById("btnGestionClientes").addEventListener("click", CRUD_Clientes);
        });
}
CargarDatosIniciales();


let selectComerciales = document.frmComercial.comerciales;
let selectCategorias = document.frmControles.categorias;
let selectProductos = document.frmControles.productos;


function añadirComerciales(data) {
    for (let id in data) {
        comerciales.push(data[id]);
    }

}
function añadirClientes(data) {
    for (let id in data) {
        clientes.push(data[id]);
    }
}
function añadirCategorias(data) {
    for (let id in data) {
        categorias.push(data[id]);
    }
}
function añadirProductos(data) {
    for (let id in data) {
        catalogo.addProducto(data[id].idProducto, data[id].nombreProducto, data[id].precioUnidad, data[id].idCategoria);
    }
}



function CargarComerciales() {
    selectComerciales.innerHTML = "";
    for (let comercial of gestor.comerciales) {
        let option = document.createElement("option");
        option.value = gestor.comerciales.indexOf(comercial);
        option.textContent = comercial;
        selectComerciales.appendChild(option);
    }
    selectComerciales.addEventListener("change", function () {
        gestor.comercialActual = this.value;
        CargarClientes();
        CRUD_Clientes();
    });
}

function CargarCategorias() {
    selectCategorias.innerHTML = "";
    for (let categoria of gestor.categorias) {
        let option = document.createElement("option");
        option.value = gestor.categorias.indexOf(categoria);
        option.textContent = categoria;
        selectCategorias.appendChild(option);
    }
    selectCategorias.addEventListener("change", function () {
        CargarProductos();
    });
}

function CargarProductos() {
    selectProductos.innerHTML = "";
    for (let producto of catalogo.productos) {
        if (producto.idCategoria == selectCategorias.selectedIndex) {
            let option = document.createElement("option");
            option.value = producto.idProducto;
            option.textContent = producto.nombreProducto;
            selectProductos.appendChild(option);
        }
    }
}

function CargarClientes() {
    let divClientes = document.getElementById("clientes");

    let clientes = gestor.clientes[gestor.comercialActual];


    let divAnterior = document.querySelectorAll(".cliente");
    for (let divCliente of divAnterior) {
        divCliente.remove();
    }

    for (let cliente of clientes) {
        let div = document.createElement("div");
        div.textContent = cliente.nombre;
        div.className = "cliente pagado";
        divClientes.appendChild(div);
    }
}

function BorrarFormulariosCRUD() {
    let divCRUD = document.getElementById("formularios");
    let formularios = divCRUD.querySelectorAll("form");
    for (let formulario of formularios) {
        formulario.remove();
    }
}

function CRUD_Categorias() {

    BorrarFormulariosCRUD();
    let divCRUD = document.getElementById("formularios");
    async function buscarClaveCategoria(categoriaBuscada) {
        const fichero = "categorias.json";
        let response = await fetch(url + fichero);
        if (response.ok) {
            let data = await response.json();
            for (let clave in data) {
                if (data[clave] == categoriaBuscada) {
                    return clave;
                }
            }
        }
        return null;
    }

        let frmNuevaCategoria = document.createElement("form");
        frmNuevaCategoria.id = "frmNuevaCategoria";
        frmNuevaCategoria.name = "frmNuevaCategoria";
        let labelNuevaCategoria = document.createElement("label");
        labelNuevaCategoria.innerHTML = "<h4>Nueva categoría:</h4>";
        let inputNuevaCategoria = document.createElement("input");
        inputNuevaCategoria.type = "text";
        inputNuevaCategoria.id = "txtNuevaCategoria";
        inputNuevaCategoria.placeholder = "Nombre de la categoría";
        let brNuevaCategoria = document.createElement("br");
        let inputSubmitNuevaCategoria = document.createElement("input");
        inputSubmitNuevaCategoria.type = "submit";
        inputSubmitNuevaCategoria.value = "Guardar";
        inputSubmitNuevaCategoria.addEventListener("click", GuardarNuevaCategoria);
        let hrNuevaCategoria = document.createElement("hr");
        frmNuevaCategoria.appendChild(labelNuevaCategoria);
        frmNuevaCategoria.appendChild(inputNuevaCategoria);
        frmNuevaCategoria.appendChild(brNuevaCategoria);
        frmNuevaCategoria.appendChild(inputSubmitNuevaCategoria);
        frmNuevaCategoria.appendChild(hrNuevaCategoria);
        divCRUD.appendChild(frmNuevaCategoria);

        async function GuardarNuevaCategoria(event) {
            event.preventDefault();
            const nuevaCategoria = document.getElementById("txtNuevaCategoria").value.trim();
            const fichero = "categorias.json"; 
            const clave = await buscarClaveCategoria(nuevaCategoria);
            if (clave == null) {
                fetch(url + fichero, {
                    method: "POST",
                    body: JSON.stringify(nuevaCategoria),
                })
                .then((response) => response.json())
                .then(console.log);

                gestor.categorias.push(nuevaCategoria);

                setTimeout(CargarCategorias, 800);
                setTimeout(CRUD_Categorias, 800);

                alert("Categoría " + nuevaCategoria + " añadida");
            } else {
                alert("La categoría ya existe");
            }
        }

        let formActualizarCategoria = document.createElement("form");
        formActualizarCategoria.id = "frmActualizarCategoria";
        formActualizarCategoria.name = "frmActualizarCategoria";
        let labelActualizarCategoria = document.createElement("label");
        labelActualizarCategoria.innerHTML = "<h4>Actualizar categoría:</h4>";
        let selectCategoria = document.createElement("select");
        selectCategoria.name = "categorias";

        for (let categoria of gestor.categorias) {
            let option = document.createElement("option");
            option.value = gestor.categorias.indexOf(categoria);
            option.textContent = categoria;
            selectCategoria.appendChild(option);
        }
        let brActualizarCategoria = document.createElement("br");
        let labelActualizarCategoria2 = document.createElement("label");
        labelActualizarCategoria2.innerHTML = "<h4>Cambios:</h4>";
        let inputActualizarCategoria = document.createElement("input");
        inputActualizarCategoria.type = "text";
        inputActualizarCategoria.id = "txtActualizarCategoria";
        inputActualizarCategoria.placeholder = "Nombre de la categoría";
        let brActualizarCategoria2 = document.createElement("br");
        let inputSubmitActualizarCategoria = document.createElement("input");
        inputSubmitActualizarCategoria.type = "submit";
        inputSubmitActualizarCategoria.value = "Actualizar";
        inputSubmitActualizarCategoria.addEventListener("click", ActualizarCategoria);
        let hrActualizarCategoria = document.createElement("hr");

        let inputSubmitBorrarCategoria = document.createElement("input");
        inputSubmitBorrarCategoria.type = "submit";
        inputSubmitBorrarCategoria.value = "Borrar";
        inputSubmitBorrarCategoria.addEventListener("click", BorrarCategoria);

        formActualizarCategoria.appendChild(labelActualizarCategoria);
        formActualizarCategoria.appendChild(selectCategoria);
        formActualizarCategoria.appendChild(inputSubmitBorrarCategoria);
        formActualizarCategoria.appendChild(brActualizarCategoria);
        formActualizarCategoria.appendChild(labelActualizarCategoria2);
        formActualizarCategoria.appendChild(inputActualizarCategoria);
        formActualizarCategoria.appendChild(brActualizarCategoria2);
        formActualizarCategoria.appendChild(inputSubmitActualizarCategoria);
        formActualizarCategoria.appendChild(hrActualizarCategoria);
        divCRUD.appendChild(formActualizarCategoria);


        async function ActualizarCategoria(event) {
            event.preventDefault();
            const categoriaVieja = gestor.categorias[selectCategoria.selectedIndex];
            const categoriaNueva = document.getElementById("txtActualizarCategoria").value.trim();
            const clave = await buscarClaveCategoria(categoriaVieja);
            const fichero = "categorias/"+clave+".json";
            fetch(url + fichero, {
                method: "PUT", 
                body: JSON.stringify(categoriaNueva),
            })
            .then((response) => response.json())
            .then(console.log)
            .catch(console.log);
            

            gestor.categorias[selectCategoria.selectedIndex] = categoriaNueva;


            setTimeout(CargarCategorias, 800); 
            setTimeout(CRUD_Categorias, 800); 

            alert("Categoría " + categoriaVieja + " actualizada a " + categoriaNueva);
        }

        
        async function BorrarCategoria(event) {
            event.preventDefault();
            const borrarCategoria = gestor.categorias[selectCategoria.selectedIndex];
            const clave = await buscarClaveCategoria(borrarCategoria);
            const fichero = "categorias/"+clave+".json";

            fetch(url + fichero, {
                method: "DELETE", 
            })
            .then((response) => response.json())
            .then(console.log) 
            .catch(console.log);
            
            gestor.categorias.splice(selectCategoria.selectedIndex, 1);

            setTimeout(CargarCategorias, 800);
            setTimeout(CRUD_Categorias, 800);

            alert("Categoría " + borrarCategoria + " borrada");
        }
}

function CRUD_Productos() {
    BorrarFormulariosCRUD();

    let divCRUD = document.getElementById("formularios");

    async function buscarClaveProducto(productoBuscado) {
        const fichero = "productos.json";
        let response = await fetch(url + fichero);
        if (response.ok) {
            let data = await response.json();
            for (let clave in data) {
                if (data[clave].nombreProducto == productoBuscado) {
                    return clave;
                }
            }
        }
        return null;
    }

        let frmNuevoProducto = document.createElement("form");
        frmNuevoProducto.id = "frmNuevoProducto";
        frmNuevoProducto.name = "frmNuevoProducto";
        let labelNuevoProducto = document.createElement("label");
        labelNuevoProducto.innerHTML = "<h4>Nuevo producto:</h4>";
        let selectCategoriasNuevoProducto = document.createElement("select");
        selectCategoriasNuevoProducto.name = "categorias";
        for (let categoria of gestor.categorias) {
            let option = document.createElement("option");
            option.value = gestor.categorias.indexOf(categoria);
            option.textContent = categoria;
            selectCategoriasNuevoProducto.appendChild(option);
        }
        let brNuevoProducto = document.createElement("br");
        let inputNuevoProducto = document.createElement("input");
        inputNuevoProducto.type = "text";
        inputNuevoProducto.id = "txtNuevoProducto";
        inputNuevoProducto.placeholder = "Nombre del producto";
        let inputPrecioUnidad = document.createElement("input");
        inputPrecioUnidad.type = "number";
        inputPrecioUnidad.id = "txtPrecioUnidad";
        inputPrecioUnidad.placeholder = "Precio por unidad";
        let brNuevoProducto2 = document.createElement("br");
        let inputSubmitNuevoProducto = document.createElement("input");
        inputSubmitNuevoProducto.type = "submit";
        inputSubmitNuevoProducto.value = "Guardar";
        inputSubmitNuevoProducto.addEventListener("click", GuardarNuevoProducto);
        let hrNuevoProducto = document.createElement("hr");
        frmNuevoProducto.appendChild(labelNuevoProducto);
        frmNuevoProducto.appendChild(selectCategoriasNuevoProducto);
        frmNuevoProducto.appendChild(brNuevoProducto);
        frmNuevoProducto.appendChild(inputNuevoProducto);
        frmNuevoProducto.appendChild(inputPrecioUnidad);
        frmNuevoProducto.appendChild(brNuevoProducto2);
        frmNuevoProducto.appendChild(inputSubmitNuevoProducto);
        frmNuevoProducto.appendChild(hrNuevoProducto);
        divCRUD.appendChild(frmNuevoProducto);

        async function GuardarNuevoProducto(event) {
            event.preventDefault();
            const nuevaCategoria = selectCategoriasNuevoProducto.selectedIndex;
            const nuevoProducto = document.getElementById("txtNuevoProducto").value.trim();
            const idProducto = catalogo.productos.length;
            const precioUnidad = document.getElementById("txtPrecioUnidad").value;
            const idCategoria = nuevaCategoria;
            const fichero = "productos.json";
            const clave = await buscarClaveProducto(nuevoProducto);
            if (clave == null) {
                fetch(url + fichero, {
                    method: "POST",
                    body: JSON.stringify({
                        idProducto: idProducto,
                        nombreProducto: nuevoProducto,
                        precioUnidad: precioUnidad,
                        idCategoria: idCategoria,
                    }),
                })
                .then((response) => response.json())
                .then(console.log);
                catalogo.addProducto(idProducto, nuevoProducto, precioUnidad, idCategoria);
                setTimeout(CargarProductos, 800);
                setTimeout(CRUD_Productos, 800);
                alert("Producto " + nuevoProducto + " añadido");
            } else {
                alert("El producto ya existe");
            }
        }
    
        let formActualizarProducto = document.createElement("form");
        formActualizarProducto.id = "frmActualizarProducto";
        formActualizarProducto.name = "frmActualizarProducto";
        let labelActualizarProducto = document.createElement("label");
        labelActualizarProducto.innerHTML = "<h4>Actualizar producto:</h4>";
        let selectProducto = document.createElement("select");
        selectProducto.name = "productos";
        for (let producto of catalogo.productos) {
            let option = document.createElement("option");
            option.value = producto.idProducto;
            option.textContent = producto.nombreProducto;
            selectProducto.appendChild(option);
        }
        let brActualizarProducto = document.createElement("br");
        let labelActualizarProducto2 = document.createElement("label");
        labelActualizarProducto2.innerHTML = "<h4>Cambios:</h4>";
        let selectCategoriasActualizarProducto = document.createElement("select");
        selectCategoriasActualizarProducto.name = "categorias";
        for (let categoria of gestor.categorias) {
            let option = document.createElement("option");
            option.value = gestor.categorias.indexOf(categoria);
            option.textContent = categoria;
            selectCategoriasActualizarProducto.appendChild(option);
        }
        let inputActualizarProducto = document.createElement("input");
        inputActualizarProducto.type = "text";
        inputActualizarProducto.id = "txtActualizarProducto";
        inputActualizarProducto.placeholder = "Nombre del producto";
        let brActualizarProducto2 = document.createElement("br");
        let inputSubmitActualizarProducto = document.createElement("input");
        inputSubmitActualizarProducto.type = "submit";
        inputSubmitActualizarProducto.value = "Actualizar";
        inputSubmitActualizarProducto.addEventListener("click", ActualizarProducto);
        let hrActualizarProducto = document.createElement("hr");

        let inputSubmitBorrarProducto = document.createElement("input");
        inputSubmitBorrarProducto.type = "submit";
        inputSubmitBorrarProducto.value = "Borrar";
        inputSubmitBorrarProducto.addEventListener("click", BorrarProducto);

        formActualizarProducto.appendChild(labelActualizarProducto);
        formActualizarProducto.appendChild(selectProducto);
        formActualizarProducto.appendChild(inputSubmitBorrarProducto);
        formActualizarProducto.appendChild(brActualizarProducto);
        formActualizarProducto.appendChild(labelActualizarProducto2);
        formActualizarProducto.appendChild(selectCategoriasActualizarProducto);
        formActualizarProducto.appendChild(inputActualizarProducto);
        formActualizarProducto.appendChild(brActualizarProducto2);
        formActualizarProducto.appendChild(inputSubmitActualizarProducto);
        formActualizarProducto.appendChild(hrActualizarProducto);
        divCRUD.appendChild(formActualizarProducto);

        async function ActualizarProducto(event) {
            event.preventDefault();
            const productoViejo = catalogo.productos[selectProducto.selectedIndex].nombreProducto;
            const categoriaNueva = selectCategoriasActualizarProducto.selectedIndex;
            const productoNuevo = document.getElementById("txtActualizarProducto").value.trim();
            const clave = await buscarClaveProducto(productoViejo);
            const fichero = "productos/"+clave+".json";
            fetch(url + fichero, {
                method: "PUT",
                body: JSON.stringify({
                    idCategoria: categoriaNueva,
                    nombreProducto: productoNuevo,
                }),
            })
            .then((response) => response.json())
            .then(console.log);
            catalogo.productos[selectProducto.selectedIndex].nombreProducto = productoNuevo;
            catalogo.productos[selectProducto.selectedIndex].idCategoria = categoriaNueva;
            setTimeout(CargarProductos, 800);
            setTimeout(CRUD_Productos, 800);
            alert("Producto " + productoViejo + " actualizado a " + productoNuevo);
        }

        async function BorrarProducto(event) {
            event.preventDefault();
            const borrarProducto = catalogo.productos[selectProducto.selectedIndex].nombreProducto;
            const clave = await buscarClaveProducto(borrarProducto);
            const fichero = "productos/"+clave+".json";

            fetch(url + fichero, {
                method: "DELETE",
            })
            .then((response) => response.json())
            .then(console.log);
            catalogo.productos.splice(selectProducto.selectedIndex, 1);
            setTimeout(CargarProductos, 800);
            setTimeout(CRUD_Productos, 800);
            alert("Producto " + borrarProducto + " borrado");
        }
}

function CRUD_Comerciales() {
    BorrarFormulariosCRUD();
    let divCRUD = document.getElementById("formularios");

    async function buscarClaveComercial(comercialBuscado) {
        const fichero = "comerciales.json";
        let response = await fetch(url + fichero);
        if (response.ok) {
            let data = await response.json();
            for (let clave in data) {
                if (data[clave] == comercialBuscado) {
                    return clave;
                }
            }
        }
        return null;
    }

    async function buscarClaveCliente(clienteBuscado) {
        const fichero = "clientes.json";
        let response = await fetch(url + fichero);
        if (response.ok) {
            let data = await response.json();
            for (let clave in data) {
                if (data[clave] == clienteBuscado) {
                    return clave;
                }
            }
        }
        return null;
    }

    async function buscarPorIdComercial(idComercial) {
        const fichero = "clientes.json";
        let response = await fetch(url + fichero);
        if (response.ok) {
            let data = await response.json();
            return Object.keys(data)[idComercial];
        }
        return null;
    }

        let frmNuevoComercial = document.createElement("form");
        frmNuevoComercial.id = "frmNuevoComercial";
        frmNuevoComercial.name = "frmNuevoComercial";
        let labelNuevoComercial = document.createElement("label");
        labelNuevoComercial.innerHTML = "<h4>Nuevo comercial:</h4>";
        let inputNuevoComercial = document.createElement("input");
        inputNuevoComercial.type = "text";
        inputNuevoComercial.id = "txtNuevoComercial";
        inputNuevoComercial.placeholder = "Nombre del comercial";
        let brNuevoComercial = document.createElement("br");
        let inputSubmitNuevoComercial = document.createElement("input");
        inputSubmitNuevoComercial.type = "submit";
        inputSubmitNuevoComercial.value = "Guardar";
        inputSubmitNuevoComercial.addEventListener("click", GuardarNuevoComercial);
        let hrNuevoComercial = document.createElement("hr");
        frmNuevoComercial.appendChild(labelNuevoComercial);
        frmNuevoComercial.appendChild(inputNuevoComercial);
        frmNuevoComercial.appendChild(brNuevoComercial);
        frmNuevoComercial.appendChild(inputSubmitNuevoComercial);
        frmNuevoComercial.appendChild(hrNuevoComercial);
        divCRUD.appendChild(frmNuevoComercial);

        async function GuardarNuevoComercial(event) {
            event.preventDefault();
            const nuevoComercial = document.getElementById("txtNuevoComercial").value.trim();
            const fichero = "comerciales.json";
            const clave = await buscarClaveComercial(nuevoComercial);
            if (clave == null) {
                fetch(url + fichero, {
                    method: "POST",
                    body: JSON.stringify(nuevoComercial),
                })
                .then((response) => response.json())
                .then(console.log);

                const ficheroClientes = "clientes.json";
                const claveClientes = await buscarClaveCliente("Cliente de ejemplo");
                if (claveClientes == null) {
                    fetch(url + ficheroClientes, {
                        method: "POST",
                        body: JSON.stringify({
                            0: "Cliente de ejemplo",
                        }),
                    })
                    .then((response) => response.json())
                    .then(console.log);
                }
                gestor.comerciales.push(nuevoComercial);
                gestor.clientes[gestor.comerciales.length - 1] = ["Cliente de ejemplo"];
                setTimeout(CargarComerciales, 800);
                setTimeout(CRUD_Comerciales, 800);
                alert("Comercial " + nuevoComercial + " añadido");
            } else {
                alert("El comercial ya existe");
            }
        }

        let formActualizarComercial = document.createElement("form");
        formActualizarComercial.id = "frmActualizarComercial";
        formActualizarComercial.name = "frmActualizarComercial";
        let labelActualizarComercial = document.createElement("label");
        labelActualizarComercial.innerHTML = "<h4>Actualizar comercial:</h4>";
        let selectActualizarComercial = document.createElement("select");
        selectActualizarComercial.name = "comerciales";
        for (let comercial of gestor.comerciales) {
            let option = document.createElement("option");
            option.value = gestor.comerciales.indexOf(comercial);
            option.textContent = comercial;
            selectActualizarComercial.appendChild(option);
        }
        let brActualizarComercial = document.createElement("br");
        let labelActualizarComercial2 = document.createElement("label");
        labelActualizarComercial2.innerHTML = "<h4>Cambios:</h4>";
        let inputActualizarComercial = document.createElement("input");
        inputActualizarComercial.type = "text";
        inputActualizarComercial.id = "txtActualizarComercial";
        inputActualizarComercial.placeholder = "Nombre del comercial";
        let brActualizarComercial2 = document.createElement("br");
        let inputSubmitActualizarComercial = document.createElement("input");
        inputSubmitActualizarComercial.type = "submit";
        inputSubmitActualizarComercial.value = "Actualizar";
        inputSubmitActualizarComercial.addEventListener("click", ActualizarComercial);
        let hrActualizarComercial = document.createElement("hr");

        let inputSubmitBorrarComercial = document.createElement("input");
        inputSubmitBorrarComercial.type = "submit";
        inputSubmitBorrarComercial.value = "Borrar";
        inputSubmitBorrarComercial.addEventListener("click", BorrarComercial);
        formActualizarComercial.appendChild(labelActualizarComercial);
        formActualizarComercial.appendChild(selectActualizarComercial);
        formActualizarComercial.appendChild(inputSubmitBorrarComercial);
        formActualizarComercial.appendChild(brActualizarComercial);
        formActualizarComercial.appendChild(labelActualizarComercial2);
        formActualizarComercial.appendChild(inputActualizarComercial);
        formActualizarComercial.appendChild(brActualizarComercial2);
        formActualizarComercial.appendChild(inputSubmitActualizarComercial);
        formActualizarComercial.appendChild(hrActualizarComercial);
        divCRUD.appendChild(formActualizarComercial);

        async function ActualizarComercial(event) {
            event.preventDefault();
            const comercialViejo = gestor.comerciales[selectActualizarComercial.selectedIndex];
            const comercialNuevo = document.getElementById("txtActualizarComercial").value.trim();
            const clave = await buscarClaveComercial(comercialViejo);
            const fichero = "comerciales/"+clave+".json";
            fetch(url + fichero, {
                method: "PUT",
                body: JSON.stringify(comercialNuevo),
            })
            .then((response) => response.json())
            .then(console.log);
            gestor.comerciales[selectActualizarComercial.selectedIndex] = comercialNuevo;
            setTimeout(CargarComerciales, 800);
            setTimeout(CRUD_Comerciales, 800);
            alert("Comercial " + comercialViejo + " actualizado a " + comercialNuevo);
        }

        async function BorrarComercial(event) {
            event.preventDefault();
            const borrarComercial = gestor.comerciales[selectActualizarComercial.selectedIndex];
            const clave = await buscarClaveComercial(borrarComercial);
            const fichero = "comerciales/"+clave+".json";

            fetch(url + fichero, {
                method: "DELETE",
            })
            .then((response) => response.json())
            .then(console.log);

            const ficheroClientes = "clientes.json";
            const idComercial = selectActualizarComercial.selectedIndex;
            const claveClientes = await buscarPorIdComercial(idComercial);
            const ficheroClientesBorrar = "clientes/"+claveClientes+".json";
            fetch(url + ficheroClientesBorrar, {
                method: "DELETE",
            })
            .then((response) => response.json())
            .then(console.log);

            gestor.comerciales.splice(selectActualizarComercial.selectedIndex, 1);
            setTimeout(CargarComerciales, 800);
            setTimeout(CRUD_Comerciales, 800);
            alert("Comercial " + borrarComercial + " borrado");
        }
}

function CRUD_Clientes() {
    BorrarFormulariosCRUD();

    let divCRUD = document.getElementById("formularios");

    async function buscarClaveCliente(clienteBuscado) {
        const fichero = "clientes.json";
        let response = await fetch(url + fichero);
        if (response.ok) {
            let data = await response.json();
            for (let clave in data) {
                if (data[clave] == clienteBuscado) {
                    return clave;
                }
            }
        }
        return null;
    }

    async function buscarPorIdComercial(idComercial) {
        const fichero = "clientes.json";
        let response = await fetch(url + fichero);
        if (response.ok) {
            let data = await response.json();
            return Object.keys(data)[idComercial];
        }
        return null;
    }

    async function buscarPorIdCliente(idCliente) {
        const clave = await buscarPorIdComercial(gestor.comercialActual);
        const fichero = "clientes/"+clave+".json";
        let response = await fetch(url + fichero);
        if (response.ok) {
            let data = await response.json();
            return data[idCliente];
        }
        return null;
    }

        let frmNuevoCliente = document.createElement("form");
        frmNuevoCliente.id = "frmNuevoCliente";
        frmNuevoCliente.name = "frmNuevoCliente";
        let labelNuevoCliente = document.createElement("label");
        labelNuevoCliente.innerHTML = "<h4>Nuevo cliente:</h4>";
        let selectComercialesNuevoCliente = document.createElement("select");
        selectComercialesNuevoCliente.name = "comerciales";
        for (let comercial of gestor.comerciales) {
            let option = document.createElement("option");
            option.value = gestor.comerciales.indexOf(comercial);
            option.textContent = comercial;
            selectComercialesNuevoCliente.appendChild(option);
        }
        let inputNuevoCliente = document.createElement("input");
        inputNuevoCliente.type = "text";
        inputNuevoCliente.id = "txtNuevoCliente";
        inputNuevoCliente.placeholder = "Nombre del cliente";
        let brNuevoCliente = document.createElement("br");
        let inputSubmitNuevoCliente = document.createElement("input");
        inputSubmitNuevoCliente.type = "submit";
        inputSubmitNuevoCliente.value = "Guardar";
        inputSubmitNuevoCliente.addEventListener("click", GuardarNuevoCliente);
        let hrNuevoCliente = document.createElement("hr");
        frmNuevoCliente.appendChild(labelNuevoCliente);
        frmNuevoCliente.appendChild(selectComercialesNuevoCliente);
        frmNuevoCliente.appendChild(inputNuevoCliente);
        frmNuevoCliente.appendChild(brNuevoCliente);
        frmNuevoCliente.appendChild(inputSubmitNuevoCliente);
        frmNuevoCliente.appendChild(hrNuevoCliente);
        divCRUD.appendChild(frmNuevoCliente);

        async function GuardarNuevoCliente(event) {
            event.preventDefault();
            const nuevoCliente = document.getElementById("txtNuevoCliente").value.trim();
            const idComercial = selectComercialesNuevoCliente.selectedIndex;
            const clave = await buscarClaveCliente(nuevoCliente);
            if (clave == null) {
                const claveClientes = await buscarPorIdComercial(idComercial);
                const fichero = "clientes/"+claveClientes+".json";
                console.log(fichero);
                let response = await fetch(url + fichero);
                let data = await response.json();
                let clientes = data;
                clientes.push(nuevoCliente);
                fetch(url + fichero, {
                    method: "PUT",
                    body: JSON.stringify(clientes),
                })
                .then((response) => response.json())
                .then(console.log);

                const clienteNuevo = new Cliente(nuevoCliente);
                gestor.clientes[idComercial].push(clienteNuevo);
                setTimeout(CargarClientes, 800);
                setTimeout(CRUD_Clientes, 800);
                alert("Cliente " + nuevoCliente + " añadido");
            } else {
                alert("El cliente ya existe");
            }
        }

        let formActualizarCliente = document.createElement("form");
        formActualizarCliente.id = "frmActualizarCliente";
        formActualizarCliente.name = "frmActualizarCliente";
        let labelActualizarCliente = document.createElement("label");
        labelActualizarCliente.innerHTML = "<h4>Actualizar cliente:</h4>";
        let selectActualizarCliente = document.createElement("select");
        selectActualizarCliente.name = "clientes";
        for (let cliente of gestor.clientes[gestor.comercialActual]) {
            let option = document.createElement("option");
            option.value = gestor.clientes[gestor.comercialActual].indexOf(cliente);
            option.textContent = cliente.nombre;
            selectActualizarCliente.appendChild(option);
        }
        let brActualizarCliente = document.createElement("br");
        let labelActualizarCliente2 = document.createElement("label");
        labelActualizarCliente2.innerHTML = "<h4>Cambios:</h4>";
        let selectComercialesActualizarCliente = document.createElement("select");
        selectComercialesActualizarCliente.name = "comerciales";
        for (let comercial of gestor.comerciales) {
            let option = document.createElement("option");
            option.value = gestor.comerciales.indexOf(comercial);
            option.textContent = comercial;
            selectComercialesActualizarCliente.appendChild(option);
        }
        let inputActualizarCliente = document.createElement("input");
        inputActualizarCliente.type = "text";
        inputActualizarCliente.id = "txtActualizarCliente";
        inputActualizarCliente.placeholder = "Nombre del cliente";
        let brActualizarCliente2 = document.createElement("br");
        let inputSubmitActualizarCliente = document.createElement("input");
        inputSubmitActualizarCliente.type = "submit";
        inputSubmitActualizarCliente.value = "Actualizar";
        inputSubmitActualizarCliente.addEventListener("click", ActualizarCliente);
        let hrActualizarCliente = document.createElement("hr");

        let inputSubmitBorrarCliente = document.createElement("input");
        inputSubmitBorrarCliente.type = "submit";
        inputSubmitBorrarCliente.value = "Borrar";
        inputSubmitBorrarCliente.addEventListener("click", BorrarCliente);

        formActualizarCliente.appendChild(labelActualizarCliente);
        formActualizarCliente.appendChild(selectActualizarCliente);
        formActualizarCliente.appendChild(inputSubmitBorrarCliente);
        formActualizarCliente.appendChild(brActualizarCliente);
        formActualizarCliente.appendChild(labelActualizarCliente2);
        formActualizarCliente.appendChild(selectComercialesActualizarCliente);
        formActualizarCliente.appendChild(inputActualizarCliente);
        formActualizarCliente.appendChild(brActualizarCliente2);
        formActualizarCliente.appendChild(inputSubmitActualizarCliente);
        formActualizarCliente.appendChild(hrActualizarCliente);
        divCRUD.appendChild(formActualizarCliente);

        async function ActualizarCliente(event) {
            event.preventDefault();
            for (let comercial in gestor.clientes) {
                for (let cliente of gestor.clientes[comercial]) {
                    if (cliente.nombre == selectActualizarCliente.value) {
                        const clienteViejo = cliente;
                        const clienteNuevo = document.getElementById("txtActualizarCliente").value.trim();
                        const comercialNuevo = selectComercialesActualizarCliente.selectedIndex;
                        const clave = await buscarClaveCliente(clienteViejo);
                        const fichero = "clientes/"+clave+".json";
                        fetch(url + fichero, {
                            method: "PUT",
                            body: JSON.stringify({
                                nombre: clienteNuevo,
                                idComercial: comercialNuevo,
                            }),
                        })
                        .then((response) => response.json())
                        .then(console.log);
                        cliente.nombre = clienteNuevo;
                        cliente.idComercial = comercialNuevo;
                        setTimeout(CargarClientes, 800);
                        setTimeout(CRUD_Clientes, 800);
                        alert("Cliente " + clienteViejo.nombre + " actualizado a " + clienteNuevo);
                    }
                }
            }
        }

    async function BorrarCliente(event) {
        event.preventDefault();
        const idBorrarCliente = selectActualizarCliente.value;
        const clave = await buscarPorIdCliente(idBorrarCliente);
        if (clave != null) {
            const claveLista = await buscarPorIdComercial(gestor.comercialActual);
            const fichero = "clientes/"+claveLista+"/"+idBorrarCliente+".json";
            console.log(url + fichero)
            fetch(url + fichero, {
                method: "DELETE",
            })
            gestor.clientes[gestor.comercialActual].splice(selectActualizarCliente.selectedIndex, 1);
            setTimeout(CargarClientes, 800);
            setTimeout(CRUD_Clientes, 800);
            alert("Cliente " + idBorrarCliente + " borrado");
        }

    }
}