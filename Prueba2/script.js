function procesarFormulario() {
    const num = formNumero.Numero.value;
    let salida ="";
    for(let i=1;i<10;i++){
        salida+=num+ " x " +i+" = "+num*i+"<br>";
    }   
    document.getElementById("tabla").innerHTML = salida;
}