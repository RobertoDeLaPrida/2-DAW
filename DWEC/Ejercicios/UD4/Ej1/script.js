// Crear una función constructora de objetos Producto. 
// Dichos productos tendrán tres atributos, uno de tipo cadena de caracteres llamado nombre, otro de tipo entero llamado unidades y otro de tipo real llamado precio.
// Aparte de estos tres atributos también contendría los siguientes métodos:
// valorEnStock: que no recibe parámetros y devuelve el importe total de las unidades disponibles, es decir,
// la multiplicación de las unidades por el precio del producto.
// incrementarStock: que recibe un entero como parámetro y aumenta el número de unidades en la cantidad indicada en el parámetro.
// disminuirStock: que recibe un entero como parámetro y disminuye el número de unidades en la cantidad indicada en el parámetro.
// Todos los métodos consultores (getter) y modificadores (setter) de los tres atributos descritos anteriormente, teniendo en cuenta
// que si por error se intentara modificar el atributo precio con un valor negativo, este debería guardarse automáticamente como positivo.

function Producto(nombre, unidades, precio) {
    // Atributos
    this.nombre = nombre;
    this.unidades = unidades;
    this.precio = Math.abs(precio); // Precio se guarda como positivo
  
    // Métodos consultores (getter)
    this.getNombre = function () {
      return this.nombre;
    };
  
    this.getUnidades = function () {
      return this.unidades;
    };
  
    this.getPrecio = function () {
      return this.precio;
    };
  
    // Métodos modificadores (setter)
    this.setNombre = function (nuevoNombre) {
      this.nombre = nuevoNombre;
    };
  
    this.setUnidades = function (nuevasUnidades) {
      this.unidades = nuevasUnidades;
    };
  
    this.setPrecio = function (nuevoPrecio) {
      this.precio = Math.abs(nuevoPrecio); // Precio se guarda como positivo
    };
  
    // Métodos adicionales
    this.valorEnStock = function () {
      return this.unidades * this.precio;
    };
  
    this.incrementarStock = function (cantidad) {
      this.unidades += cantidad;
    };
  
    this.disminuirStock = function (cantidad) {
      if (this.unidades >= cantidad) {
        this.unidades -= cantidad;
      } else {
        console.log("No hay suficientes unidades en stock.");
      }
    };
}