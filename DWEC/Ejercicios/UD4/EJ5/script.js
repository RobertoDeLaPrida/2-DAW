class Figura {
    constructor(color) {
        this.color = color;
    }

    getColor() {
        return this.color;
    }

    setColor(color) {
        this.color = color;
    }

    imprimir() {
        return "Soy una figura de color " +this.color;
    }
}

class Rectangulo extends Figura {
    constructor(color, base, altura) {
        super(color);
        this.base = base;
        this.altura = altura;
    }

    getBase() {
        return this.base;
    }

    setBase(base) {
        this.base = base;
    }

    getAltura() {
        return this.altura;
    }

    setAltura(altura) {
        this.altura = altura;
    }

    calcularArea() {
        return this.base * this.altura;
    }

    imprimir() {
        return "Soy un rectángulo "+this.color+" de "+this.calcularArea() +" cm2";
    }
}

class Circulo extends Figura {
    constructor(color, radio) {
        super(color);
        this.radio = radio;
    }

    getRadio() {
        return this.radio;
    }

    setRadio(radio) {
        this.radio = radio;
    }

    calcularArea() {
        return Math.PI * Math.pow(this.radio, 2);
    }

    imprimir() {
        return "Soy un círculo "+this.color + " de " + this.calcularArea()+ " cm2 ";
    }
}
