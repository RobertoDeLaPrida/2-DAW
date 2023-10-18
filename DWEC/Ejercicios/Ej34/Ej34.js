//Realizar un programa que acumule (sume) valores ingresados por teclado hasta ingresar el 9999
//(no sumar dicho valor, solamente indica que ha finalizado la carga). Imprimir el valor acumulado e informar si dicho valor es 
//cero, mayor a cero o menor a cero.

let num=0,total=0
num=Number(prompt("Introduce un numero"))
while (num!=9999){
    total=total+num
    num=Number(prompt("Introduce un numero"))
}
document.getElementById("salida").innerHTML="El total de los numeros introducidos es de "+total+"<br>"
if (total==0)
    document.getElementById("salida").innerHTML=total+" es igual a 0"
else 
    if (total>0)
        document.getElementById("salida").innerHTML=total+" es mayor que 0"
    else
    document.getElementById("salida").innerHTML=total+" es menor que 0"
