const comerciales = [
  "Carmen Gómez",
  "Lucía Gil",
  "Andrés Martínez",
  "Antonio Salinas",
];
const clientes = [
  [
    "Alimentación Daniel",
    "Cash El Puerto",
    "Ultramarinos Claudia",
    "Supermercado Nazareno",
    "Alimentación Guzmán",
    "Supermercado Superprecio",
    "Kiosko La Espera",
    "M&B Alimentación",
    "Ultramarinos Vistabella",
  ],
  [
    "Ultramarinos La Delicia",
    "Supermercado La Esquinita",
    "Alimentación Gómez",
    "Supermercado El Veloz",
    "Kiosko 24h Desavío",
    "Tienda La Manchega",
    "Ultramarinos Tajo",
    "Alimentación Víctor",
  ],
  [
    "Alimentación Millán",
    "Supermercado La Guinda",
    "Kiosko Callejón",
    "Tienda Cantero",
    "Ultramarinos Mérida",
    "Alimentación Moreno",
    "Cash El Hostelero",
  ],
  [
    "Kiosko La Lumbre",
    "Tienda Abad",
    "Ultramarinos Hernández",
    "Alimentación Cervantes",
    "Cash El Panal",
    "CyR Alimentación",
    "Supermercado Los Mosqueteros",
    "Alimentación Carpanta",
    "Supermercado El Percebe",
  ],
];
const categorias = ["Aceite", "Encurtidos", "Salsas"];

const catalogo = new Catalogo();
const gestor = new Gestor();

function cargaDatosIniciales() {
  catalogo.addProducto(1, "Aceite Oliva Virgen Extra 1l (Caja 20)", 178.15, 0);
  catalogo.addProducto(
    2,
    "Aceite Oliva Virgen Extra 700ml (Caja 30)",
    208.5,
    0
  );
  catalogo.addProducto(3, "Aceite Oliva Virgen Extra 5l (Caja 6)", 247.5, 0);
  catalogo.addProducto(4, "Aceite Oliva 1l (Caja 20)", 109.25, 0);
  catalogo.addProducto(5, "Aceituna Gordal 340gr (Caja de 50)", 180.75, 1);
  catalogo.addProducto(
    6,
    "Aceituna Gordal deshuesada 350gr (Caja de 50)",
    205.45,
    1
  );
  catalogo.addProducto(7, "Aceituna Manzanilla 250 gr (Caja de 50)", 124.85, 1);
  catalogo.addProducto(
    8,
    "Aceituna Manzanilla deshuesada 250 gr (Caja de 50)",
    141.35,
    1
  );
  catalogo.addProducto(9, "Aceituna Negra 350gr (Caja de 50)", 87.5, 1);
  catalogo.addProducto(
    10,
    "Aceituna Negra deshuesada 350gr (Caja de 50)",
    99.35,
    1
  );
  catalogo.addProducto(11, "Mayonesa 350gr (Caja de 50)", 124.45, 2);
  catalogo.addProducto(12, "Mayonesa 1Kg (Caja de 30)", 178.65, 2);
  catalogo.addProducto(13, "Salsa Cocktail 350gr (Caja de 50)", 99.65, 2);
  catalogo.addProducto(14, "Salsa Gaucha 350gr (Caja de 50)", 124.85, 2);
  catalogo.addProducto(15, "Salsa Alioli 350 gr (Caja de 50)", 113.75, 2);
  catalogo.addProducto(16, "Salsa Barbacoa 500gr (Caja de 30)", 67.5, 2);
}

cargaDatosIniciales();

// Función para cargar los clientes en cada comercial del gestor
function cargaClientesEnComerciales() {
  for (let i = 0; i < comerciales.length; i++) {
    const clientesComercial = clientes[i];
    for (let j = 0; j < clientesComercial.length; j++) {
      const nombreCliente = clientesComercial[j];
      const cliente = new Cliente(nombreCliente, false); // Por defecto, todos los clientes se crean con cuenta cerrada
      gestor.agregarCliente(i, cliente); // Agregar el cliente al comercial correspondiente en el gestor
    }
  }
}

