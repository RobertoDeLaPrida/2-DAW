
class Cliente {
    constructor(dniCliente, nombre, apellido1, apellido2) {
      this.dniCliente = dniCliente;
      this.nombre = nombre;
      this.apellido1 = apellido1;
      this.apellido2 = apellido2;
      this.usuario = this.generarUsuario();
    }
  
    generarUsuario() {
      const usuario = `${this.nombre[0]}${this.apellido1.substring(0, 3)}${this.apellido2.substring(0, 3)}${this.dniCliente.slice(-3)}`;
      return usuario.toLowerCase();
    }
    toHTMLRow() {
        return `
          <tr>
            <td>${this.dniCliente}</td>
            <td>${this.nombre} ${this.apellido1} ${this.apellido2}</td>
            <td>${this.usuario}</td>
          </tr>
        `;
      }
    
}
  
class Vehiculo {
    constructor(matricula, marca, modelo) {
      this.matricula = matricula;
      this.marca = marca;
      this.modelo = modelo;
    }
    toHTMLRow() {
        return `
          <tr>
            <td>${this.matricula}</td>
            <td>${this.marca}</td>
            <td>${this.modelo}</td>
          </tr>
        `;
      }
}
  
  class Motocicleta extends Vehiculo {
    constructor(matricula, marca, modelo, esCiclomotor) {
      super(matricula, marca, modelo);
      this.esCiclomotor = esCiclomotor;
    }
    toHTMLRow() {
        return `
          <tr>
            <td>${this.matricula}</td>
            <td>${this.marca}</td>
            <td>${this.modelo}</td>
            <td>${this.esCiclomotor ? 'Sí' : 'No'}</td>
          </tr>
        `;
      }
  }
  
  class Coche extends Vehiculo {
    constructor(matricula, marca, modelo, tipoCombustible, numPlazas) {
      super(matricula, marca, modelo);
      this.tipoCombustible = tipoCombustible;
      this.numPlazas = numPlazas;
    }
    toHTMLRow() {
        return `
          <tr>
            <td>${this.matricula}</td>
            <td>${this.marca}</td>
            <td>${this.modelo}</td>
            <td>${this.tipoCombustible}</td>
            <td>${this.numPlazas}</td>
          </tr>
        `;
      }
  }
  
  class Alquiler {
    constructor(idAlquiler, idCliente, fechaInicio, fechaFin, vehiculos) {
      this.idAlquiler = idAlquiler;
      this.idCliente = idCliente;
      this.fechaInicio = fechaInicio;
      this.fechaFin = fechaFin;
      this.vehiculos = vehiculos;
    }
    toHTMLRow() {
        const vehiculosStr = this.vehiculos.map(vehiculo => vehiculo.matricula).join(', ');
    
        return `
          <tr>
            <td>${this.idAlquiler}</td>
            <td>${this.cliente.usuario}</td>
            <td>${this.fechaInicio}</td>
            <td>${this.fechaFin}</td>
            <td>${vehiculosStr}</td>
          </tr>
        `;
      }
}
  
  class Agencia {
    constructor() {
      this.clientes = [];
      this.vehiculos = [];
      this.alquileres = [];
    }
  
    altaCliente(oCliente) {
        // Verificar si el cliente ya existe
        const clienteExistente = this.clientes.find(cliente => cliente.dniCliente === oCliente.dniCliente);
    
        if (!clienteExistente) {
          this.clientes.push(oCliente);
          return 'Cliente dado de alta correctamente.';
        } else {
          return 'Error: El cliente ya existe.';
        }
      }
    
      altaVehiculo(oVehiculo) {
        // Verificar si ya existe un vehículo con la misma matrícula
        const existeVehiculo = this.vehiculos.some(v => v.matricula === oVehiculo.matricula);
    
        if (!existeVehiculo) {
          this.vehiculos.push(oVehiculo);
          return 'Vehículo dado de alta correctamente.';
        } else {
          return 'Error: Ya existe un vehículo con esa matrícula.';
        }
      }
    
      altaAlquiler(oAlquiler) {
        // Verificar disponibilidad de vehículos para las fechas especificadas
        const vehiculosDisponibles = this.verificarDisponibilidadVehiculos(oAlquiler);
    
        if (vehiculosDisponibles.length === oAlquiler.vehiculos.length) {
          // Todos los vehículos están disponibles, se puede proceder con el alquiler
          this.alquileres.push(oAlquiler);
          return 'Alquiler registrado correctamente.';
        } else {
          // Mostrar los vehículos no disponibles en el mensaje
          const vehiculosNoDisponibles = oAlquiler.vehiculos.filter(vehiculo => !vehiculosDisponibles.includes(vehiculo));
          return `Error: Algunos vehículos no están disponibles para las fechas especificadas: ${vehiculosNoDisponibles.map(v => v.matricula).join(', ')}.`;
        }
      }
    
      bajaAlquiler(idAlquiler) {
        // Buscar el alquiler por ID
        const alquilerIndex = this.alquileres.findIndex(a => a.idAlquiler === idAlquiler);
    
        if (alquilerIndex !== -1) {
          // Eliminar el alquiler encontrado
          this.alquileres.splice(alquilerIndex, 1);
          return 'Alquiler dado de baja correctamente.';
        } else {
          return 'Error: No se encontró un alquiler con ese ID.';
        }
      }
    
      listadoClientes() {
        // Generar HTMLTable con la lista de clientes
        const tablaClientes = `
          <table>
            <thead>
              <tr>
                <th>DNI</th>
                <th>Nombre</th>
                <th>Usuario</th>
              </tr>
            </thead>
            <tbody>
              ${this.clientes.map(cliente => `<tr><td>${cliente.dniCliente}</td><td>${cliente.nombre} ${cliente.apellido1} ${cliente.apellido2}</td><td>${cliente.usuario}</td></tr>`).join('')}
            </tbody>
          </table>
        `;
        return tablaClientes;
      }
    
      listadoVehiculos() {
        // Generar HTMLTable con la lista de vehículos
        const tablaVehiculos = `
          <table>
            <thead>
              <tr>
                <th>Matrícula</th>
                <th>Marca</th>
                <th>Modelo</th>
              </tr>
            </thead>
            <tbody>
              ${this.vehiculos.map(vehiculo => `<tr><td>${vehiculo.matricula}</td><td>${vehiculo.marca}</td><td>${vehiculo.modelo}</td></tr>`).join('')}
            </tbody>
          </table>
        `;
        return tablaVehiculos;
      }
    
      listadoAlquileres(fechaInicio, fechaFin) {
        // Generar HTMLTable con la lista de alquileres entre las fechas proporcionadas
        const tablaAlquileres = `
          <table>
            <thead>
              <tr>
                <th>ID Alquiler</th>
                <th>ID Cliente</th>
                <th>Nombre Cliente</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>Vehículos</th>
              </tr>
            </thead>
            <tbody>
              ${this.alquileres
                .filter(alquiler => alquiler.fechaInicio >= fechaInicio && alquiler.fechaFin <= fechaFin)
                .map(alquiler => `<tr><td>${alquiler.idAlquiler}</td><td>${alquiler.idCliente}</td><td>${this.obtenerNombreCliente(alquiler.idCliente)}</td><td>${alquiler.fechaInicio}</td><td>${alquiler.fechaFin}</td><td>${alquiler.vehiculos.map(vehiculo => vehiculo.matricula).join(', ')}</td></tr>`)
                .join('')}
            </tbody>
          </table>
        `;
        return tablaAlquileres;
      }
    
      listadoAlquileresCliente(idCliente) {
        // Generar HTMLTable con la lista de alquileres del cliente especificado
        const tablaAlquileresCliente = `
          <table>
            <thead>
              <tr>
                <th>ID Alquiler</th>
                <th>ID Cliente</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>Vehículos</th>
              </tr>
            </thead>
            <tbody>
              ${this.alquileres
                .filter(alquiler => alquiler.idCliente === idCliente)
                .map(alquiler => `<tr><td>${alquiler.idAlquiler}</td><td>${alquiler.idCliente}</td><td>${alquiler.fechaInicio}</td><td>${alquiler.fechaFin}</td><td>${alquiler.vehiculos.map(vehiculo => vehiculo.matricula).join(', ')}</td></tr>`)
                .join('')}
            </tbody>
          </table>
        `;
        return tablaAlquileresCliente;
      }
    
      listadoCochesElectricos() {
        // Filtrar los coches eléctricos y generar HTMLTable
        const cochesElectricos = this.vehiculos.filter(vehiculo => vehiculo instanceof Coche && vehiculo.tipoCombustible === 'eléctrico');
        const tablaCochesElectricos = `
          <table>
            <thead>
              <tr>
                <th>Matrícula</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Número de Plazas</th>
              </tr>
            </thead>
            <tbody>
              ${cochesElectricos
                .sort((a, b) => b.numPlazas - a.numPlazas || a.matricula.localeCompare(b.matricula))
                .map(coche => `<tr><td>${coche.matricula}</td><td>${coche.marca}</td><td>${coche.modelo}</td><td>${coche.numPlazas}</td></tr>`)
                .join('')}
            </tbody>
          </table>
        `;
        return tablaCochesElectricos;
      }
      obtenerNombreCliente(idCliente) {
        // Obtener el nombre completo del cliente dado su ID
        const cliente = this.clientes.find(c => c.usuario === idCliente);
        return cliente ? `${cliente.nombre} ${cliente.apellido1} ${cliente.apellido2}` : 'Cliente no encontrado';
      }
      verificarDisponibilidadVehiculos(alquiler) {
        // Verificar disponibilidad de vehículos para las fechas especificadas en un alquiler
        const vehiculosDisponibles = this.vehiculos.filter((vehiculo) => {
          // Verificar si el vehículo está disponible para todas las fechas del alquiler
          const disponible = !this.alquileres.some((a) => {
            return (
              a.vehiculos.includes(vehiculo) &&
              ((alquiler.fechaInicio >= a.fechaInicio && alquiler.fechaInicio <= a.fechaFin) ||
                (alquiler.fechaFin >= a.fechaInicio && alquiler.fechaFin <= a.fechaFin) ||
                (alquiler.fechaInicio <= a.fechaInicio && alquiler.fechaFin >= a.fechaFin))
            );
          });
          return disponible;
        });
    
        return vehiculosDisponibles;
      }
    }
