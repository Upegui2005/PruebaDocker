import React, { useEffect, useState } from 'react';
import ModalMisSeguros from './ModalMisSeguros';
import '../Css/MisSeguros.css';
import axios from 'axios';

function CardsSeguros({ id, Imagen, Seguro, FechaInicio, FechaVencimiento}) {
const [MostrarModal, setModal] = useState(false);

  const [beneficiarios, setBeneficiarios] = useState([]);

    useEffect(() => {
      const obtenerBeneficiarios = async () => {
        try {
          const response = await axios.post('/home/beneficiarios', {idPoliza: id});
          console.log(response.data);
          setBeneficiarios(response.data);
        } catch (error) {
          console.error('Error' + error);
        }
      };

      if (MostrarModal){
        obtenerBeneficiarios()
      }
    }, [MostrarModal, id]);

  const [polizas, setPolizas] = useState([]);

  useEffect(() => {
    const obtenerPolizas = async () => {
      try {
        const response = await axios.post('/home/polizas', {idPoliza: id});
        console.log(response.data);
        setPolizas(response.data);
      } catch (error) {
        console.error('Error' + error);
      }
    };

    if(MostrarModal){
      obtenerPolizas();
    }
  }, [MostrarModal, id]);

  const [pagos, setPagos] = useState([]);

  useEffect(()=> {
    const obtenerPagos = async() => {
      try {
        const response = await axios.post('/home/pagos', {idPoliza:id});
        console.log(response.data);
        setPagos(response.data);
      }
      catch (error){
        console.error(error);
      }
    };
    if (MostrarModal){
      obtenerPagos();
    }
  }, [MostrarModal, id])

  const [pdf, setPdfUrl] = useState('');

  useEffect(() => {
    const obtenerPdf = async () => {
      try {
        const response = await axios.post('/home/pdf', { idPoliza: id },{
          responseType: 'blob'
        });
        const pdfUrl = URL.createObjectURL(response.data)
        setPdfUrl(pdfUrl);
      } catch (error) {
        console.error('Error al obtener el PDF', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    };
    if (MostrarModal) {
      obtenerPdf();
    }
  }, [MostrarModal, id])

  const [fecha, setFecha] = useState([]);

  useEffect(() => {
    const obtenerFecha = async () => {
      try{
        const response = await axios.post('/home/proximoPago', {idPoliza: id});
        console.log(response.data);
        setFecha(response.data)
      }catch(error){
        console.error(error);
      }
    };
    if(MostrarModal){
      obtenerFecha();
    }
  },[MostrarModal, id])

  const ManejarModal = () => {
      setModal(!MostrarModal);
    };

  return (
    <>
      <div className="Cards-Seguros" onClick={ManejarModal}>
        <div className="Contenedor-Imagen-Card-Seguros">
          <img
            className="Imagen"
            src={require(`../Imagenes/${Imagen}.png`)}
            alt={`Imagen-Servicio-${Imagen}`}
          />
        </div>
        <div className="Seccion-Baja-Card">
          <p>Seguro de {Seguro}</p>
          <p>Fecha Inicio:</p>
          <p>{FechaInicio}</p>
          <p>Fecha de vencimiento:</p>
          <p>{FechaVencimiento}</p>
        </div>
      </div>
      {MostrarModal && (
        <ModalMisSeguros
          show={MostrarModal}
          onHide={ManejarModal}
          FechaPago= {pagos.map((data)=>(
            data.Fecha_Pago
          ))}
          Limite={polizas.Limite}
          Cobertura={polizas.Cobertura}
          ProximoPago={fecha}
          Beneficiario={beneficiarios.map((data) => (
            data.Nombre
          ))}
          Documentos={pdf}
        />
      )}
    </>
  );
}

export default CardsSeguros;
