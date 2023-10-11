//Realizar un programa que liste los 100 primeros números primos.
function esPrimo(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;

  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }

  return true;
}

function obtenerPrimerosPrimos(cantidad) {
  const primerosPrimos = [];
  let num = 2;

  while (primerosPrimos.length < cantidad) {
    if (esPrimo(num)) {
      primerosPrimos.push(num);
    }
    num++;
  }

  return primerosPrimos;
}
const primeros100Primos = obtenerPrimerosPrimos(100);
document.getElementById("salida").innerHTML=primeros100Primos;