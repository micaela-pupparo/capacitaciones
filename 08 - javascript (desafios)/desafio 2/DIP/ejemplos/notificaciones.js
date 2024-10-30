// abstraccion
class ServicioNotificaciones {
    enviar(mensaje, destinatario) {
        throw new Error('se debe implementar este metodo')
    }
}

//implementacion de email
class ServicioEmail extends ServicioNotificaciones {
    enviar(mensaje, destinatario) {
        console.log(`el mail fue enviado`)
    }
}

// depende de la abstraccion
class NotificacionUsuario {
    constructor(servicioNotificacion) {
        this.servicioNotificacion = servicioNotificacion
    }

    notificar(mensaje, destinatario) {
        this.servicioNotificacion.enviar(mensaje, destinatario);
    }
}

const email = new ServicioEmail();
const notificacionEmail = new NotificacionUsuario(email);
notificacionEmail.notificar('ejemplo', 'mica@gmail.com');