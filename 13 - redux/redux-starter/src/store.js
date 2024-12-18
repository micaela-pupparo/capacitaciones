import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import reducer from "./reducer";

const store = createStore(reducer, devToolsEnhancer({ trace: true })); //devuelve un store object

export default store;
