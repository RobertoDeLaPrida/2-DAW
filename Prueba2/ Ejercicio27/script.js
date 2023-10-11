let mayores=0,menores=0;
function procesarNotas(){
    const nota1 = formularioNotas.Nota1.value;
    const nota2 = formularioNotas.Nota2.value;
    const nota3 = formularioNotas.Nota3.value;
    const nota4 = formularioNotas.Nota4.value;
    const nota5 = formularioNotas.Nota5.value;
    pasarNotas(nota1);
    pasarNotas(nota2);
    pasarNotas(nota3);
    pasarNotas(nota4);
    pasarNotas(nota5);
    document.getElementById("salida").innerHTML="Mayores de 7: "+mayores+"<br>Menores de 7: "+menores;
}
function pasarNotas(nota){
    return(nota>=7)?mayores++:menores++;
}