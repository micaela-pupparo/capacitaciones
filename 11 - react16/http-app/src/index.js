import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import logger from "./services/logService";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

// ahora, nuestro index no esta contaminado con la configuracion de nuestro servicio de logging
// los detalles ahora estan dentro del metodo init.
// ahora si queremos reemplzar raven por otro servicio tenemos solo un lugar para modificarlo: logService
logger.init();

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
