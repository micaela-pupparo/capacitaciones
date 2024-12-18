import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import func from "./middleware/func";

export default function () {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), logger("console")],
  }); // con toolkit ahora no hace falta especificar que queremos que se hablen con redux devtoools
  // tambien nos deja despachar acciones asincronas
}