// Llamar a la función para cargar los clientes en cada comercial
cargaClientesEnComerciales();

// Obtener referencia al elemento select
const selectComerciales = document.querySelector('select[name="comerciales"]');

// Iterar sobre el arreglo de comerciales y agregar opciones al select
comerciales.forEach((comercial, index) => {
  const option = document.createElement('option');
  option.value = index; // El valor de la opción es el índice del comercial en el arreglo
  option.textContent = comercial; // El texto de la opción es el nombre del comercial
  selectComerciales.appendChild(option); // Agregar la opción al select
});

function borrarCliente(contenedor){
  contenedor.parentNode.removeChild(contenedor);
}

// Función para mostrar los clientes del comercial seleccionado
function mostrarClientesDelComercialSeleccionado() {
  let contenedorClientes = document.getElementById('clientes-container');
  if (contenedorClientes){
    borrarCliente(contenedorClientes);
  }
  // Obtener el índice del comercial seleccionado en el select
  const indiceComercialSeleccionado = selectComerciales.value;
  
  // Obtener la lista de clientes del comercial seleccionado
  const clientesComercialSeleccionado = gestor.clientes[indiceComercialSeleccionado];

  
  // Obtener referencia al contenedor donde se mostrarán los clientes
  contenedorClientes = document.getElementById('clientes');

    contenedorClientes = document.createElement('div');
    contenedorClientes.id = 'clientes-container';
    document.getElementById("clientes").appendChild(contenedorClientes)
    
    
  // Iterar sobre la lista de clientes y crear un div para cada cliente
  clientesComercialSeleccionado.forEach(cliente => {
    const divCliente = document.createElement('div');
    divCliente.classList.add('cliente');
    divCliente.textContent = cliente.nombre;
    divCliente.className="cliente pagado"
    contenedorClientes.appendChild(divCliente);

    //Añadir el event listener con click
    divCliente.addEventListener('click', () => mostarClienteEnPedido(cliente));
});
function borrarClientePedido(contenedor){
  contenedor.parentNode.removeChild(contenedor);
}
function mostarClienteEnPedido(cliente) {

  let divPedido = document.getElementById("div-pedido");
  if (divPedido){
    borrarClientePedido(divPedido);
  }
  divPedido = document.getElementById("pedido");
  divPedido = document.createElement('div');
  divPedido.id = 'div-pedido'
  document.getElementById("pedido").appendChild(divPedido)


  const h2 = document.createElement('h2');
  h2.textContent = "Cliente: " + cliente.nombre
  divPedido.appendChild(h2)
}
}


// Evento para detectar cambios en la selección del comercial
selectComerciales.addEventListener('change', mostrarClientesDelComercialSeleccionado);

// Llamar a la función inicialmente para mostrar los clientes del comercial seleccionado por defecto
mostrarClientesDelComercialSeleccionado();
 

function cargaCategorias (){
  const selectCategorias = document.querySelector('select[name="categorias"]');
  let i = 0;
  for (let categoria of categorias){
    const option = document.createElement('option');
    option.value = i
    option.textContent = categoria
    selectCategorias.appendChild(option);
    i = i+1
  }
}

cargaCategorias();


function cargaProductos (){
  let productos = catalogo.productos
  let selectCategoria = document.getElementsByName("categorias")[0]
  let idCategoria = selectCategoria.value
  const selectCategorias = document.querySelector('select[name="productos"]');

  let opciones = frmControles.productos.querySelectorAll("option")
  for (let producto of opciones){
    producto.remove();
  }

  for (let producto of productos){
    if (idCategoria == producto.idCategoria){
      const option = document.createElement('option');
      option.value = producto.idProducto;
      option.textContent = producto.nombreProducto;
      selectCategorias.appendChild(option)
      
    }
  }
}
cargaProductos();
const selectCategoria = document.querySelector('select[name="categorias"]');
selectCategoria.addEventListener('change', cargaProductos);

