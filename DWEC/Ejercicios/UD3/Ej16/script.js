const intervalo = setInterval(contar,1000);
setTimeout(darFecha,20000);
let contador=0

function darFecha(){
    let fecha = new Date()
    document.getElementById("salida").innerHTML=fecha
    clearInterval(intervalo)
}

function contar(){
    contador=contador+1
    document.getElementById("salida").innerHTML="Quedan "+Number(20-contador)+" sec para mostrar la fecha"
}