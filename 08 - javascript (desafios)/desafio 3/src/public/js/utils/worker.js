let tareas = [];

setInterval( function () {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); //para que ignore las horas

    tareas.forEach(tarea => {
            const fechaTarea = new Date(tarea.fechaVencimiento + "T00:00:00");
            fechaTarea.setHours(0, 0, 0, 0);

            let diferencia = fechaTarea - hoy;
            diferencia = Math.ceil(diferencia / (1000 * 60 * 60 * 24))

            if (diferencia <= 5 && diferencia >= 0)
                self.postMessage({id: tarea.id, diferencia});
            if (diferencia < 0)
                self.postMessage({id: tarea.id, diferencia});
        })

}, 60000)

self.onmessage = function(event) {
    console.log("en el workeerrr: ", event.data)
    tareas = event.data;
}


