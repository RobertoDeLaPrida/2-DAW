const catalogo = new Catalogo();
const gestor = new Gestor();

let comerciales = []; // Array de comerciales
let categorias = []; // Array de categorias
let clientes = []; // Array de clientes

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error al obtener los datos de la base de datos.');
  }
  return await response.json();
}

async function crearComerciales() {
  const data = await fetchData('https://practica-obligatoria-b745e-default-rtdb.europe-west1.firebasedatabase.app/.json');
  const keysComerciales = Object.keys(data.comerciales);
  comerciales = keysComerciales.map(claveComercial => data.comerciales[claveComercial]);
//   console.log(comerciales);
}

async function crearCategoria() {
  const data = await fetchData('https://practica-obligatoria-b745e-default-rtdb.europe-west1.firebasedatabase.app/.json');
  categorias = Object.values(data.categorias);
//   console.log('Categorías:', categorias);
}

async function crearClientes() {
  const data = await fetchData('https://practica-obligatoria-b745e-default-rtdb.europe-west1.firebasedatabase.app/.json');
  clientes = [];
  Object.keys(data.clientes).forEach(key => {
    const clientesComercial = data.clientes[key];
    const clientesArray = [];
    clientesComercial.forEach(cliente => {
      clientesArray.push(cliente);
    });
    clientes.push(clientesArray);
  });
//   console.log('Clientes:', clientes);
}
async function crearProductos() {
    const data = await fetchData('https://practica-obligatoria-b745e-default-rtdb.europe-west1.firebasedatabase.app/.json');
    const productos = Object.values(data.productos);
    productos.forEach(producto => {
      catalogo.addProducto(
        producto.idCategoria,
        producto.nombreProducto,
        producto.precioUnidad,
        producto.idProducto
      );
    });
    // console.log('Productos cargados:', catalogo.productos);
  }
  

