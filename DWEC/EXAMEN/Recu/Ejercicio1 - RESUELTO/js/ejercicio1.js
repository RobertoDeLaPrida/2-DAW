const capa = document.getElementsByClassName("capa");
// console.log(capa.length)
const checkBox = document.getElementsByName("tips")
// console.log(checkBox[0].checked)
checkBox[0].addEventListener("change", compurebaCheck)
compurebaCheck()

function compurebaCheck(){
    if (checkBox[0].checked){
        console.log("El checkbox esta activado y ha entrado en el ejercicio")
        ejercicio()
    }else {
        console.log("El checkbox esta desactivado y no se ha limpiado si habia algo anteriormente")
        limpiar()
    }
}


function ejercicio(){

    for (let i=0;i<capa.length;i++){
        //console.log(capa[i].children[0].attributes["data-tip"].value)
        const div = document.createElement("div")
        div.className="tooltip"
        div.id= "div"+i
        div.style = "display : none"
        // console.log("deberia no mostrar el texto por el display none")
        div.textContent=capa[i].children[0].attributes["data-tip"].value
        capa[i].appendChild(div)
        capa[i].addEventListener("mouseenter", cursorDentro)
        capa[i].addEventListener("mouseleave", cursorFuera)
    }
}

function limpiar(){
    for (let i=0;i<capa.length;i++){
        console.log(capa[i].children)
        capa[i].removeChild[1] //no se por que no borra al hijo asi que el checkbox no funciona
        console.log(capa[i].children)
    }
}

function cursorDentro(event){
    // console.log(event.target.children[1])
    event.target.children[1].style = "display : flex"
    // console.log("el cursor entro en el div")
}
function cursorFuera(event){
    event.target.children[1].style = "display : none"
    // console.log("el cursor salio del div")
}