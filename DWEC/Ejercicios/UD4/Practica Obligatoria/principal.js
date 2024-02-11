const agencia = new Agencia();

// Ejemplo: Alta de clientes
const cliente1 = new Cliente("123456789", "Juan", "Perez", "Gomez");
const cliente2 = new Cliente("987654321", "Maria", "Lopez", "Fernandez");

agencia.altaCliente(cliente1);
agencia.altaCliente(cliente2);

// Ejemplo: Alta de vehículos
const coche1 = new Coche("ABC123", "Toyota", "Corolla", "Gasolina", 5);
const moto1 = new Motocicleta("XYZ789", "Honda", "CBR", true);

agencia.altaVehiculo(coche1);
agencia.altaVehiculo(moto1);

// Ejemplo: Realizar un alquiler
const alquiler1 = new Alquiler(1, cliente1.usuario, "2023-01-01", "2023-01-10", [coche1]);
const alquiler2 = new Alquiler(2, cliente2.usuario, "2023-02-01", "2023-02-10", [moto1]);

console.log(agencia.altaAlquiler(alquiler1));
console.log(agencia.altaAlquiler(alquiler2));

// Ejemplo: Obtener listados
console.log("Listado de clientes:\n", agencia.listadoClientes());
console.log("Listado de vehículos:\n", agencia.listadoVehiculos());
console.log("Listado de alquileres entre fechas:\n", agencia.listadoAlquileres("2023-01-01", "2023-02-28"));
console.log("Listado de coches eléctricos:\n", agencia.listadoCochesElectricos());

function altaClientesDesdeFormulario() {
    // Obtener los datos del formulario
    const dniCliente = document.getElementById('dniClienteInput').value;
    const nombre = document.getElementById('nombreInput').value;
    const apellido1 = document.getElementById('apellido1Input').value;
    const apellido2 = document.getElementById('apellido2Input').value;
  
    // Crear un objeto Cliente con los datos del formulario
    const nuevoCliente = new Cliente(dniCliente, nombre, apellido1, apellido2);
  
    // Llamar a la función de altaCliente con el objeto Cliente
    console.log(agencia.altaCliente(nuevoCliente));
}