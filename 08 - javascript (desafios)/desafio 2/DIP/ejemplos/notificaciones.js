import { ServicioEmail } from "./emailservicio.js";

// depende de la abstraccion
class NotificacionUsuario {
  constructor(servicioNotificacion) {
    this.servicioNotificacion = servicioNotificacion;
  }

  notificar(mensaje, destinatario) {
    this.servicioNotificacion.enviar(mensaje, destinatario);
  }
}

const email = new ServicioEmail();
const notificacionEmail = new NotificacionUsuario(email);
notificacionEmail.notificar("ejemplo", "mica@gmail.com");
