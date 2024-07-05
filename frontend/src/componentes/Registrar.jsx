import React, { useState } from "react";
import '../Css/Registrar.css'
import Logo from './LogoInicio';
import { useNavigate } from "react-router";
import { Button,Modal } from 'react-bootstrap';
import { ValidarCorreo,VisibilidadContraseña,ValidarContraseñas,ValidarDocumento,ValidarFecha,ValidarNombre,ValidarUsuario,ValidarProfesion,ValidarTelefono,ValidarDireccion} from "../Validaciones/Formularios";
import { AiFillEyeInvisible,AiFillEye } from "react-icons/ai";
import axios from "axios";
 
axios.defaults.withCredentials = true;
 
function Registrar (){
  //Comenzamos a crear hocks para poder hacer cambios de estados en las validaciones de los formularios
  const [OcultarContraseña, setOcultarContraseña] = useState(false);
  const [OcultarContraseñaUno, setOcultarContraseñaUno] = useState(false);
  const [MostrarModal,setMostrarModal] = useState(false);
  //Vamos a crear este, para que cada que algo falle lo usamos y le decimos que está en false, para tener las validaciones comprobadas antes del submit
  const [FormularioEnviado,setFormularioEnviado] = useState(false);
  const [MensajeFormulario,setMensajeFormulario] = useState('');
  const [ManejarFormulario,setManejarFormulario] = useState(false);
  //Hocks para mostrar mensaje de validacion de contraseña
  const [MensajeContraseña,setMensajeContraseña] = useState('');
  const [VerValidacion,setVerValidacion] = useState(true);
  //hocks para mostrar mensaje de validacion de correo
  const [ManejarCorreo, setManejarCorreo] = useState(true);
  const [MensajeCorreo, setMensajeCorreo] = useState('');
  //Hock para tener el manejo del numero de documento
  const [ManejarDocumento,setManejarDocumento] = useState(true);
  const [MensajeDocumento,setMensajeDocumento] = useState('');
  const [ManejarTipoDocumento,setManejarTipoDocumento] = useState(true);
  const [MensajeTipoDocumento,setMensajeTipoDocumento] = useState('');
  //Validacion fecha
  const [MensajeFecha,setMensajeFecha] = useState('');
  const [ManejarFecha,setManejarFecha] = useState(true);
  //hocks para nombre usuario,profesion,Nombre completo y codigo (de la vista modal)
  const [MensajeNombre,setMensajeNombre] = useState('');
  const [ManejarNombre,setManejarNombre] = useState(true);
  const [MensajeUsuario,setMensajeUsuario] = useState ('');
  const [ManejarUsuario,setManejarUsuario] = useState(true);
  const [MensajeProfesion,setMensajeProfesion] = useState('');
  const [ManejarProfesion,setManejarProfesion] = useState(true);
  const [MensajeModal,setMensajeModal] = useState('');
  const [ManejarMensaje,setManejarMensaje] = useState(true);
  const [ManejarDireccion,setManejarDireccion] = useState(true);
  const [MensajeDireccion,setMensajeDireccion] = useState('');
  const [ManejarTelefono,setManejarTelefono] = useState(true);
  const [MensajeTelefono,setMensajeTelefono] = useState('');
  const [codigoValido,setCodigoValido] = useState(false);
  const navigate = useNavigate();
  //Manejar estado del modal
  const ManejarEstado = () => {
    setMostrarModal(!MostrarModal);
    setMensajeModal('');
  };
  const Reenviar= (event) =>{
    reenviar(event);
  };
  //Verificamos el formulario tomando en cuenta el estado del hock formularioEnviado
  const VerificarFormulario = (event) => {
    console.log("Entrando a validar verificar formulario");
    event.preventDefault();
    validarDocumento(event);
    validarNombre(event);
    validarCorreo(event);
    validarFecha(event);
    validarUsuario(event);
    validarDireccion(event);
    validarTelefono(event);
    validarProfesion(event);
    VerificarContraseñas(event);
    if(ManejarCorreo===false && ManejarDocumento===false && ManejarTipoDocumento===false && ManejarFecha===false && ManejarNombre===false && ManejarUsuario===false && ManejarProfesion===false && VerValidacion===false && ManejarTelefono===false && ManejarDireccion===false){
      console.log("Todo está bien");
      setMostrarModal(true);
      setManejarFormulario(false);
      crearUsuario(event);
    }else{
      setMostrarModal(false);
      setMensajeFormulario("Recuerda que todos los campos son obligatorios");
      console.log("Algo falla");
      setManejarFormulario(true);
    }
 
  };
  //Validar Campo Profesión
  const validarProfesion =(event) =>{
    if(event && event.preventDefault){
      event.preventDefault();
    }
    const profesion = document.querySelector("input[name='Profesion']").value.trim();
    ValidarProfesion(profesion,setMensajeProfesion,setManejarProfesion,setFormularioEnviado,setMostrarModal);
 
  };
  //Validar Campo Nombre
  const validarUsuario = (event) =>{
    if(event && event.preventDefault){
      event.preventDefault();
    }
    const usuario = document.querySelector("input[name='Usuario']").value.trim();
    ValidarUsuario(usuario,setMensajeUsuario,setManejarUsuario,setFormularioEnviado);
  };
  const validarNombre = (event) =>{
    if(event && event.preventDefault){
      event.preventDefault();
    }
    const nombre = document.querySelector("input[name='Nombre']");
    ValidarNombre(nombre,setFormularioEnviado,setManejarNombre,setMensajeNombre);
  };
  //Vamos a validar el correo utilizando el metodo creado en Formulario
  const validarCorreo = (event) => {
    // Validar correo como lo tienes implementado, asegurándote de establecer correctamente FormularioEnviado
    const correo = document.querySelector("input[name='Correo']");
    if (ValidarCorreo(correo, setMensajeCorreo, setManejarCorreo, setMostrarModal, setFormularioEnviado, 'Registrar')) {
      setFormularioEnviado(true);
    }
  };
  //Vamos a validar el documento, tomando en cuenta que, vamos a determinar el límite en 7 (valor internacional mínimo) y, 18, como máximo
  const validarDocumento = (event) =>{
    if(event && event.preventDefault){
      event.preventDefault()
    }
    const documento = document.querySelector("input[name='Numero_Documento']").value.trim();
    console.log("LLEGA DESDE REGISTRAR",documento);
    const tipoDocumento = document.querySelector("select[name='Tipo_Documento']").value.trim();
    ValidarDocumento(documento,tipoDocumento,setManejarDocumento,setManejarTipoDocumento,setMensajeDocumento,setMensajeTipoDocumento,setFormularioEnviado,setMostrarModal);
  };
 //Metodo donde vemos a validar el verificar contraseña
  const VerificarContraseñas = (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    const Contraseña = document.querySelector("input[name='Contraseña']").value.trim();
    const ContraseñaValidar = document.querySelector("input[name='ContraseñaValidar']").value.trim();
    ValidarContraseñas(Contraseña, ContraseñaValidar, setVerValidacion, setMensajeContraseña,setFormularioEnviado,setMostrarModal);
  };
  //Creamos uno para cada uno para que funcionen independientemente
  const visibilidadContraseña = () => {
    VisibilidadContraseña(OcultarContraseña, setOcultarContraseña);
  };
  const visibilidadContraseñaUno = () => {
    VisibilidadContraseña(OcultarContraseñaUno, setOcultarContraseñaUno);
  };
  //Vamos a validar la fecha, para poder permitir que tenga mínimo 18 años y máximo entendible y real.
  const validarFecha = (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    const fecha = document.querySelector("input[name='Fecha']").value;
    ValidarFecha(event,fecha, setFormularioEnviado, setManejarFecha, setMensajeFecha);
  };
  const Redirigir = () =>{
    navigate('/')
  };
  const ValidarCodigo = (event) =>{
    event.preventDefault();
    const codigoConfirmacion = document.querySelector("input[name='Codigo_Confirmacion']").value;
    if(codigoConfirmacion===''){
      setCodigoValido(false);
      setManejarMensaje(true);
      setMensajeModal('Ingresa el código de verificación');
      return;
    }
    if(!validarRegistro(event, codigoConfirmacion)){
      setCodigoValido(false);
      setManejarMensaje(true);
      setMensajeModal('Código incorrecto, vuelve a intentarlo');
      return;
    }else if(validarRegistro(event, codigoConfirmacion)){
      setManejarMensaje(false);
      setMensajeModal('');
      setCodigoValido(true);
    }
    else{
      console.log('error')
    }
  };
  const validarDireccion = (event) =>{
    if(event && event.preventDefault){
      event.preventDefault();
    }
    const Direccion = document.querySelector("Input[name='Direccion']").value;
    ValidarDireccion(Direccion,setManejarDireccion,setMensajeDireccion,setFormularioEnviado);
  }
  const validarTelefono = (event)=>{
    if(event && event.preventDefault){
      event.preventDefault();
    }
    const Telefono = document.querySelector("Input[name='Telefono']").value;
    ValidarTelefono(Telefono,setManejarTelefono,setMensajeTelefono,setFormularioEnviado);
  }
 
  const crearUsuario = async (event)=> {
    event.preventDefault();
    try {
      const response = await axios.post('/registro/guardar', {
        Numero_Documento: event.target.Numero_Documento.value,
        Nombre: event.target.Nombre.value,
        Usuario: event.target.Usuario.value,
        Correo: event.target.Correo.value,
        Fecha: event.target.Fecha.value,
        Contraseña: event.target.Contraseña.value,
        Telefono: event.target.Telefono.value,
        Direccion: event.target.Direccion.value,
        Profesion: event.target.Profesion.value,
        Tipo_Documento: event.target.Tipo_Documento.value,
        ContraseñaValidar: event.target.ContraseñaValidar.value
      });
      console.log(response.data);
    } catch (error) {
      console.error('error' + error);
    }
  }
 
  const validarRegistro = async (event, codigoConfirmacion) =>{
    event.preventDefault();
    console.log(codigoConfirmacion);
    try {
      const response = await axios.post('/registro/validar', {
        Codigo_Confirmacion: codigoConfirmacion
      });
      console.log(response.data)
      navigate('/')
    } catch (error) {
      console.error('error' + error);
    }
  }

  const reenviar = async (event) => {
    event.preventDefault();
    const response = await axios.post('/registro/reenviar');
    console.log(response.data);
  }
 
  return(
    <>
      <Logo />
      <section className="Registrar">
        <div className="Contenedor-Formulario-Registrar">
        <h1>Registrar</h1>
          <form className="Formulario-Registrar" onSubmit={VerificarFormulario}>
            <div className="Grupo">
              <label>Tipo de documento*</label>
              <p className="Validacion-Registrar">
                {
                ManejarTipoDocumento && <div className="Mensaje">{MensajeTipoDocumento}</div>
                }
            </p>
              <select name="Tipo_Documento" onBlur={validarDocumento}>
                <option value="0">Selecciona tipo de Documento</option>
                <option value="1">Cedula</option>
                <option value="2">Cedula Extranjería</option>
              </select>
            </div>
            <div className="Label-Dividido">
              <label className="Label-izquierda" >Número de documento*</label>
              <label className="Label-derecha">Nombre completo*</label>
            </div>
            <div className="Mensaje-Dividido">
              <p className="Validacion-Registrar">
                  {
                  ManejarDocumento && <div className="Mensaje">{MensajeDocumento}</div>
                  }
              </p>
              <p className="Validacion-Registrar">
                  {
                  ManejarNombre && <div className="Mensaje">{MensajeNombre}</div>
                  }
              </p>
            </div>
            <div className="Grupo-Dividido">
              <input className="Input-Formulario" name="Numero_Documento" onBlur={validarDocumento} placeholder="Ingresa tu número de documento" />
              <input className="Input-Formulario" name="Nombre" onBlur={validarNombre} placeholder="Ingresa tu nombre completo"/>
            </div>
            <div className="Grupo">
              <label>Correo electrónico*</label>
              <p className="Validacion-Registrar">
                {
                ManejarCorreo && <div className="Mensaje">{MensajeCorreo}</div>
                }
              </p>
              <input className="Input-Formulario" name="Correo" onChange={validarCorreo} placeholder="Ingresa tu correo electrónico"/>
            </div>
            <div className="Label-Dividido">
              <label className="Label-izquierda">Fecha nacimiento*</label>
              <label className="Label-derecha">Nombre usuario*</label>
            </div>
            <div className="Mensaje-Dividido">
            <p className="Validacion-Registrar">
                {
                ManejarFecha && <div className="Mensaje">{MensajeFecha}</div>
                }
            </p>
            <p className="Validacion-Registrar">
                {
                ManejarUsuario && <div className="Mensaje">{MensajeUsuario}</div>
                }
            </p>
            </div>
            <div className="Grupo-Dividido">
              <input onBlur={validarFecha} type="date" className="Input-Formulario" name="Fecha" />
              <input className="Input-Formulario" onBlur={validarUsuario} name="Usuario"placeholder="Nombre usuario"/>
            </div>
            <div className="Label-Dividido">
              <label className="Label-izquierda" >Dirección de redidencia*</label>
              <label className="Label-derecha">Número Telefónico*</label>
            </div>
            <div className="Mensaje-Dividido">
              <p className="Validacion-Registrar">
                  {
                  ManejarDireccion && <div className="Mensaje">{MensajeDireccion}</div>
                  }
              </p>
              <p className="Validacion-Registrar">
                  {
                  ManejarTelefono && <div className="Mensaje">{MensajeTelefono}</div>
                  }
              </p>
            </div>
            <div className="Grupo-Dividido">
              <input className="Input-Formulario" name="Direccion" onBlur={validarDireccion} placeholder="Ingresa tu dirección de residencia" />
              <input className="Input-Formulario" name="Telefono" onBlur={validarTelefono} placeholder="Ingresa tu número telefónico"/>
            </div>
            <div className="Label-Dividido">
            <label>Contraseña*</label>
            <label className="Label-derecha">Validar Contraseña*</label>
            </div>
            <p className="Validacion-Registrar">
                {
                VerValidacion && <div className="Mensaje">{MensajeContraseña}</div>
                }
            </p>
            <div className="Grupo-Dividido">
            <div className="Input-Ojo">
              <input className="Input-Contraseña"  onChange={VerificarContraseñas} name="Contraseña" type={OcultarContraseña ? "text" : "password"} placeholder="Ingresa tu contraseña"/>
              <div className="Boton-Ojo">
                {
                  OcultarContraseña ? <AiFillEye  className="Icono-Contraseña" onClick={visibilidadContraseña} /> :  <AiFillEyeInvisible className="Icono-Contraseña" onClick={visibilidadContraseña} />
                }
              </div>
            </div>
            <div className="Input-Ojo">
              <input className="Input-Contraseña" onChange={VerificarContraseñas} name="ContraseñaValidar" type={OcultarContraseñaUno ? "text" : "password"} placeholder="Valida tu contraseña"/>
              <div className="Boton-Ojo">
                {
                  OcultarContraseñaUno ? <AiFillEye  className="Icono-Contraseña" onClick={visibilidadContraseñaUno} /> :  <AiFillEyeInvisible className="Icono-Contraseña" onClick={visibilidadContraseñaUno} />
                }
              </div>
            </div>
            </div>
            <div className="Grupo">
            <label>Profesión*</label>
            <p className="Validacion-Registrar">
                {
                ManejarProfesion && <div className="Mensaje">{MensajeProfesion}</div>
                }
            </p>
            <input className="Input-Formulario" onBlur={validarProfesion} name="Profesion" placeholder="Ingresa tu profesión" />
            </div>
            <div className="Seccion-Baja">
            <p className="Validacion-Registrar">
                {
                ManejarFormulario && <div className="Mensaje">{MensajeFormulario}</div>
                }
            </p>
              <button className="Boton-Formulario"> Registrar</button>
              <p onClick={Redirigir}>¿Ya tienes una cuenta? Inicia sesión</p>
            </div>
          </form>
        </div>
      </section>
      <section className="Modal-Registrar">
      <Modal className="Modals" show={MostrarModal} onHide={ManejarEstado}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
              <p className="Titulo-Modal">Verifica tu correo electrónico</p>
              <form className="Formulario-Modal" onSubmit={ValidarCodigo}>
                <h6>Hemos enviado un código de verificación a tu correo</h6>
                <label className="Label-Modal">Verifica código de confirmación</label>
                <input name="Codigo_Confirmacion"  className={`Input ${codigoValido? 'Correcto' : 'Incorrecto'}`}
                placeholder="Código de confirmación"/>
                <p className="Validacion-Registrar">
                {
                ManejarMensaje && <div className="Mensaje">{MensajeModal}</div>
                }
            </p>
                <Button className="Boton-Modal" type="submit" onClick={ValidarCodigo}>
                  Enviar
                </Button>
              </form>
              <div className="reenviar">
                <p>¿No te llegó el código?<br></br></p>
                <p className="Reenviar-Correo" onClick={Reenviar}>Reenviar</p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="Cerrar" onClick={ManejarEstado}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
      </section>
    </>
    );
}
export default Registrar;