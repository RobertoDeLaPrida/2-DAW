let op1,op2,res
function sumar(){
    op1=Number(document.getElementById("op1").value)
    op2=Number(document.getElementById("op2").value)
    res=op1+op2
    resultado(res)
}
function restar(){
    op1=Number(document.getElementById("op1").value)
    op2=Number(document.getElementById("op2").value)
    res=op1-op2
    resultado(res)
}
function multiplica(){
    op1=Number(document.getElementById("op1").value)
    op2=Number(document.getElementById("op2").value)
    res=op1*op2
    resultado(res)
}
function divide(){
    op1=Number(document.getElementById("op1").value)
    op2=Number(document.getElementById("op2").value)
    res=op1/op2
    resultado(res)
}

function resultado(res){
    console.log("Javi maricon")
    document.getElementById("salida").innerHTML=res;
}