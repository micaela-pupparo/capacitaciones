Notification.requestPermission().then(permission => {
    if (permission === "granted") {
      console.log("el permiso fue aceptado =)")
    } else {
        console.log("nos denegaron el permiso")
    }
});

export const Notificaciones = {
    nuevaTarea: function(nombreTarea) {
        new Notification(`¡${nombreTarea} fue agregada con éxito!`, {
            body: "Sigue añadiendo tareas para organizar tu vida."
        })
    }
}