async function initialize() {
  try {
    await Promise.all([crearComerciales(), crearCategoria(), crearClientes(), crearProductos()]);
    // console.log('Datos cargados correctamente.');

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

    selectComerciales.innerHTML = '';
    
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
      if (!contenedorClientes) {
          // Si no existe el contenedor, crear uno nuevo
          contenedorClientes = document.createElement('div');
          contenedorClientes.id = 'clientes-container';
          document.getElementById("clientes").appendChild(contenedorClientes);
      } else {
          // Si ya existe el contenedor, limpiar su contenido
          contenedorClientes.innerHTML = '';
      }
  
      // Obtener el índice del comercial seleccionado en el select
      const indiceComercialSeleccionado = selectComerciales.value;
      
      // Obtener la lista de clientes del comercial seleccionado
      const clientesComercialSeleccionado = gestor.clientes[indiceComercialSeleccionado];
  
      // Iterar sobre la lista de clientes y crear un div para cada cliente
      clientesComercialSeleccionado.forEach(cliente => {
          const divCliente = document.createElement('div');
          divCliente.classList.add('cliente');
          divCliente.textContent = cliente.nombre;
          divCliente.className = "cliente pagado";
          contenedorClientes.appendChild(divCliente);
      });
  }

    selectComerciales.removeEventListener('change' ,mostrarClientesDelComercialSeleccionado);

    // Evento para detectar cambios en la selección del comercial
    selectComerciales.addEventListener('change', mostrarClientesDelComercialSeleccionado);
    
    // Llamar a la función inicialmente para mostrar los clientes del comercial seleccionado por defecto
    mostrarClientesDelComercialSeleccionado();
    
    
    function cargaCategorias (){
        const selectCategorias = document.querySelector('select[name="categorias"]');
        selectCategorias.innerHTML = '';
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
          if (idCategoria == producto.idProducto){
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

  } catch (error) {
    console.error('Error al inicializar:', error);
  }
}

initialize();


// Función para eliminar todos los formularios de categorías existentes
function limpiarFormularios() {
  const formulariosCategorias = document.querySelectorAll('.formulario-categoria');
  formulariosCategorias.forEach(formulario => formulario.remove());
  const formulariosComercial = document.querySelectorAll('.formulario-comercial')
  formulariosComercial.forEach(formulario => formulario.remove());
}

// Función para crear el formulario de nueva categoría
function crearFormularioNuevaCategoria() {
  // Crear elementos del formulario
  const frmNuevaCategoria = document.createElement('div');
  frmNuevaCategoria.id = 'frmNuevaCategoria';
  frmNuevaCategoria.classList.add('formulario-categoria');
  frmNuevaCategoria.innerHTML = `
      <label><h4>Nueva categoría:</h4></label>
      <input type="text" id="txtNuevaCategoria" /><br /><br />
      <button id="btnGuardarCategoria">Guardar</button>
  `;

  // Escuchar el evento clic en el botón de guardar categoría
  frmNuevaCategoria.querySelector('#btnGuardarCategoria').addEventListener('click', () => {
      const nuevaCategoria = document.getElementById('txtNuevaCategoria').value;
      console.log('Nueva categoría:', nuevaCategoria);
      guardarCategoria();
      //Si llamo a la funcion initialize() para que se actualizen los campos al meter y borrar categorias se me duplican los clientes y no he conseguido arreglarlo
  });

  return frmNuevaCategoria;
}

// Función para crear el formulario de borrar categoría
// Función para crear el formulario de borrar categoría
function crearFormularioBorrarCategoria() {
  // Crear elementos del formulario
  const frmBorrarCategoria = document.createElement('div');
  frmBorrarCategoria.id = 'frmBorrarCategoria';
  frmBorrarCategoria.classList.add('formulario-categoria');
  
  // Crear el elemento select para mostrar las categorías disponibles
  const selectCategorias = document.createElement('select');
  selectCategorias.id = 'selectBorrarCategoria'; // Asignar un ID para poder acceder fácilmente a él
  selectCategorias.innerHTML = ''; // Limpiar el contenido (por si acaso)

  // Llenar el select con las opciones de categorías disponibles
  categorias.forEach(categoria => {
    const option = document.createElement('option');
    option.value = categoria;
    option.textContent = categoria;
    selectCategorias.appendChild(option);
  });

  // Crear el botón de borrar categoría
  const btnBorrarCategoria = document.createElement('button');
  btnBorrarCategoria.id = 'btnBorrarCategoria';
  btnBorrarCategoria.textContent = 'Borrar';

  // Crear el campo de entrada de texto para la nueva categoría
  const txtActualizarCategoria = document.createElement('input');
  txtActualizarCategoria.id = 'txtActualizarCategoria';

  // Crear el botón de actualizar categoría
  const btnActualizarCategoria = document.createElement('button');
  btnActualizarCategoria.id = 'btnActualizarCategoria';
  btnActualizarCategoria.textContent = 'Actualizar';

  // Escuchar el evento clic en el botón de actualizar categoría
  btnActualizarCategoria.addEventListener('click', () => {
    const nuevaCategoria = document.getElementById('txtActualizarCategoria').value;
    console.log('Nueva categoría:', nuevaCategoria);
    actualizarCategoria();
  });

  // Escuchar el evento clic en el botón de borrar categoría
  btnBorrarCategoria.addEventListener('click', () => {
    const categoriaABorrar = selectCategorias.value;
    console.log('Categoría a borrar:', categoriaABorrar);
    borrarCategoria()
  });

  // Agregar los elementos al formulario
  frmBorrarCategoria.appendChild(document.createElement('hr'));
  frmBorrarCategoria.appendChild(document.createElement('label')).innerHTML = '<h4>Categoría a borrar:</h4>';
  frmBorrarCategoria.appendChild(selectCategorias);
  frmBorrarCategoria.appendChild(document.createElement('br'));
  frmBorrarCategoria.appendChild(document.createElement('br'));
  frmBorrarCategoria.appendChild(btnBorrarCategoria);
  frmBorrarCategoria.appendChild(document.createElement('hr'));
  frmBorrarCategoria.appendChild(document.createElement('label')).innerHTML = '<h4>Actualizar categoría:</h4>';
  frmBorrarCategoria.appendChild(txtActualizarCategoria);
  frmBorrarCategoria.appendChild(document.createElement('br'));
  frmBorrarCategoria.appendChild(document.createElement('br'));
  frmBorrarCategoria.appendChild(btnActualizarCategoria);

  return frmBorrarCategoria;
}

async function guardarCategoria(){
  const nuevaCategoria = document.getElementById('txtNuevaCategoria').value;
        try {
            // Realizar una solicitud POST para agregar la nueva categoría a la base de datos
            const response = await fetch('https://practica-obligatoria-b745e-default-rtdb.europe-west1.firebasedatabase.app/categorias.json', {
                method: 'POST',
                body: JSON.stringify(nuevaCategoria)
            });

            if (!response.ok) {
                throw new Error('Error al agregar la nueva categoría.');
            }

            alert('Nueva categoría agregada correctamente a la base de datos.');
        } catch (error) {
            alert('Error al agregar la nueva categoría:', error);
        }
}
async function obtenerIdCategoria() {
  const categoriaABorrar = document.getElementById('selectBorrarCategoria').value;
  const url = 'https://practica-obligatoria-b745e-default-rtdb.europe-west1.firebasedatabase.app/categorias.json';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error al obtener datos de la categoría.');
    }
    const data = await response.json();

    // Recorre los datos para encontrar la ID de la categoría seleccionada
    for (const key in data) {
      if (data.hasOwnProperty(key) && data[key] === categoriaABorrar) {
        return key;
      }
    }

    throw new Error('No se encontró la categoría seleccionada.');
  } catch (error) {
    alert('Error al obtener ID de la categoría:', error);
    return null;
  }
}
async function actualizarCategoria() {
  try {
    const nuevaCategoria = document.getElementById('txtActualizarCategoria').value;
    const categoriaId = await obtenerIdCategoria();

    if (!categoriaId) {
      alert('No se pudo obtener la ID de la categoría.');
      return;
    }

    const response = await fetch(`https://practica-obligatoria-b745e-default-rtdb.europe-west1.firebasedatabase.app/categorias/${categoriaId}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevaCategoria)
    });

    if (!response.ok) {
      throw new Error('Error al actualizar la categoría.');
    }

    alert(`Categoría actualizada correctamente: "${nuevaCategoria}"`);
  } catch (error) {
    alert('Error al actualizar la categoría:', error);
  }
}
async function borrarCategoria() {
  try {
    const categoriaABorrar = document.getElementById('selectBorrarCategoria').value;
    const categoriaId = await obtenerIdCategoria();

    if (!categoriaId) {
      alert('No se pudo obtener la ID de la categoría.');
      return;
    }

    const response = await fetch(`https://practica-obligatoria-b745e-default-rtdb.europe-west1.firebasedatabase.app/categorias/${categoriaId}.json`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Error al borrar la categoría.');
    }

    alert(`Categoría "${categoriaABorrar}" borrada correctamente.`);
  } catch (error) {
    alert('Error al borrar la categoría:', error);
  }
}