let vueltas = 0;
const botonesTeclado = document.querySelectorAll('.tecla');
for (let i = 0; i < botonesTeclado.length; i++) {
    const boton = botonesTeclado[i];
    
    boton.addEventListener('click', function() {
        const valorBoton = this.value;

        // Verificar si los elementos ya existen
        let divPedido = document.getElementById("calculoPedido");
        if (!divPedido) {
            // Si no existe el div, créalo
            divPedido = document.createElement("div");
            divPedido.id = "calculoPedido";
            document.getElementById("div-pedido").appendChild(divPedido);




            // Crea el h3 y el botón solo si se crea el divPedido
            const h3 = document.createElement("h3");
            h3.textContent = "Total: ";
            divPedido.appendChild(h3);

            const botonPedido = document.createElement("button");
            botonPedido.className = "boton";
            botonPedido.textContent = "PEDIDO ENVIADO Y COBRADO";
            botonPedido.addEventListener("click", finalizarPedido);
            divPedido.appendChild(botonPedido);
        }

        const selectProductos = document.querySelector('select[name="productos"]');
        const indiceProductoSeleccionado = selectProductos.value - 1; // -1 porque en el select comienza con el valor de 1 en vez de 0
        const productoSeleccionado = catalogo.productos[indiceProductoSeleccionado];

        const idProducto = productoSeleccionado.idProducto;
        const nombreProducto = productoSeleccionado.nombreProducto;
        const precioProducto = productoSeleccionado.precioUnidad;

        // Obtener la referencia a la tabla y al cuerpo de la tabla
        let tabla = document.getElementById("tabla");
        let tbody = document.getElementById("tbody");

        if (!tabla) {
          // Crear la tabla
          tabla = document.createElement("table");
          tabla.id = "tabla";

          // Crear el cuerpo de la tabla
          tbody = document.createElement("tbody");
          tbody.id = "tbody";
          tabla.appendChild(tbody);

          // Crear la fila de encabezado
          const encabezado = tabla.createTHead();
          const filaEncabezado = encabezado.insertRow();
          filaEncabezado.id = "encabezado";
          filaEncabezado.insertCell().textContent = "Modificar";
          filaEncabezado.insertCell().textContent = "Uds.";
          filaEncabezado.insertCell().textContent = "Id.";
          filaEncabezado.insertCell().textContent = "Producto";
          filaEncabezado.insertCell().textContent = "Precio";
        }
       
        let productoExiste = compruebaSiProductoExiste(idProducto);
        if (productoExiste){
          alert("El producto que ha intentado introducir ya se encuentra en la tabla")
        }
        else{
          // Crear la fila de datos
          const filaDatos = tbody.insertRow();
          const modificarCell = filaDatos.insertCell();
          const unidadesCell = filaDatos.insertCell();
          const idCell = filaDatos.insertCell();
          const nombreCell = filaDatos.insertCell();
          const precioCell = filaDatos.insertCell();

          // Crear botones de modificar
          const botonAñadir = document.createElement("button");
          botonAñadir.textContent = "+";
          botonAñadir.className = "modificador"
          botonAñadir.addEventListener("click", añadirUnidades);
          modificarCell.appendChild(botonAñadir);

          const botonRestar = document.createElement("button");
          botonRestar.textContent = "-";
          botonRestar.className = "modificador"
          botonRestar.addEventListener("click", restarUnidades);
          modificarCell.appendChild(botonRestar);

          // Asignar valores y clases a las celdas
          unidadesCell.textContent = valorBoton;
          unidadesCell.className = "unidades"
          nombreCell.textContent = nombreProducto;
          nombreCell.className = "producto"
          precioCell.textContent = precioProducto;
          precioCell.className = "precio"
          idCell.textContent = idProducto;
          idCell.className = "id"

          // Agregar la tabla al div de pedido
          divPedido = document.getElementById("div-pedido");
          divPedido.appendChild(tabla);
          calcularTotal()
        }
    });
}
function calcularTotal(){
  const filasDatos = document.querySelectorAll("#tabla tbody tr");

  // Variable para almacenar el total
  let total = 0;

  // Iterar sobre las filas de datos
  filasDatos.forEach(fila => {
      // Obtener las celdas de unidades y precio de la fila actual
      const unidades = parseInt(fila.querySelector(".unidades").textContent);
      const precio = parseFloat(fila.querySelector(".precio").textContent);
      
      // Calcular el subtotal de esta fila y añadirlo al total
      const subtotal = unidades * precio;
      total += subtotal;
  });

  // Mostrar el total en el elemento h3
  const h3 = document.querySelector("#calculoPedido h3");
  h3.textContent = "Total: " + total.toFixed(2);
}

