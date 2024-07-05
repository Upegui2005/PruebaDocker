import React from "react";
import '../Css/VendedoresDestacados.css'
function VendedoresDestacados({Imagen,Nombre,Cargo}){
    return(
        <>
        <div className="Contenedor-Card-Vendedores-Destacados">
            <div className="Contenedor-Imagen-Vendedor">
                <div className="Overlay"></div>
                <img src={require(`../Imagenes/${Imagen}.png`)} alt={`Imagen del vendedor ${Nombre}`} className="Imagen-Vendedores"/>
                <div className="Texto-Centro">
                    <p className="Nombre">{Nombre}</p>
                    <p className="Cargo">{Cargo}</p>
                <button className="Boton-Centro">Contactar</button>
                </div>
            </div>
        </div>
        </>
    )
}


export default VendedoresDestacados;