import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../Css/MisSeguros.css';
 
function ModalMisSeguros({ show, onHide, FechaPago, Limite, Cobertura, ProximoPago, Beneficiario, Documentos }) {


  return (
    <Modal className="Modal-Seguros" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Informacion detallada del seguro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='Contenido-Modal'>
          <div className='Lateral-Izquierda'>
            <p className='Titulo-Modal-Seguros'>Cobertura</p>
            <p>{Cobertura}</p>
            <p className='Titulo-Modal-Seguros'>Fechas Pagos realizados</p>
            <p>{FechaPago}</p>
          </div>
          <div className='Central'>
            <p className='Titulo-Modal-Seguros'>Limites</p>
            <p>{Limite}</p>
            <p className='Titulo-Modal-Seguros'>Próxima fecha de pago</p>
            <p>{ProximoPago}</p>
          </div>
          <div className='Lateral-Derecha'>
            <p className='Titulo-Modal-Seguros'>Beneficiarios</p>
            {Beneficiario.map((beneficiario) => (
              <p>{beneficiario}</p>
            ))}
            <p className='Titulo-Modal-Seguros'>Documentación relevante</p>
            {Documentos && <a href={Documentos} download="certificado.pdf">Certificado de la Poliza</a>}
            {/* {Documentos && <button onClick={descargarPdf}>Certificado de la Poliza</button>} */}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="Cerrar" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
 
export default ModalMisSeguros;