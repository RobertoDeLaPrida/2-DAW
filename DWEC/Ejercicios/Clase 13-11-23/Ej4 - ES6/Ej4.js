class Figura {
  #color;
  constructor(color) {
    this.#color = color;
  }
  imprimir() {
    return "Soy una figura de color " + this.#color;
  }
  get color() {
    return this.#color;
  }
  set color(color) {
    this.#color = color;
  }
}

class Rectangulo extends Figura {
  #base;
  #altura;
  constructor(color, base, altura) {
    super(color);
    this.#base = base;
    this.#altura = altura;
  }
  get base() {
    return this.#base;
  }
  set base(base) {
    this.#base = base;
  }
  get altura() {
    return this.#altura;
  }
  set altura(altura) {
    this.#altura = altura;
  }
  calcularArea() {
    return this.base * this.altura;
  }
  imprimir() {
    return (
      "Soy una rectángulo de color " +
      this.color +
      " y de área " +
      this.calcularArea()
    );
  }
}

class Circulo extends Figura {
  #radio;
  constructor(color, radio) {
    super(color);
    this.#radio = radio;
  }
  get radio() {
    return this.#radio;
  }
  set radio(value) {
    this.#radio = value;
  }
  calcularArea() {
    return Math.PI * Math.pow(this.radio, 2);
  }
  imprimir() {
    return (
      "Soy una círculo de color " +
      this.color +
      " y de área " +
      this.calcularArea()
    );
  }
}

let f = new Figura("verde");
let r = new Rectangulo("rojo", 10, 6);
let c = new Circulo("azul", 8);

console.log(f);
console.log(f.imprimir());
console.log(r);
console.log(r.imprimir());
console.log(c);
console.log(c.imprimir());
