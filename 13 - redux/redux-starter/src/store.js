import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer); //devuelve un store object

export default store;
