class Mascota {
    idMascota;
    peso;
    constructor(idMascota, peso){
    this.idMascota = idMascota;
    this.peso = peso;
    }
    toHTMLrow(){
        let fila = "<tr>";
        fila += "<td>" +this.idMascota+ "</td>";
        fila += "<td>" +this.peso+ "</td>";
    }
}

class Perro extends Mascota{
    raza
    constructor (idMascota,peso,raza){
        super(idMascota,peso);
        this.raza = raza;
    }
    toHTMLrow(){
        let fila = super.toHTMLrow();
        fila = fila.slice(0, fila.length - 5);
        fila += "<td>" +this.raza+ "</td>";
    }
}