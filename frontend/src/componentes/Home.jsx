import React, { useEffect, useState } from "react";
import '../Css/Home.css'; 
import BarraNavegacion from "./barraNavegacion";
import seguros from '../Imagenes/Seguros2.jpg';
import { AiOutlineSearch } from "react-icons/ai";
import Cards from './CartasHome';
import BarraLateral from "./Barra-lateral";
import SegurosDestacados from "./SegurosDestacados";
import VendedoresDestacados from "./VendedoresDestacados";
import Footer from "./Footer";
import axios from "axios";
function Home(){

  const [datos, setSeguros] = useState([]);

  useEffect(() => {
    const obtenerSeguros = async () => {
      try {
        const response = await axios.post('/home/homePage');
        console.log(response.data); // Verifica en la consola que estás recibiendo los datos correctamente
        setSeguros(response.data); // Almacena los datos en el estado seguros
      } catch (error) {
        console.error('Error en traer los datos: ', error);
      }
    };

    obtenerSeguros(); // Llamar a la función para obtener seguros cuando el componente se monta
  }, []);

  const segurosLimitados =  datos.slice(0,3);

  const [session, setSession] =useState({userId: []});

  useEffect(() => {
    const obetenerSession = async () => {
      try {
        const response = await axios.post('/session');
        console.log(response.data);
        setSession(response.data);
      } catch (error) {
        console.error('Error' + error);
      }
    };

    obetenerSession();
  }, [])

  const nombreUsuario = session.userId.length > 2 ? session.userId[2] : '';

  return(
  <>
  <BarraNavegacion nombreUsuario={nombreUsuario} />
  <section className="Zona-superior">
    <div className="Contenedor-Info">
      <p className="Titulo"> Encuentra tu seguro ideal </p>
      <p> Busca tus seguros </p>
      <div className="Buscador">
        <form className="Formulario-Buscador">
          <div className="Buscador">
          <input placeholder="Buscar"/>
            <span className="Icono-Buscar">
          {<AiOutlineSearch className="Icono" />}
        </span>
          </div>
          <button type="submit" className="Boton-Buscar"> Buscar </button>
        </form>
      </div>
    </div>
    <div className="Contenedor-Imagen">
      <img src={seguros} className="imagen" /> 
    </div>   
  </section>
  <h3>Seguros</h3>
  <section className="Cuerpo-Vista">
    {datos.map((seguro) => (
        <Cards
          key={seguro.Id_Seguro} // Asegúrate de tener una clave única para cada elemento en el array
          Titulo={seguro.Nombre_Seguro} // Ajusta según la estructura de tus datos
          Imagen={seguro.Nombre_Seguro} // Ajusta según tus necesidades
        />
    ))}
  </section>
  <div className="Zona-Inferior">
    <section className="Barra-Lateral">
      <div className="Titulo-Barra">
          <p className="Texto-Barra">Ofertas</p>
      </div>
      <BarraLateral
      Titulo='Tu primer seguro'
      Imagen='Seguro'
      Descuento='20'
      />
      <BarraLateral
      Titulo='Mascotas'
      Imagen='Mascotas'
      Descuento='30'
      />
    </section>
    <section className="Seguros-Destacados">
      <div className="Contenedor-Seguros-Destacados">
        <div className="Contenedor-Titulo">
          <p className="Titulo">Seguros</p>
        </div>
        {segurosLimitados.map((seguro) => (
          <SegurosDestacados 
            Imagen={seguro.Nombre_Seguro}
            Seguro={seguro.Nombre_Seguro}
            Precio={seguro.Precio}
          /> 
        ))} 
      </div>
      <div className="Contenedor-Seguros-Destacados">
        <div className="Contenedor-Titulo">
            <p className="Titulo">Vendedores destacados</p>
        </div>
          <VendedoresDestacados 
          Imagen ='Hombre'
          Nombre='Juan Felipe Rodriguez'
          Cargo='Asesor comercial'
          />
          <VendedoresDestacados
          Imagen='Mujer'
          Nombre='Maria Fernanda Gómez'
          Cargo='Asesora de ventas'
          />
      </div>
    </section>
  </div>
  <section className="Footer">
    <Footer />
  </section>
  </>
  )
}
export default Home; 