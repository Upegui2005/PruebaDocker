import React, { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import '../Css/BarraNavegacion.css';
import logo from '../Imagenes/Logotipo.jpg'
import { CiUser } from "react-icons/ci";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown,DropdownItem,DropdownMenu,DropdownToggle} from 'reactstrap';
import { useNavigate } from "react-router";


function BarraNavegacion ({nombreUsuario}){
  const navigate = useNavigate();
  const logout = async () => {
    try{
      const response = await axios.post('/logout');
      console.log(response.data)
      navigate('/')
    }catch (error){
      console.error('Error' + error)
    }
  };
  //Vamos a crear un hock para poder verificar y  modificar el estado del nuestro dropdown
  const [dropdown,setDropdow] = useState(false);
  const abrircerrardropdow=()=>{
    setDropdow(!dropdown);
  };
  const MisSeguros=()=>{
    navigate('/MisSeguros');
  };
  const Home=()=>{
    navigate('/Home')
  };
  // const [isOpen, setIsOpen] = useState(false);
  // const toggleDropdown = () =>  setIsOpen(!isOpen);
  return(
    <section className="Header">
    <div className="contenedor-barra">
      <div className="contenedor-logo">
        <img className="logo" src={logo}alt="Logo" onClick={Home}/>
      </div>
      <div className="icono-persona">
        <div className="elemento-despliegue">
          <Dropdown isOpen={dropdown} toggle={abrircerrardropdow}>
            <DropdownToggle className="boton-despliegue">
              {nombreUsuario} <AiOutlineDown className="Flecha-Boton"/>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem className="items-drop">Perfil</DropdownItem>
              <DropdownItem className="items-drop" onClick={MisSeguros}>Mis seguros</DropdownItem>
              <DropdownItem className="items-drop" onClick={logout}>Cerrar Sesión</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="Icono">
          <CiUser />
        </div>
      </div>
    </div>
    </section>
    );
};
export default BarraNavegacion