// Función para manejar el evento clic en el botón de gestión de categorías
function gestionarCategorias() {
  // Limpiar formularios anteriores
  limpiarFormularios();

  // Crear y mostrar el formulario de nueva categoría
  const formularioNuevaCategoria = crearFormularioNuevaCategoria();
  document.getElementById('formularios').appendChild(formularioNuevaCategoria);

  // Crear y mostrar el formulario de borrar categoría
  const formularioBorrarCategoria = crearFormularioBorrarCategoria();
  document.getElementById('formularios').appendChild(formularioBorrarCategoria);
}

// Obtener referencia al botón de gestión de categorías
const btnGestionCategorias = document.getElementById('btnGestionCategorias');

// Escuchar el evento clic en el botón de gestión de categorías
btnGestionCategorias.addEventListener('click', gestionarCategorias);

// Función para crear el formulario de nuevo comercial
function crearFormularioNuevoComercial() {
  // Crear elementos del formulario
  const frmNuevoComercial = document.createElement('div');
  frmNuevoComercial.id = 'frmNuevoComercial';
  frmNuevoComercial.classList.add('formulario-comercial');
  frmNuevoComercial.innerHTML = `
      <label><h4>Nuevo comercial:</h4></label>
      <input type="text" id="txtNuevoComercial" /><br /><br />
      <button id="btnGuardarComercial">Guardar</button>
  `;

  // Escuchar el evento clic en el botón de guardar comercial
  frmNuevoComercial.querySelector('#btnGuardarComercial').addEventListener('click', () => {
      const nuevoComercial = document.getElementById('txtNuevoComercial').value;
      console.log('Nuevo comercial:', nuevoComercial);
      guardarComercial();
  });

  return frmNuevoComercial;
}

