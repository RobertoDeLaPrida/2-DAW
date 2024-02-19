import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import md5 from 'md5'

const url = "https://gateway.marvel.com/"
const tsValue = "1";
const ts = "&ts="+tsValue;
const publicKey = "75a64a144ed736c6fb0ed6e431afbadd";
const privateKey = "f0070d957d93c08e466e1c677c46a61086b0760b";
const hash = md5(tsValue + privateKey + publicKey);

export default function Buscador(){
    function buscarPersonaje(){
        let nombre = document.getElementById("inputPersonaje").value;
    }
    function buscarComic(){
        let nombre = document.getElementById("inputComic").value;
        
    }
    function limpiar(){
        const inputPersonaje = document.getElementById("inputPersonaje")
        inputPersonaje.value=""
        const inputComic = document.getElementById("inputComic")
        inputComic.value=""
        const div = document.getElementById("salida");
        div.parentElement.removeChild(div)
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
            <div id='salida'>Tetas gordas</div>
        </div>
    )
}