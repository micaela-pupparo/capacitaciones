import { combineReducers } from "@reduxjs/toolkit";
import uiReducer from "./ui";

export default combineReducers({
  ui: uiReducer,
});
