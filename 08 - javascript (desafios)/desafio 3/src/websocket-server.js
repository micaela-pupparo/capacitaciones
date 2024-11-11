const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Nuevo cliente conectado");

  ws.on("message", (message) => {
    const datos = JSON.parse(message)
    console.log("-----------------------DATOS DE GRUPOS -------------------------");
    datos.forEach(grupo => {
      console.log("-------------------NOMBRE GRUPO-------------------")
      console.log(grupo.nombre);
      
      if(grupo.tareas.length !== 0) {
        console.log("--------------TAREAS--------------")
        grupo.tareas.forEach(tarea => {
          console.log(tarea.nombre)})
        }
    });
  })

  ws.on("close", () => {
    console.log("Cliente desconectado");
    clearInterval(intervalId);
  });
});

console.log("Servidor WebSocket escuchando en el puerto 8080");
