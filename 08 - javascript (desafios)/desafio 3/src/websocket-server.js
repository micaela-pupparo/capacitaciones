const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Nuevo cliente conectado");

  // simula el envío de actualizaciones de tareas cada 5 segundos
  const intervalId = setInterval(() => {
    const taskUpdate = {
      taskId: Math.floor(Math.random() * 100),
      status: "En progreso",
      message: "Actualización de tarea en tiempo real",
    };
    ws.send(JSON.stringify(taskUpdate));
  }, 5000);

  ws.on("close", () => {
    console.log("Cliente desconectado");
    clearInterval(intervalId);
  });
});

console.log("Servidor WebSocket escuchando en el puerto 8080");
