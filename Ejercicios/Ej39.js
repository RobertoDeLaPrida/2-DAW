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
  
  const numerosPrimosMenoresDe100 = [];
  
  for (let i = 2; i < 100; i++) {
    if (esPrimo(i)) {
      numerosPrimosMenoresDe100.push(i);
    }
  }
  
  console.log(numerosPrimosMenoresDe100);
  