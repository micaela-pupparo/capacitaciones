import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import toast from "./middleware/toast";
// import func from "./middleware/func";

export default function () {
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware(), //middleware Thunk, como Func
      logger("console"),
      toast,
    ],
  }); // con toolkit ahora no hace falta especificar que queremos que se hablen con redux devtoools
  // tambien nos deja despachar acciones asincronas
}
