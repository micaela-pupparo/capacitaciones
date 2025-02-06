// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import store from "./store/configureStore";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root") as HTMLElement).render(
  // <StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </StrictMode>
);
