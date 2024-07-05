import {React} from "react";
import '../Css/Barra-Lateral.css';

function BarraLateral({Titulo,Imagen,Descuento}){
  return(
    <>
      <div className="Card-Ofertas">
        <p className="Texto-Titulo-Card">{Titulo}</p>
        <div className="Contenedor-Imagen-Lateral">
          <img src={require(`../Imagenes/${Imagen}.png`)} alt="" className="Imagen-Lateral"/>
          <div className="Icono-Descuento">
          <img src={require(`../Imagenes/${Descuento}.png`)} alt="Descuento" className="Descuento" />
          </div>
        </div>
        <div className="Contenedor-Boton-Lateral">
          <button className="Boton-Lateral">Solicitar</button>
        </div>
      </div>
    </>
  );
}

export default BarraLateral;