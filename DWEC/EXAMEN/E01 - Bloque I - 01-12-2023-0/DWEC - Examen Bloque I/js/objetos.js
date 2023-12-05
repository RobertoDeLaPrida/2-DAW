class Ordenador {
    #marca
    #modelo
    #precio
    constructor (marca,modelo,precio){
        this.#marca = marca;
        this.#modelo = modelo;
        this.#precio = precio;
    }
    get marca() {
        return this.#marca;
    }
    set marca(marca){
        this.#marca = marca;
    }
    get modelo() {
        return this.#modelo;
    }
    set modelo(modelo){
        this.#marca = modelo;
    }
    get precio() {
        return this.#precio;
    }
    set precio(precio){
        this.#precio = precio;
    }
    toHTMLRow() {
        let fila = "<tr>";
        fila += "<td>" + this.marca + "</td>";
        fila += "<td>" + this.modelo + "</td>";
        fila += "<td>" + this.precio + "</td></tr>";
        return fila;
    }
}
class Sobremesa extends Ordenador {
    #tarjetaGrafica
    constructor (marca,modelo,precio,tarjetaGrafica){
        super(marca,modelo,precio);
        this.#tarjetaGrafica = tarjetaGrafica;
    }
    get tarjetaGrafica(){
        return this.#tarjetaGrafica;
    }
    set tarjetaGrafica(tarjetaGrafica){
        this.#tarjetaGrafica = tarjetaGrafica;
    }
    toHTMLRow() {
        let fila = super.toHTMLRow();
        fila = fila.slice(0, fila.length - 5); // Para quitar el </tr>
        fila += "<td>" + this.tarjetaGrafica + "</td></tr>";
        return fila;
    }
}
class Portatil extends Ordenador {
    #discoSSD
    #pulgadas
    constructor(marca,modelo,precio,discoSSD,pulgadas){
        super(marca,modelo,precio);
        this.#discoSSD = discoSSD;
        this.#pulgadas = pulgadas;
    }
    get discoSSD(){
        return this.discoSSD;
    }
    set discoSSD(discoSSD){
        this.#discoSSD = discoSSD;
    }
    get pulgadas(){
        return this.#pulgadas;
    }
    set pulgadas(pulgadas){
        this.#pulgadas = pulgadas;
    }
}
class StockOrdenadores {
    #ordenador
    #stock
    constructor (ordenador,stock){
        this.#ordenador = ordenador;
        this.#stock = stock;
    }
    get ordenador(){
        return this.#ordenador;
    }
    set ordenador(ordenador){
        this.#ordenador = ordenador;
    }
    get stock(){
        return this.stock;
    }
    set stock(stock){
        this.stock = stock;
    }
    toHTMLRow() {
        let fila = "<tr>";
        fila += "<td>" + this.ordenador + "</td>";
        fila += "<td>" + this.stock + "</td></tr>";
        return fila;
    }
}
class Tienda {
    #catalogo
    #stock
    constructor(){
        this.#catalogo = [];
        this.#stock = [];
    }
    get catalogo(){
        return this.#catalogo;
    }
    set catalogo(catalogo){
        this.#catalogo = catalogo;
    }
    get stock(){
        return this.#stock;
    }
    set stock(stock){
        this.#stock = stock;
    }

    altaCatalogo(ordenador){
    let encontrado = this.ordenador.filter((elem) => elem.modelo == ordenador.modelo).length == 1 || this.ordenador.filter((elem) => elem.marca == ordenador.marca).length == 1 ;
        if (!encontrado) {
        this.catalogo.push(ordenador);
        return true;
        } else {
        return false;
        }
    }

    entradaStock(marca,modelo,unidades){
        for (ordenador of this.#stock){
            if (ordenador instanceof marca && ordenador instanceof modelo){
                alert("El numero nuevo de unidades en stock es de: "+ordenador.stock+unidades)
            }
            else{
                alert("Error: El ordenador no esta en el catalogo")
            }
        }
    }

    salidaStock(marca,modelo,unidades){
        for (ordenador of this.#stock){
            if (ordenador instanceof marca && ordenador instanceof modelo){
                alert("El nuevo numero de unidades en stock es de: "+ordenador.stock-unidades)
            }
            else{
                alert("Error: El ordenador no esta en el catalogo")
            }
        }

    }

    listadoCatalogo(){
        let salida = "<table border='1'>";
    salida +=
      "<thead><tr><th>Tipo</th><th>marca</th><th>Modelo</th><th>Precio</th><th>Pulgadas</th><th>Disco SSD</th><th>Tarjeta Gráfica</th></thead>";
      for (let ordenador of this.#catalogo) {
        salida += ordenador.toHTMLRow();
      }
      salida += "</tbody></table>";

    }

    listadoStock(){
        let salida = "<table border='1'>";
    salida +=
      "<thead><tr><th>Tipo</th><th>marca</th><th>Modelo</th><th>Precio</th><th>Pulgadas</th><th>Disco SSD</th><th>Tarjeta Gráfica</th></thead>";
      for (let ordenador of this.#stock) {
        salida += ordenador.toHTMLRow();
      }
      salida += "</tbody></table>";
    return salida;
    }

    numPortatilesStock(){
        let contador = 0;
        for (let ordenador of this.catalogo) {
            if (ordenador instanceof Portatil) {
              contador++;
            }
          }
          return contador;
    }

    numSobremesaStock(){
        let contador = 0;
        for (let ordenador of this.catalogo) {
            if (ordenador instanceof Sobremesa) {
              contador++;
            }
          }
          return contador;
    }

    importeTotalStock(precio,valor){
        let total = 0;
        total = precio*valor;
        return total;
    }
    
}