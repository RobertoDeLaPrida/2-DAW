import Cabecera from "./componentes/Cabecera";
import logo from "./Marvel_Logo.png"
import Buscador from "./componentes/Buscador"

export default function App(){
  return(
    <div>
      <nav>
        <img src={logo} className="App-logo" alt="logo" />
        <Cabecera />
        <hr></hr>
      </nav>
      <div className="buscador">
      <Buscador />
      </div>
    </div>
  )
}