function compruebaSiProductoExiste(valor) {
  // Obtener todos los elementos con la clase "id"
  let elementos = document.querySelectorAll('.id');
  
  // Iterar sobre los elementos para comprobar si alguno tiene el mismo valor
  for (let i = 0; i < elementos.length; i++) {
      // Obtener el valor del elemento actual
      let valorElemento = elementos[i].textContent;
      
      // Comparar el valor del elemento con el valor que se quiere introducir
      if (valorElemento == valor) {
          // Si hay coincidencia, el producto ya existe
          return true;
      }
  }
  
  // Si no se encuentra ninguna coincidencia, el producto no existe
  return false;
}


function añadirUnidades(event){
// Obtener el elemento tr más cercano al botón que fue clickeado
const fila = event.target.closest('tr');

// Verificar si se encontró la fila
if (fila) {
  // Obtener el elemento con la clase "id" dentro de la fila
  const idElemento = fila.querySelector('.unidades');

  // Verificar si se encontró el elemento con la clase "id"
  if (idElemento) {
    // Obtener el valor actual del elemento y sumarle 1
    let valorActual = parseInt(idElemento.textContent);
    idElemento.textContent = valorActual + 1;
  } else {
    console.error('No se encontró el elemento con la clase "id" dentro de la fila.');
  }
} else {
  console.error('No se encontró la fila.');
}
calcularTotal()
}
function restarUnidades(event){
  // Obtener el elemento tr más cercano al botón que fue clickeado
  const fila = event.target.closest('tr');
// Verificar si se encontró la fila
if (fila) {
  // Obtener el elemento con la clase "id" dentro de la fila
  const idElemento = fila.querySelector('.unidades');

  // Verificar si se encontró el elemento con la clase "id"
  if (idElemento) {
    // Obtener el valor actual del elemento y sumarle 1
    let valorActual = parseInt(idElemento.textContent);
    valorActual = valorActual-1;
    idElemento.textContent = valorActual;
    if (valorActual == 0){
      let confirmar = window.confirm("¿Esta seguro de que quiere eliminar este producto del pedido?")
      if (confirmar){
        borrarTr();
      }
      else{
        idElemento.textContent = 1;
      }
    }
  } else {
    console.error('No se encontró el elemento con la clase "id" dentro de la fila.');
  }
} else {
  console.error('No se encontró la fila.');
}
calcularTotal()
}

// funcion borrar tr 
function borrarTr(){
  // Obtener el botón actual
  const boton = event.target;
  
  // Obtener el padre del botón (la celda)
  const celda = boton.parentNode;
  
  // Obtener el padre de la celda (la fila)
  const fila = celda.parentNode;
  
  // Verificar si se encontró la fila
  if (fila.tagName === 'TR') {
    // Eliminar la fila actual
    fila.remove();
  } else {
    console.error('No se pudo encontrar la fila para eliminar.');
  }
}
// Función para finalizar el pedido
function finalizarPedido() {
    console.log("Se ha pulsado el botón de finalizar pedido");
    const div = document.getElementById("pedido");
    div.innerHTML=""
}