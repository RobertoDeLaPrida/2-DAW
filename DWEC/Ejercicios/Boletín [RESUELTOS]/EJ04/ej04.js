function agregarProvincia() {
  let codigo = frmEntrada.txtCodigo.value.trim();
  let provincia = frmEntrada.txtProvincia.value.trim();

  if (!existeProvincia(codigo)) {
    let opcion = '<option value="' + codigo + '" >' + provincia + "</option>";
    frmEntrada.lstProvincias.innerHTML += opcion;
  }
}

function existeProvincia(codigo) {
  let encontrado = false;
  let i = 0;
  while (i < frmEntrada.lstProvincias.options.length && !encontrado) {
    if (frmEntrada.lstProvincias.options[i].value == codigo) {
      encontrado = true;
    } else {
      i++;
    }
  }

  i = 0;
  while (i < frmEntrada.lstDestino.options.length && !encontrado) {
    if (frmEntrada.lstDestino.options[i].value == codigo) {
      encontrado = true;
    } else {
      i++;
    }
  }
  return encontrado;
}

function pasarDerecha() {
  for (let provincia of frmEntrada.lstProvincias.options) {
    if (provincia.selected) {
      frmEntrada.lstDestino.append(provincia);
    }
  }
}

function pasarIzquierda() {
  for (let provincia of frmEntrada.lstDestino.options) {
    if (provincia.selected) {
      frmEntrada.lstProvincias.append(provincia);
    }
  }
}
