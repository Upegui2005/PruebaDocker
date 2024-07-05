import React from "react";
import logotipo from '../Imagenes/Logotipo.jpg';
import '../Css/LogoInicio.css'


function logo(){
  return(
    <section>
      <div className="Contenedor-Logo">
        <img src={logotipo} alt="Logo-Coorporativo" className="LogoTipo" />
      </div>
    </section>
  );
}
export default logo;