class Producto {
    constructor(idProducto, nombreProducto, precioUnidad, idCategoria) {
        this.idProducto = idProducto;
        this.nombreProducto = nombreProducto;
        this.precioUnidad = precioUnidad;
        this.idCategoria = idCategoria;
    }
}

// Definición de la clase Catálogo
class Catalogo {
    constructor() {
        this.productos = [];
    }

    addProducto(idProducto, nombreProducto, precioUnidad, idCategoria) {
        const producto = new Producto(idProducto, nombreProducto, precioUnidad, idCategoria);
        this.productos.push(producto);
    }
}

// Definición de la clase LineaPedido
class LineaPedido {
    constructor(unidades, idProducto) {
        this.unidades = unidades;
        this.idProducto = idProducto;
    }
}

// Definición de la clase Cliente
class Cliente {
    constructor(nombre, cuentaAbierta) {
        this.nombre = nombre;
        this.cuentaAbierta = cuentaAbierta;
    }
}

// Definición de la clase Gestor
class Gestor {
    constructor(categorias, comerciales) {
        this.categorias = categorias;
        this.comerciales = comerciales;
        this.clientes = [];
        this.comercialActual = 0;
        this.clienteActual = 0;
        this.pedidos = [];
    }

    agregarCliente(comercialIndex, cliente) {
        if (!this.clientes[comercialIndex]) {
            this.clientes[comercialIndex] = [];
        }
        this.clientes[comercialIndex].push(cliente);
    }

    agregarPedido(comercialIndex, clienteIndex, lineaPedido) {
        if (!this.pedidos[comercialIndex]) {
            this.pedidos[comercialIndex] = [];
        }
        if (!this.pedidos[comercialIndex][clienteIndex]) {
            this.pedidos[comercialIndex][clienteIndex] = [];
        }
        this.pedidos[comercialIndex][clienteIndex].push(lineaPedido);
    }
}