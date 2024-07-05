import React from "react";
import Logo from '../Imagenes/Logotipo.jpg';
import '../Css/Footer.css'

function Footer(){
    return(
        <>
        <div className="Footer">
            <div className="Logo">
                <img src={Logo} alt="Logotipo Empresarial" className="Imagen-Footer" />
            </div>
            <div className="Informacion-Footer">
                <p class="item">Contáctanos<span class="hover-text">Puedes escribirnos directamente a este correo asegura2.2024@gmail.com </span></p>
                <p class="item">Donde nos ubicamos<span class="hover-text">Actualmente nos ubicamos en Carrera 52 # 14-30 Of 424 Centro Empresarial Olaya Herrera  </span></p>
                <p class="item">¿Quienes somos?<span class="hover-text">Somos una compañía de polizas de seguro, donde te brindamos la mejor atención, rápida y efectiva</span></p>
            </div>
        </div>
        </>
    )
}

export default Footer