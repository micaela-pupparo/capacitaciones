import {ServicioNotificaciones} from "./notificacionesservicio.js"

//implementacion de email
export class ServicioEmail extends ServicioNotificaciones {
  enviar(mensaje, destinatario) {
    console.log(`el mail fue enviado`);
  }
}
