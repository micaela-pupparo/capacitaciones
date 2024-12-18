import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

export default function () {
  return configureStore({
    reducer,
  }); // con toolkit ahora no hace falta especificar que queremos que se hablen con redux devtoools
  // tambien nos deja despachar acciones asincronas
}
