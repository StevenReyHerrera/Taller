let newComentario = null;
const correo = document.getElementById("correo");
const errorCorreo = document.getElementById("required-correo");
const tel = document.getElementById("telefono");
const errorTel = document.getElementById("required-tel");
const usuario = document.getElementById("usuario");
const errorUser = document.getElementById("required-usuario");
const coment = document.getElementById("comentario");
const errorComent = document.getElementById("required-coment");

const inicio = () => {
  window.location.href = "./index.html";
};

const enviar = (event) => {
  event.preventDefault();
  let telVerify = false;
  let emailVerify = false;
  let userVerify = false;
  let comentVerify = false;
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (usuario.value.length < 2) {
    errorUser.textContent = "el usuario es obligatiorio y de mayor logitud";
  } else {
    errorUser.textContent = "";
    userVerify = true;
  }

  if (coment.value.length < 7) {
    errorComent.textContent = "Debe escribir un comentario mayor a 7 letras";
  } else {
    errorComent.textContent = "";
    comentVerify = true;
  }

  if (!regexCorreo.test(correo.value)) {
    errorCorreo.textContent = "el correo esta incorrecto";
  } else {
    errorCorreo.textContent = "";
    emailVerify = true;
  }

  if (tel.value <= 0 && tel.value.length < 6) {
    errorTel.textContent = "Corrija el número telefónico";
  } else {
    errorTel.textContent = "";
    telVerify = true;
  }

  if (telVerify && emailVerify) {
    newComentario = new Comentario(
      document.getElementById("usuario").value,
      document.getElementById("comentario").value
    );
    newComentario.mostrarEnChat();
  } else {
    return;
  }
};

const editar = () => {
  console.log("entro a editar");
  if (newComentario !== null) {
    newComentario.editarComentario(document.getElementById("comentario").value);
  } else {
    return;
  }
};

const eliminar = () => {
  console.log("entro a eliminar");

  if (newComentario !== null) {
    newComentario.borrarComentario();
    newComentario = null;
  } else {
    return;
  }
};

class Comentario {
  constructor(usuario, mensaje) {
    this.usuario = usuario;
    this.mensaje = mensaje;
    this.fecha = new Date();
  }

  obtenerHora() {
    const hora = this.fecha.getHours();
    const minutos = this.fecha.getMinutes();

    return `${hora}:${minutos}`;
  }

  mostrarEnChat() {
    const chat = document.getElementById("chat");
    const hora = this.obtenerHora();
    const mensajeFormateado = `${hora} ${this.usuario}: ${this.mensaje}`;
    chat.textContent = mensajeFormateado;
  }

  editarComentario(nuevoMensaje) {
    this.mensaje = nuevoMensaje;
    this.fecha = new Date();
    this.mostrarEnChat();
  }

  borrarComentario() {
    const chat = document.getElementById("chat");
    chat.textContent = "";
    this.usuario = "";
    this.mensaje = "";
    this.fecha = null;
  }
}
