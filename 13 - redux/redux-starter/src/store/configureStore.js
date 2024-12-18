import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import reducer from "./bugs";

export default function configureStore() {
  const store = createStore(reducer, devToolsEnhancer({ trace: true })); //devuelve un store object
  return store;
}
