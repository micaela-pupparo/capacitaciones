import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import Raven from "raven-js";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

Raven.config("https://05323d37c9a947eba9daaaab1e617a9@sentry.io/1249956", {
  release: "0-0-0",
  environment: "development-test",
}).install();

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
