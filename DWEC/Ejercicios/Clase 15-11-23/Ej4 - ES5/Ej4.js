// Figura

function Figura(color) {
  this.color = color;
}

Figura.prototype.getColor = function () {
  return this.color;
};

Figura.prototype.setColor = function (color) {
  this.color = color;
};

Figura.prototype.imprimir = function () {
  return "Soy una figura de color " + this.color;
};

// Rectángulo
function Rectangulo(color, base, altura) {
  Figura.call(this, color); // Llamada al constructor del objeto padre
  this.base = base;
  this.altura = altura;
}

// Aqui es donde heredamos propiedades y metodos
Rectangulo.prototype = Object.create(Figura.prototype);
Rectangulo.prototype.constructor = Rectangulo;

Rectangulo.prototype.calcularArea = function () {
  return 0.5 * this.base * this.altura;
};

let r = new Rectangulo("rojo", 7, 2);

console.log(r.imprimir() + " de area " + r.calcularArea());
