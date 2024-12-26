import { combineReducers } from "@reduxjs/toolkit";
import uiReducer from "./ui";
import usersReducer from "./users";

export default combineReducers({
  users: usersReducer,
  ui: uiReducer,
});
