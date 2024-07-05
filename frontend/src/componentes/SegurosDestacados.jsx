import React, { useState } from "react";
import '../Css/SegurosDestacados.css'
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

function SegurosDestacados({Imagen,Seguro,Precio}){
  const [ManejarCorazon,setManejarCorazon] = useState(false);
  const ModularCorazon =()=>{
    setManejarCorazon(!ManejarCorazon);
  }
  return(
    <>
    <div className="Contenedor-Card-Seguros">
    <div className="Contenedor-Imagen-Seguros">
        <img src={require(`../Imagenes/Seguro-${Imagen}.jpg`)} alt="Imagen-Servicio" className="Imagen-Card-Seguros"/>
        <div className="Overlay"></div>
        <button className="Boton-Centro">Solicitar</button>
    </div>

    <div className="Texto-Card-Seguros">
        <p className="Tipo-Seguro">Seguro de {Seguro}</p>
        <p className="Icono-Corazon" onClick={ModularCorazon}>
            {ManejarCorazon ? <AiFillHeart /> : <AiOutlineHeart/>}
        </p>
    </div>
    <p className="Precio-Seguro"> $ {Precio}</p>
</div>

    </>
  )
}

export default SegurosDestacados;