// Función para crear el formulario de borrar comercial
function crearFormularioBorrarComercial(comerciales) {
  // Crear elementos del formulario
  const frmBorrarComercial = document.createElement('div');
  frmBorrarComercial.id = 'frmBorrarComercial';
  frmBorrarComercial.classList.add('formulario-comercial');
  
  // Crear el elemento select para mostrar los comerciales disponibles
  const selectComerciales = document.createElement('select');
  selectComerciales.id = 'selectBorrarComercial'; // Asignar un ID para poder acceder fácilmente a él
  selectComerciales.innerHTML = ''; // Limpiar el contenido (por si acaso)

  // Llenar el select con las opciones de comerciales disponibles
  comerciales.forEach((nombreComercial, id) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = nombreComercial;
    selectComerciales.appendChild(option);
  });

  // Crear el botón de borrar comercial
  const btnBorrarComercial = document.createElement('button');
  btnBorrarComercial.id = 'btnBorrarComercial';
  btnBorrarComercial.textContent = 'Borrar';

  // Escuchar el evento clic en el botón de borrar comercial
  btnBorrarComercial.addEventListener('click', () => {
    borrarComercial;
  });
  // Crear el campo de entrada de texto para la nueva categoría
  const txtActualizarComercial = document.createElement('input');
  txtActualizarComercial.id = 'txtActualizarComercial';

  // Crear el botón de actualizar categoría
  const btnActualizarComercial = document.createElement('button');
  btnActualizarComercial.id = 'btnActualizarCategoria';
  btnActualizarComercial.textContent = 'Actualizar';

  // Escuchar el evento clic en el botón de actualizar categoría
  btnActualizarComercial.addEventListener('click', () => {
    const nuevoComercial = document.getElementById('txtActualizarComercial').value;
    console.log('Nuevo Comercial:', nuevaCategoria);
    actualizarComercial();
  });

  // Agregar los elementos al formulario
  frmBorrarComercial.appendChild(document.createElement('hr'));
  frmBorrarComercial.appendChild(document.createElement('label')).innerHTML = '<h4>Comercial a borrar:</h4>';
  frmBorrarComercial.appendChild(selectComerciales);
  frmBorrarComercial.appendChild(document.createElement('br'));
  frmBorrarComercial.appendChild(document.createElement('br'));
  frmBorrarComercial.appendChild(btnBorrarComercial);
  frmBorrarComercial.appendChild(document.createElement('hr'));
  frmBorrarComercial.appendChild(document.createElement('label')).innerHTML = '<h4>Actualizar comercial:</h4>';
  frmBorrarComercial.appendChild(txtActualizarComercial);
  frmBorrarComercial.appendChild(document.createElement('br'));
  frmBorrarComercial.appendChild(document.createElement('br'));
  frmBorrarComercial.appendChild(btnActualizarComercial);

  return frmBorrarComercial;
}

