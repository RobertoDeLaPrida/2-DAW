const tabla = document.querySelector("tbody")
tabla.addEventListener("mouseenter",cursorDentro)
tabla.addEventListener("mouseleave",cursorFuera)

for (let i=0;i<tabla.childElementCount;i++){
    // console.log(tabla.children[i])
    let division = i % 2
    if (division == 1){
        tabla.children[i].className="destacada"
    }
    
}

function cursorDentro(event){
    for (let i=0;i<event.target.childElementCount;i++){
        let division = i % 2
        if (division == 1){
            event.target.children[i].className=""
            event.target.children[i-1].className="destacada"
        }
    }
}

function cursorFuera(event){
    for (let i=0;i<event.target.childElementCount;i++){
        let division = i % 2
        if (division == 0){
            event.target.children[i].className=""
             event.target.children[i+1].className="destacada"
        }
    }
}