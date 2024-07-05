import { React,useState } from "react";
import '../Css/InicioSesion.css';
import '../Css/Modal.css';
import Logo from './LogoInicio';
import { Button,Modal } from 'react-bootstrap';
import { AiFillEyeInvisible,AiFillEye } from "react-icons/ai";
import { Await, useNavigate } from "react-router";
import {ValidarCorreoLogin,ValidarInicioSesion,VisibilidadContraseña} from '../Validaciones/Formularios'
import axios from 'axios';

axios.defaults.withCredentials = true;

function InicioSesion (){
  //Hocks para poder manipular los estados de nuestro sistema, en este caso empezamos con el estado del modal
  const [MostrarModal, setMostrarModal] = useState(false);
  //Este hock valida el manejo del mensaje que sale en la validacion del modal en el correo
  const [ManejarCorreo, setManejarCorreo] = useState(false);
  const [MensajeCorreo, setMensajeCorreo] = useState('');
  //El hock de acá abajo verifica si el formulario sea ha enviado correctamente
  const [FormularioEnviado, setFormularioEnviado] = useState(false);
  //manipula el "ojito" del input para intercambiar entre los tipos de icono
  const [OcultarContraseña, setOcultarContraseña] = useState(false);
  const [Validacion, setValidacion] = useState(false);
  const [MensajeValidacion, setMensajeValidacion] = useState('');
  const navigate = useNavigate();
  // Llamado a la funcion para ocultar y visualizar la contraseña
  const visibilidadContraseña = () => {
    VisibilidadContraseña(OcultarContraseña, setOcultarContraseña);
  };
  //con este manejamos el estado del modal, y al cerrra reestablece el mensaje del modal, para que al cerrar y abrir esté vacío
  const ManejarEstado = () => {
    setMostrarModal(!MostrarModal);
    setMensajeCorreo('');
  };
  //llamada el metodo de validar correo, (para el modal) haciendo llamada a la funcion exportada desde la validacion
  // const validarCorreo = async (event) => {
  //   try { 
  //     event.preventDefault();
  //     const Correo = document.querySelector("input[name='Correo']").value; 
  //     ValidarCorreo(Correo, setMensajeCorreo, setManejarCorreo, setMostrarModal, setFormularioEnviado,'Login');
  //     console.log("Estado del formulario",FormularioEnviado);
  //     if(FormularioEnviado===true){
  //     const correo = await axios.post('/enviarCorreo', {
  //       Correo: event.target.Correo.value 
  //     });
  //     }
  //   } catch (error) {
      
  //   }
  // };
  const validarCorreo = async (event) => {
    try {
        event.preventDefault();
        const Correo = document.querySelector("input[name='Correo']").value;
        const esValido = await ValidarCorreoLogin(Correo, setMensajeCorreo, setManejarCorreo, setMostrarModal, setFormularioEnviado);
        console.log("Estado del formulario", FormularioEnviado);

        if (esValido) {
            setFormularioEnviado(true);
            setMostrarModal(true);
            setMensajeCorreo(true);
            console.log("Debería de mostrar mensaje en verde de todo bien");
            enviarCorreo(event);
            setMensajeCorreo('Correo enviado exitosamente.');
            console.log("Todo fine return true");
            return true; 
           
        }
    } catch (error) {
      event.preventDefault();
        setFormularioEnviado(false);
        setMensajeCorreo('Tu correo no se encuentra regitrado ');
        setManejarCorreo(true);
        setMostrarModal(true);
    }
  };
  //Creamos funcion única de reenviar,para poder personalizar el mensaje, usando en este caso la validacion creada desde el archivo 'Formularios'
  //Con el cual podremos verificar que esté bien escrito, que no esté vacío y al final mostrar el mensaje
  const Reenviar = (event) => {

    if(validarCorreo(event)===true) {
      setMensajeCorreo("Hemos reenviado el correo, si aún no lo ves revisa la bandeja de spam ");
      setManejarCorreo(true);
      setMostrarModal(true);
      setFormularioEnviado(true);
      enviarCorreo(event);
      return;
    }else{
      console.log("Algo está fallando");
    }
  };
  //Creamos esta para validar los dos compos del inicio de sesión, en el cual ponemos el set de mensaje(el cual personalizamos dependiendo de la situacion)
  //Por otro lado tenemos el setValidacion, el cual es un hock de estado puro (true,false) con el que podremos decidir si mostrar el mensaje o no, para poder que cuando 
  //inicie sesion correctamente simplemente el mensaje ya no se vea
  const validarInicioSesion = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post('/login', {
            NombreUsuario: event.target.NombreUsuario.value,
            Contraseña: event.target.Contraseña.value
        });
        setValidacion(false);
        console.log(response.status) // Opcional: Resetear la validación después del inicio de sesión exitoso
        navigate('/home'); // Redirecciona a la página de inicio después del inicio de sesión
    } catch (error) {
        console.error(error);
        setValidacion(true);
        setMensajeValidacion('Usuario o contraseña incorrectos');
    }
  };
  //Con esto hacemos un navigate, con el cual podemos redireccionar el path al /registrar, para poder ver el otro formulario
  const Registrar = () => {
    navigate('/Registrar');
  };
  const reestablecer = () =>{
    navigate('/Reestablecer');
  }

  const enviarCorreo = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/enviarCorreo', {
        Correo: event.target.Correo.value
      });
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  return(
    <>
      <Logo />
      <title>Incio de sesion </title>
      <section className="Login">
        <div className="Contenedor-Principal">
          <h1>Login</h1>
          <div className="Contenedor-Formulario">
            <form className="Formulario-login" onSubmit={validarInicioSesion}>
              <label className="Label">Usuario*</label>
              <input className="Input-Usuario" name="NombreUsuario"placeholder="Ingresa tu nombre de usuario. " />
              <label className="Label">Contraseña*</label>
              <div className="Input-Ojo">
                <input className="Input-Contraseña" name="Contraseña" placeholder="Ingresa tu contraseña. " type={OcultarContraseña ? "text" : "password"} />
                <div className="Boton-Ojo">{
                  OcultarContraseña ? <AiFillEye  className="Icono-Contraseña" onClick={visibilidadContraseña} /> :  <AiFillEyeInvisible className="Icono-Contraseña" onClick={visibilidadContraseña} />
                }</div>
            </div>
              <div className="Validacion">
                {
                Validacion && <div className="mensaje">{MensajeValidacion}</div>
                }
              </div>
              <button className="Boton-Formulario">Ingresar</button>
            </form>
            <p className="Olvidar-Contraseña"  onClick={ManejarEstado}>¿Olvidaste tu contraseña?</p>
            <div className="Footer-Formulario">
              <p className="Registrate" onClick={Registrar}> ¿No tienes una cuenta? Registrate </p>
            </div>
          </div>
        </div>
        <section className="Modal">
          <Modal className="Modals" show={MostrarModal} onHide={ManejarEstado}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
              <p className="Titulo-Modal"> ¿Olvidaste tu contraseña? </p>
              <form className="Formulario-Modal" onSubmit={validarCorreo}>
                <label className="Label-Modal">Correo electrónico* </label>
                <input placeholder="Ingresa tu correo electrónico" className="Input-Modal" name="Correo" />
                <div className="Mensaje-Recuperar">
                  {
                    ManejarCorreo &&
                    <div className={`mensaje ${FormularioEnviado? 'mensaje-enviado' : ''}`}>{MensajeCorreo}</div>
                  }
                </div>
                <Button className="Boton-Modal" type="submit" onClick={ManejarEstado}>
                  Enviar
                </Button>
              </form>
              <div className="reenviar">
                <p>¿No te llegó nuestro correo? <br></br></p>
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
      </section>
    </>
  );
}
export default InicioSesion;