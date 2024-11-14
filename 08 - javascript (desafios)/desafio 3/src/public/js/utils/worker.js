let tareas = [];
let recordatoriosHechos = [];

setInterval( function () {

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); //para que ignore las horas

    tareas.forEach(tarea => {
            const fechaTarea = new Date(tarea.fechaVencimiento + "T00:00:00");
            fechaTarea.setHours(0, 0, 0, 0);

            let diferencia = fechaTarea - hoy;
            diferencia = Math.ceil(diferencia / (1000 * 60 * 60 * 24))

            let recordatorio = {
                id: tarea.id,
                diferencia
            };

            if (diferencia <= 5 && diferencia >= 0) {
                if (!buscarNuevasTareas(recordatorio, recordatoriosHechos)) {
                    recordatoriosHechos.push(recordatorio);
                    self.postMessage(recordatorio);
                }
            }
            if (diferencia < 0) {
                if (!buscarNuevasTareas(recordatorio, recordatoriosHechos)) {
                    recordatoriosHechos.push(recordatorio);
                    self.postMessage(recordatorio);
                }
            }
        })

}, 6000)

function buscarNuevasTareas(tarea, recordatoriosHechos) {
    let resultado = recordatoriosHechos.find(recordatorio => recordatorio.id === tarea.id);
    if (resultado) 
        return tarea.diferencia === resultado.diferencia

    return undefined;
}

self.onmessage = function(event) {
    console.log("en el workeerrr: ", event.data)
    tareas = event.data;
}


