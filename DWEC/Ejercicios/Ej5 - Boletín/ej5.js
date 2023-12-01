class Bonobus {
  constructor() {}
  picarViaje(linea, dia, mes, anio, hh, mm) {}
}

class BonoDiezViajes extends Bonobus {
  _nViajes;
  constructor() {
    super();
    this._nViajes = 10;
  }
  get nViajes() {
    return this._nViajes;
  }
  set nViajes(value) {
    this._nViajes = value;
  }
  picarViaje(linea, dia, mes, anio, hh, mm) {
    if (this.nViajes > 0) {
      this.nViajes--;
      return true;
    } else {
      return false;
    }
  }
}

class BonoDiezViajesConTrasbordo extends BonoDiezViajes {
  _ultimaLinea;
  _diaUltimaLinea;
  _mesUltimaLinea;
  _anioUltimaLinea;
  _horaUltimaLinea;
  _minutosUltimaLinea;

  constructor() {
    super();
  }

  get ultimaLinea() {
    return this._ultimaLinea;
  }
  set ultimaLinea(value) {
    this._ultimaLinea = value;
  }
  get diaUltimaLinea() {
    return this._diaUltimaLinea;
  }
  set diaUltimaLinea(value) {
    this._diaUltimaLinea = value;
  }
  get minutosUltimaLinea() {
    return this._minutosUltimaLinea;
  }
  set minutosUltimaLinea(value) {
    this._minutosUltimaLinea = value;
  }
  get horaUltimaLinea() {
    return this._horaUltimaLinea;
  }
  set horaUltimaLinea(value) {
    this._horaUltimaLinea = value;
  }
  get anioUltimaLinea() {
    return this._anioUltimaLinea;
  }
  set anioUltimaLinea(value) {
    this._anioUltimaLinea = value;
  }
  get mesUltimaLinea() {
    return this._mesUltimaLinea;
  }
  set mesUltimaLinea(value) {
    this._mesUltimaLinea = value;
  }

  picarViaje(linea, dia, mes, anio, hh, mm) {
    const MILISEGUNDOSEN1HORA = 60 * 60 * 1000;
    const ahora = new Date(anio, mes - 1, dia, hh, mm, 0, 0);
    const ultimoViaje = new Date(
      this.anioUltimaLinea,
      this.mesUltimaLinea - 1,
      this.diaUltimaLinea,
      this.horaUltimaLinea,
      this.minutosUltimaLinea,
      0,
      0
    );
    const difMilisegundos = ahora.getTime() - ultimoViaje.getTime();
    const menosDeUnaHora = difMilisegundos < MILISEGUNDOSEN1HORA;

    if (menosDeUnaHora && this.ultimaLinea != linea) {
      return true;
    } else if (this.nViajes > 0) {
      this.nViajes--;
      this.ultimaLinea = linea;
      this.diaUltimaLinea = dia;
      this.mesUltimaLinea = mes;
      this.anioUltimaLinea = anio;
      this.horaUltimaLinea = hh;
      this.minutosUltimaLinea = mm;
      return true;
    } else {
      return false;
    }
  }
}

class BonoTarifaPlana extends Bonobus {
  _fechaCaducidad;
  constructor() {
    super();
  }
  get fechaCaducidad() {
    return this._fechaCaducidad;
  }
  set fechaCaducidad(value) {
    this._fechaCaducidad = value;
  }
  picarViaje(dia, mes, anio, hh, mm) {
    const actual = new Date(anio, mes - 1, dia, hh, mm, 0, 0);
    if (actual <= this.fechaCaducidad) {
      return true;
    } else {
      return false;
    }
  }
}

class Bono1Dia extends BonoTarifaPlana {
  constructor() {
    super();
    const ahora = new Date();
    const MILISEGUNDOS1DIA = 24 * 60 * 60 * 1000;
    this.fechaCaducidad = new Date(ahora.getTime() + MILISEGUNDOS1DIA);
  }
}

class Bono3Dia extends BonoTarifaPlana {
  constructor() {
    super();
    const ahora = new Date();
    const MILISEGUNDOS3DIAS = 3 * 24 * 60 * 60 * 1000;
    this.fechaCaducidad = new Date(ahora.getTime() + MILISEGUNDOS3DIAS);
  }
}

class Bono1Mes extends BonoTarifaPlana {
  constructor() {
    super();
    const ahora = new Date();
    const MILISEGUNDOS1MES = 30 * 24 * 60 * 60 * 1000;
    this.fechaCaducidad = new Date(ahora.getTime() + MILISEGUNDOS1MES);
  }
}

class Bono1Anio extends BonoTarifaPlana {
  constructor() {
    super();
    this.fechaCaducidad = new Date();
    this.fechaCaducidad.setFullYear(this.fechaCaducidad.getFullYear() + 1);
  }
}

//Prueba de instanciación de objetos

let b1 = new BonoDiezViajes();
let b2 = new BonoDiezViajesConTrasbordo();
let b3 = new Bono1Dia();
let b4 = new Bono3Dia();
let b5 = new Bono1Mes();
let b6 = new Bono1Anio();

console.log("b1 nViajes: " + b1.nViajes);
console.log(b1.picarViaje(34, 24, 11, 2023, 12, 56));
console.log("b1 nViajes: " + b1.nViajes);
console.log(b1.picarViaje(34, 25, 11, 2023, 12, 56));

console.log("b2 nViajes: " + b2.nViajes);
console.log(b2.picarViaje(34, 24, 11, 2023, 12, 56));
console.log("b2 nViajes: " + b2.nViajes);
console.log(b2.picarViaje(32, 24, 11, 2023, 13, 18));
console.log("b2 nViajes: " + b2.nViajes);
console.log(b2.picarViaje(34, 24, 11, 2023, 13, 42));
console.log("b2 nViajes: " + b2.nViajes);
console.log(b2.picarViaje(31, 24, 11, 2023, 14, 58));
console.log("b2 nViajes: " + b2.nViajes);

console.log(b3.fechaCaducidad);
console.log(b3.picarViaje(27, 11, 2023, 14, 58));
console.log(b3.picarViaje(27, 12, 2023, 12, 28));

console.log(b6.fechaCaducidad.toLocaleDateString());
