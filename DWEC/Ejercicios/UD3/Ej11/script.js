function operacion(){
    let a=document.getElementById("a").value
    let b=document.getElementById("b").value
    let c=document.getElementById("c").value
    let res1,res2,discriminante
    discriminante= b**2 - 4*a*c
    if (discriminante>=0){
        res1 = (-b + Math.sqrt(discriminante)) / (2*a)
        res2 = (-b - Math.sqrt(discriminante)) / (2*a)
        document.getElementById("salida").innerHTML="X1="+res1+"<br> X2="+res2
    }
    else {
        document.getElementById("salida").innerHTML="No tiene soluciones"
    }
}