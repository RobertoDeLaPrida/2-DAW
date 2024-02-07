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


// Función para mostrar los clientes del comercial seleccionado
function mostrarClientesDelComercialSeleccionado() {
  // Obtener el índice del comercial seleccionado en el select
  const indiceComercialSeleccionado = selectComerciales.value;
  
  // Obtener la lista de clientes del comercial seleccionado
  const clientesComercialSeleccionado = gestor.clientes[indiceComercialSeleccionado];
  
  // Obtener referencia al contenedor donde se mostrarán los clientes
  const contenedorClientes = document.getElementById('clientes');

  // Limpiar el contenedor antes de agregar los nuevos clientes
  contenedorClientes.innerHTML = '';

  // Iterar sobre la lista de clientes y crear un div para cada cliente
  clientesComercialSeleccionado.forEach(cliente => {
    const divCliente = document.createElement('div');
    divCliente.classList.add('cliente');
    divCliente.textContent = cliente.nombre;
    contenedorClientes.appendChild(divCliente);
  });
}

// Evento para detectar cambios en la selección del comercial
selectComerciales.addEventListener('change', mostrarClientesDelComercialSeleccionado);

// Llamar a la función inicialmente para mostrar los clientes del comercial seleccionado por defecto
mostrarClientesDelComercialSeleccionado();
 