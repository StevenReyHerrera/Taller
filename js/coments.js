let newComentario=null

const enviar = (event) => {
  event.preventDefault();
    newComentario = new Comentario(
    document.getElementById("usuario").value,
    document.getElementById("comentario").value
  );
  newComentario.mostrarEnChat();
};

const editar=()=>{
    if(newComentario !== null){
        newComentario.editarComentario(document.getElementById("comentario").value)
    }else{
        return;
    }
    
}

const eliminar=()=>{
    if(newComentario !== null){
        newComentario.borrarComentario()
        newComentario=null;
    }else{
        return;
    }
}


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

  editarComentario( nuevoMensaje) {
    this.mensaje = nuevoMensaje;
    this.fecha = new Date();
    this.mostrarEnChat();
  }

  borrarComentario() {
    const chat = document.getElementById("chat");
    chat.textContent = "";
    this.usuario="";
    this.mensaje="";
    this.fecha=null;
  }
}

