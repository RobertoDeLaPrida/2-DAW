import Cabecera from "./componentes/Cabecera";
import logo from "./Marvel_Logo.png"
import Buscador from "./componentes/Buscador"
import Contador from "./componentes/Contador"

export default function App(){
  return(
    <div>
      <div>
        <Contador />
        <nav>
          <img src={logo} className="App-logo" alt="logo" />
          <Cabecera />
          <hr></hr>
        </nav>
        <div className="buscador">
        <Buscador />
        </div>
        </div>
    </div>
  )
}
