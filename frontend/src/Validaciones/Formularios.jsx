import validator from "validator";

export const ValidarCorreoLogin = (correo, setMensajeCorreo, setManejarCorreo, setMostrarModal, setFormularioEnviado) => {
  let esValido = true;
  if (!correo.trim()) {
      setMensajeCorreo('Ingresar tu correo');
      setManejarCorreo(true);
      setMostrarModal(true);
      setFormularioEnviado(false);
      esValido = false;
  }

  if (!validator.isEmail(correo.trim())) {
      console.log("El dominio está mal desde validacion ");
      setMensajeCorreo('El dominio del correo ingresado no existe, intenta de nuevo.');
      setManejarCorreo(true);
      setMostrarModal(true);
      setFormularioEnviado(false);
      esValido = false;
  }

  if (esValido) {
      setMensajeCorreo('Enviamos un correo para que restablezcas tu contraseña');
      setMostrarModal(true);
      setFormularioEnviado(true);
  }

  return esValido;
};
export const ValidarCorreo = (correo, setMensajeCorreo, setManejarCorreo, setMostrarModal, setFormularioEnviado,Desde) => {
  if (!correo || !correo.value.trim() && Desde==='Login') {
    setMensajeCorreo('Ingresar tu correo');
    setManejarCorreo(true);
    setMostrarModal(true);
    setFormularioEnviado(false);
  }
  if (!correo || !correo.value.trim() && Desde==='Registrar') {
    setMensajeCorreo('Ingresar tu correo');
    setManejarCorreo(true);
    setMostrarModal(false);
    setFormularioEnviado(false);
  }
  if (!validator.isEmail(correo.value.trim()) && Desde==='Login') {
    setMensajeCorreo('El dominio del correo ingresado no existe, intenta de nuevo.');
    setManejarCorreo(true);
    setMostrarModal(true);
    setFormularioEnviado(false);
  }
  if (!validator.isEmail(correo.value.trim()) && Desde==='Registrar') {
    setMensajeCorreo('El dominio del correo ingresado no existe, intenta de nuevo.');
    setManejarCorreo(true);
    setMostrarModal(false);
    setFormularioEnviado(false);
  }
  if(Desde==='Login'){
  setMensajeCorreo('Enviamos un correo para que restablezcas tu contraseña');
  setMostrarModal(true);
  setFormularioEnviado(true);
  }if(Desde==='Registrar'){
    setManejarCorreo(false);
    setMensajeCorreo('');
    setMostrarModal(false);
    setFormularioEnviado(true);
  }
};
export const ValidarInicioSesion = (event, setMensajeValidacion, setValidacion) => {
  event.preventDefault();
  const nombreUsuario = event.target.NombreUsuario;
  const contraseña = event.target.Contraseña;

  if (!nombreUsuario.value.trim() && !contraseña.value.trim()) {
    setMensajeValidacion('Ingresa los campos por favor.');
  } else if (!nombreUsuario.value.trim()){
    setMensajeValidacion('Ingresa tu nombre de usuario.');
  } else if (!contraseña.value.trim()){
    setMensajeValidacion('Ingresa tu contraseña.');
  } else {
    setValidacion(false);
    return true;
  }
  setValidacion(true);
  return false;
};
export const VisibilidadContraseña = (OcultarContraseña, setOcultarContraseña) => {
  setOcultarContraseña(!OcultarContraseña);
};
export const ValidarContraseñas = (Contraseña, ContraseñaValidar, setVerValidacion, setMensajeContraseña,setFormularioEnviado,setMostrarModal) => {
  console.log("Hola desde validar contraseñas");
  console.log("CONTRASEÑA NORMAL",Contraseña);
  console.log("CONTRASEÑA VALIDAR",ContraseñaValidar);
  if(Contraseña === ''){
    console.log("El otro input no tiene nada");
    setMensajeContraseña('Ingresa tu contraseña');
    setVerValidacion(true);
    setFormularioEnviado(false);
    setMostrarModal(false);
    return;
  }
  if(ContraseñaValidar===''){
    setVerValidacion(true);
    setMensajeContraseña('');
    setFormularioEnviado(false);
      setMostrarModal(false);
  }
  if (Contraseña !== ContraseñaValidar) {
    console.log("No coinciden");
    setMensajeContraseña('Las contraseñas no coinciden');
    setVerValidacion(true);
    setFormularioEnviado(false);
    return;
  }else{
    console.log("Ahora coinciden");
    setMensajeContraseña('');
    setVerValidacion(false);
    setFormularioEnviado(true);
  }
};
//Este es para terminar de verificar todos los campos
export const VerificarFormulario = ()=> {
};
export const ValidarDocumento = (documento,TipoDocumento,setManejarDocumento,setManejarTipoDocumento,setMensajeDocumento,setMensajeTipoDocumento,setFormularioEnviado,setMostrarModal) =>{
  console.log("El numero de documento es",documento);
  console.log("El tipo de documento es ",TipoDocumento);
  if(documento.length===0){
    setMensajeDocumento('Ingresa tu número de documento');
    setManejarDocumento(true);
    setFormularioEnviado(false);
    return;
  }
  if(TipoDocumento<1){
    setManejarTipoDocumento(true);
    setMensajeTipoDocumento('Debes de seleccionar primero tu tipo de documento ');
    setFormularioEnviado(false);
  }else{
    console.log("Debería cerrar");
    setManejarTipoDocumento(false);
    setMensajeTipoDocumento('');
    setFormularioEnviado(true);
  }
  if(documento.length <7 || documento.length>18){
      setMensajeDocumento('Tu número de documento no cumple con los estándares internacionales, intentalo de nuevo');
      setManejarDocumento(true);
      setFormularioEnviado(false);
      setMostrarModal(false)
      return;
  }
  else{
    console.log("Todo bien desde el Validar formularip");
    setManejarDocumento(false);
    setMensajeDocumento('');
    setFormularioEnviado(true);
  }
}
export const ValidarFecha = (event,fecha, setFormularioEnviado, setManejarFecha,setMensajeFecha) => {
  console.log("La fecha que obtengo es", fecha);
  if (fecha==='' || fecha===undefined) {
    console.log('No debería');
    setFormularioEnviado(false);
    setManejarFecha(true);
    setMensajeFecha("No se ha seleccionado ninguna fecha");
    return;
  }
  const fechaTipoDate = new Date(fecha);
  const fechaMaxima = new Date('2006-07-20');
  const fechaMinima = new Date('1924-01-01');
  console.log("La fecha que obtengo es", fechaTipoDate);

  if (fechaTipoDate > fechaMaxima || fechaTipoDate < fechaMinima) {
    setFormularioEnviado(false);
    setManejarFecha(true);
    setMensajeFecha("La fecha seleccionada no está en un rango permitido");
    return;
  } else {
    setFormularioEnviado(true);
    setManejarFecha(false);
    setMensajeFecha('');
  }
};
export const ValidarNombre = (nombre,setFormularioEnviado,setManejarNombre,setMensajeNombre) =>{
  if(nombre.value.trim().length===0){
    setFormularioEnviado(false);
    setManejarNombre(true);
    setMensajeNombre('Ingresa tu nombre');
    return;
  }
  if(nombre.value.trim().length<15){
    setFormularioEnviado(false);
    setManejarNombre(true);
    setMensajeNombre('Ingresa tu nombre completo');
    return;
  }
  console.log("El nombre está melo");
  setFormularioEnviado(true);
  setManejarNombre(false);
  setMensajeNombre('');
  return;
};
export const ValidarUsuario =(usuario,setMensajeUsuario,setManejarUsuario,setFormularioEnviado) =>{
  if(usuario.length===0){
    setFormularioEnviado(false);
    setManejarUsuario(true);
    setMensajeUsuario('Ingresa tu usuario');
    return;
  }
  if(usuario.length<10 || usuario.length>20){
    setFormularioEnviado(false);
    setManejarUsuario(true);
    setMensajeUsuario('Tu usuario debe de tener como mínimo 15 caracteres y como máximo 20');
    return;
  }else{
    setFormularioEnviado(true);
    setManejarUsuario(false);
    setMensajeUsuario('');
  }
};
export const ValidarProfesion =(profesion,setMensajeProfesion,setManejarProfesion,setFormularioEnviado) =>{
  if(profesion==''){
    setFormularioEnviado(false);
    setMensajeProfesion('Ingresa tu profesión')
    setManejarProfesion(true);
  }
  if(profesion.length<5 || profesion.length>20){
    setFormularioEnviado(false);
    setManejarProfesion(true);
    setMensajeProfesion('Verifica bien tu profesión');
  }else{
    setFormularioEnviado(true);
    setManejarProfesion(false);
    setMensajeProfesion('');
  }

};
export const ValidarDireccion =(Direccion,setManejarDireccion,setMensajeDireccion,setFormularioEnviado)=>{
  if(Direccion==''){
    setManejarDireccion(true);
    setMensajeDireccion("Ingresa tu dirección");
    setFormularioEnviado(false);
    return;
  }else{
    setMensajeDireccion("");
    setManejarDireccion(false);
    return; 
  }
}
export const ValidarTelefono = (Telefono,setManejarTelefono,setMensajeTelefono,setFormularioEnviado)=>{
  if(Telefono==''){
    setManejarTelefono(true);
    setMensajeTelefono("Ingresa tu numero de telefono");
    setFormularioEnviado(false);
    return; 
  }else{
    setManejarTelefono(false);
    setMensajeTelefono('');
    setFormularioEnviado(true);
    return;
  }
};
export const ReestablecerContraseña = (Contraseña, ContraseñaValidar, setVerValidacion, setMensajeContraseña) => {
  console.log("Hola desde validar contraseñas");
  console.log("CONTRASEÑA NORMAL",Contraseña);
  console.log("CONTRASEÑA VALIDAR",ContraseñaValidar);
  if(Contraseña === ''){
    console.log("El otro input no tiene nada");
    setMensajeContraseña('Ingresa tu contraseña');
    setVerValidacion(true);
    return;
  }
  if(ContraseñaValidar===''){
    setVerValidacion(true);
    setMensajeContraseña('');
  }
  if (Contraseña !== ContraseñaValidar) {
    console.log("No coinciden");
    setMensajeContraseña('Las contraseñas no coinciden');
    setVerValidacion(true);
    return;
  }else{
    console.log("Ahora coinciden");
    setMensajeContraseña('');
    setVerValidacion(false);
  }
};