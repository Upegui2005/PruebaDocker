import BarraNavegacion from "./barraNavegacion";
import { AiOutlineSearch } from "react-icons/ai";
import '../Css/MisSeguros.css'
import CardsMisSeguros from './CardsMisSeguros';
import Footer from './Footer';
import { useEffect, useState } from "react";
import axios from "axios";
function MisSeguros(){

  const [session, setSession] =useState({userId: []});

  useEffect(() => {
    const obtenerSession = async () => {
      try {
        const response = await axios.post('/session');
        console.log(response.data);
        setSession(response.data);
      } catch (error) {
        console.error('Error' + error);
      }
    };

    obtenerSession();
  }, [])

  const nombreUsuario = session.userId.length > 2 ? session.userId[2] : '';

  const [miSeguros, setMiSeguros] = useState([]);

  useEffect(() => {
    const obtenerMiSeguros = async () => {
      try {
        const response = await axios.post('/home/misSeguros');
        console.log(response.data);
        setMiSeguros(response.data)
      }catch (error){
        console.error(error)
      }
    };
    obtenerMiSeguros();
  }, []);

  return(
    <>
    <BarraNavegacion nombreUsuario={nombreUsuario}/>
    <div className="Buscador-MiSeguros">
        <form className="Formulario-MisSeguros">
          <div className="Buscador">
          <input placeholder="Buscar"/>
            <span className="Icono-Buscar">
          {<AiOutlineSearch className="Icono" />}
        </span>
          </div>
          <button type="submit" className="Boton-Buscar"> Buscar </button>
        </form>
    </div>
    <div className="Contenedor-Titulo-Seguros">
      <p className="Texto-Seguros-Seguros"> Mis Seguros </p>
    </div>
    <section className="Contenedor-Cards-Seguros">
      {miSeguros.map((data)=>(
        <CardsMisSeguros
          id={data.ID}
          Imagen='Hombre'
          Seguro={data.Nombre_Seguro}
          FechaInicio={data.Inicio}
          FechaVencimiento={data.Fin}
        />
      ))}
    </section>
    <Footer />
    </>
  )
}
export default MisSeguros;