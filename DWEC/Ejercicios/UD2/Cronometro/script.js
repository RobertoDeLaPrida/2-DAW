let hora=0,min=0,sec=0,milisec=0

function iniciaCron() {
    milisec=milisec+1
    compruebaMilisec()
    compruebaSec()
    compruebaMin()
    document.getElementById("hora").innerHTML=hora+" :";
    document.getElementById("min").innerHTML=min+" :";
    document.getElementById("sec").innerHTML=sec+" :";
    document.getElementById("milisec").innerHTML=milisec;
}
function compruebaMilisec(){
    if(milisec>=100){
        sec=sec+1
        milisec=0
    }
}
function compruebaSec(){
    if(sec==60){
        min=min+1
        sec=0
    }
}
function compruebaMin(){
    if(min==60){
        hora=hora+1
        min=0
    }
}