import React from 'react';

// Definir la función para multiplicar
function multiplicar(a, b) {
  return a * b;
}

const element1 = <h1>{2 + 2}</h1>;

const url = 'https://i.pinimg.com/originals/57/61/5b/57615b8c0092a66c1d4058b1692955cc.gif';

const foto = <img src={url} alt="Foto de mi dispositivo" />;

const element2 = <h2>{multiplicar(2, 3)}</h2>;

function Ej5() {
  return (
    <div>
      {element1}
      {foto}
      {element2}
    </div>
  );
}

export default Ej5;
