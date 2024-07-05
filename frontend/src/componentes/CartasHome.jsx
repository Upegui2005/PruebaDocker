import React from "react";
import '../Css/Cards.css';

function Cards({Titulo, Imagen}){
  return(
  <>
  <section className="Contenedor-Cards">
    <div className="Cards">
      <p className="Titulo-Card"> {Titulo} </p>
      <div className="Contenedor-Imagen-Card" >
        <img className="Imagen" src={require(`../Imagenes/${Imagen}.png`)} alt={`Imagen-Servicio-${Imagen}`}/>
      </div>
    </div>
  </section>
  </>
)
}
export default Cards;