async function obtenerIdComercial() {
  const comercialABorrar = document.getElementById('selectBorrarComercial').value;
  const url = 'https://practica-obligatoria-b745e-default-rtdb.europe-west1.firebasedatabase.app/comerciales.json';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error al obtener datos de los comerciales.');
    }
    const data = await response.json();

    // Recorre los datos para encontrar la ID de los comerciales seleccionado
    for (const key in data) {
      if (data.hasOwnProperty(key) && data[key] === comercialABorrar) {
        return key;
      }
    }

    throw new Error('No se encontró el comercial');
  } catch (error) {
    alert('Error al obtener ID del comercial:', error);
    return null;
  }
}
async function guardarComercial(){
  const nuevoComercial = document.getElementById('txtNuevoComercial').value;
        try {
            // Realizar una solicitud POST para agregar el nuevo comercial a la base de datos
            const response = await fetch('https://practica-obligatoria-b745e-default-rtdb.europe-west1.firebasedatabase.app/comerciales.json', {
                method: 'POST',
                body: JSON.stringify(nuevoComercial)
            });

            if (!response.ok) {
                throw new Error('Error al agregar el nuevo comercial.');
            }

            alert('Nuevo comercial agregado correctamente a la base de datos.');
        } catch (error) {
            alert('Error al agregar el nuevo comercial:', error);
        }
}
async function actualizarComercial() {
  try {
    const nuevoNombreComercial = document.getElementById('txtActualizarComercial').value;
    const idComercial = await obtenerIdComercial();

    if (!idComercial) {
      alert('No se pudo obtener la ID del comercial.');
      return;
    }

    const response = await fetch(`https://practica-obligatoria-b745e-default-rtdb.europe-west1.firebasedatabase.app/comerciales/${idComercial}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoNombreComercial)
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el comercial.');
    }

    alert(`Comercial actualizado correctamente: "${nuevoNombreComercial}"`);
  } catch (error) {
    alert('Error al actualizar el comercial:', error);
  }
}
async function borrarComercial() {
  try {
    const comercialABorrar = document.getElementById('selectBorrarComercial').value;
    const comercialId = await obtenerIdComercial();

    if (!comercialId) {
      alert('No se pudo obtener el id del comercial.');
      return;
    }

    const response = await fetch(`https://practica-obligatoria-b745e-default-rtdb.europe-west1.firebasedatabase.app/comerciales/${comercialId}.json`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Error al borrar el comercial.');
    }

    alert(`Comercial "${comercialABorrar}" borrado correctamente.`);
  } catch (error) {
    alert('Error al borrar el comercial:', error);
  }
}

async function obtenerComerciales() {
  const url = 'https://practica-obligatoria-b745e-default-rtdb.europe-west1.firebasedatabase.app/comerciales.json';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error al obtener datos de los comerciales.');
    }
    const data = await response.json();
    const comerciales = Object.values(data);
    return comerciales;
  } catch (error) {
    alert('Error al obtener comerciales:', error);
    return [];
  }
}

// Función para manejar el evento clic en el botón de gestión de comerciales
function gestionarComerciales() {
  // Limpiar formularios anteriores
  limpiarFormularios();

  // Obtener la lista de comerciales
  obtenerComerciales().then(comerciales => {
    // Crear y mostrar el formulario de nuevo comercial
    const formularioNuevoComercial = crearFormularioNuevoComercial();
    document.getElementById('formularios').appendChild(formularioNuevoComercial);

    // Crear y mostrar el formulario de borrar comercial
    const formularioBorrarComercial = crearFormularioBorrarComercial(comerciales);
    document.getElementById('formularios').appendChild(formularioBorrarComercial);
  });
}

// Obtener referencia al botón de gestión de comerciales
const btnGestionComerciales = document.getElementById('btnGestionComerciales');

// Escuchar el evento clic en el botón de gestión de comerciales
btnGestionComerciales.addEventListener('click', gestionarComerciales);