import React, { useState } from "react";
import Logo from './LogoInicio'
import '../Css/reestablecer.css';
import {ReestablecerContraseña,VisibilidadContraseña} from '../Validaciones/Formularios'
import { AiFillEyeInvisible,AiFillEye } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router";

axios.defaults.withCredentials = true;

function Reestablecer(){
  const [ManejarContraseña,setManejarContraseña] = useState(true);
  const [Mensaje,setMensaje] = useState('');
  const [OcultarContraseña, setOcultarContraseña] = useState(false);
  const [OcultarContraseñaUno, setOcultarContraseñaUno] = useState(false);
  const navigate = useNavigate();

  const visibilidadContraseña = () => {
    VisibilidadContraseña(OcultarContraseña, setOcultarContraseña);
  };
  const visibilidadContraseñaUno = () => {
    VisibilidadContraseña(OcultarContraseñaUno, setOcultarContraseñaUno);
  };

  const validar = (event)=>{
    if(event && event.preventDefault){
      event.preventDefault();
    }
    const contraseña = document.querySelector("input[name='Nueva_Contraseña']").value; 
    const ContraseñaValidar = document.querySelector("input[name='Validar_Contraseña']").value; 
    ReestablecerContraseña(contraseña,ContraseñaValidar,setManejarContraseña,setMensaje);
    cambiarContraseña(event, contraseña, ContraseñaValidar);
  }

  const cambiarContraseña = async (event, contraseña, ContraseñaValidar) => {
    event.preventDefault();
    console.log(contraseña);
    console.log(ContraseñaValidar);
    try {
      const response = await axios.post('/cambioPassword', {
        Nueva_Contraseña: contraseña,
        Validar_Contraseña: ContraseñaValidar
      });
      console.log(response.data)
      navigate('/')
    } catch (error) {
      console.error('Error al conectar api'+ error);
    }
  }
  
  return(
  <>
  <section>
    <Logo />
  </section>
  <section className="Reestablecer">
    <div className="Contenedor-Principal">
      <div className="Contenedor-Formulario">
        <h2>Ingresa tu nueva contraseña</h2>
        <form className="Formulario-Reestablecer" onSubmit={validar}>
          <label>Nueva contraseña*</label>
          <div className="Input-Ojo">
              <input className="Input-Contraseña"   name="Nueva_Contraseña" type={OcultarContraseña ? "text" : "password"} placeholder="Ingresa tu nueva contraseña"/>
              <div className="Boton-Ojo">
                {
                  OcultarContraseña ? <AiFillEye  className="Icono-Contraseña" onClick={visibilidadContraseña} /> :  <AiFillEyeInvisible className="Icono-Contraseña" onClick={visibilidadContraseña} />
                }
              </div>
            </div>
            <label>Confirmar contraseña*</label>
            <div className="Input-Ojo">
              <input className="Input-Contraseña"  name="Validar_Contraseña" type={OcultarContraseñaUno ? "text" : "password"} placeholder="Verifica tu contraseña"/>
              <div className="Boton-Ojo">
                {
                  OcultarContraseñaUno ? <AiFillEye  className="Icono-Contraseña" onClick={visibilidadContraseñaUno} /> :  <AiFillEyeInvisible className="Icono-Contraseña" onClick={visibilidadContraseñaUno} />
                }
              </div>
            </div>
            <p className="Validacion-Registrar">
                {
                ManejarContraseña && <div className="Mensaje">{Mensaje}</div>
                }
            </p>
          <button type="submit" className="Boton-Formulario">Reestablecer</button>
        </form>
      </div>
    </div>
  </section>
  </>
)}

export default Reestablecer;