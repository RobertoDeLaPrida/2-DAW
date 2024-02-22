import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import md5 from 'md5'

const valorTs = 1;
const publicKey = "75a64a144ed736c6fb0ed6e431afbadd";
const privateKey = "f0070d957d93c08e466e1c677c46a61086b0760b";

const valorHash = md5(valorTs+privateKey+publicKey);
const ts = "&ts=" + valorTs;
const apiKey = "&apikey="+publicKey;
const hash = "&hash="+valorHash;



export default function Buscador(){

    function buscarPersonaje(){
        let nombre = document.getElementById("inputPersonaje").value;
        const nameStartWith = "nameStartsWith="+nombre;
        const url = "https://gateway.marvel.com/v1/public/characters?"+nameStartWith+ts+apiKey+hash;

        fetch(url)
        .then(response => {
            if (!response.ok) {
            throw new Error('La solicitud no pudo ser completada: ' + response.status);
            }
            return response.json();
        })
        .then(datos => {
            const divSalida = document.getElementById("salida");
            for (let i = 0; i < datos.data.results.length;i++){ 
                const div = document.createElement("div");

                const img = document.createElement("img");
                const ext = datos.data.results[i].thumbnail.extension
                img.src = datos.data.results[i].thumbnail.path + '.' + ext
                img.className = "fotoPersonaje"


                const h3 = document.createElement("h3");
                h3.textContent = datos.data.results[i].name;

                const h5 = document.createElement("h5");
                h5.textContent ="Id: " + datos.data.results[i].id;

                const p = document.createElement("p");
                if (!datos.data.results[i].description){
                    p.textContent = "Sin descripción"
                }
                else{
                    p.textContent = datos.data.results[i].description;
                }
                
                div.className = "personaje"
                div.appendChild(img);
                div.appendChild(h3);
                div.appendChild(h5);
                div.appendChild(p);
                divSalida.appendChild(div);
            }

        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
        
    }
    function buscarComic(){
        let nombre = document.getElementById("inputComic").value;
        const titleStartWith = "titleStartsWith="+nombre;
        const url = "https://gateway.marvel.com/v1/public/comics?"+titleStartWith+ts+apiKey+hash;

        fetch(url)
        .then(response => {
            if (!response.ok) {
            throw new Error('La solicitud no pudo ser completada: ' + response.status);
            }
            return response.json();
        })
        .then(datos => {
            const divSalida = document.getElementById("salida");
            for (let i = 0; i < datos.data.results.length;i++){ 
                const div = document.createElement("div");

                const img = document.createElement("img");
                const ext = datos.data.results[i].thumbnail.extension
                console.log("La extension de la foto es : "+ext)
                console.log("la url de la foto es: "+datos.data.results[i].thumbnail.path + '.' + ext)
                img.src = datos.data.results[i].thumbnail.path + '.' + ext
                img.className = "fotoComic"


                const h3 = document.createElement("h3");
                h3.textContent = datos.data.results[i].title;

                const p = document.createElement("p");
                if (!datos.data.results[i].description){
                    p.textContent = "Sin descripción"
                }
                else{
                    p.textContent = datos.data.results[i].description;
                }
                
                div.className = "personaje"
                div.appendChild(img);
                div.appendChild(h3);
                div.appendChild(p);
                divSalida.appendChild(div);
            }

        })
        .catch(error => {
            console.error('Error al obtener los datos:', error);
        });
    }
    function limpiar(){
        window.location.reload();
    }

    return(
        <div className=''>
            <div className='buscadores'>
                <div className='buscadorPersonaje'>
                    <div className='textField'>
                        <TextField id="inputPersonaje" label="Buscar un personaje" variant="outlined" className='input'/>
                    </div>
                    <div className='button'>
                        <Button onClick={buscarPersonaje} variant="outlined">Buscar</Button>
                    </div>
                </div>
                <div className='buscadorComic'>
                    <div className='textField'>
                        <TextField id="inputComic" label="Buscar un comic" variant="outlined" className='input'/>
                    </div>
                    <div className='button'>
                        <Button onClick={buscarComic} variant="outlined">Buscar</Button>
                    </div>
                </div>
            </div>
            <div className='limpiar'>
                <Button onClick={limpiar} variant="outlined">Limpiar historial</Button>
            </div>
            <div id='salida'>
            </div>
        </div>
    )
}