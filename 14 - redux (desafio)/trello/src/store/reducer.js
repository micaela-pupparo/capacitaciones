import { combineReducers } from "@reduxjs/toolkit";
import uiReducer from "./ui";
import usersReducer from "./users";
import boardsReducer from "./boards";

export default combineReducers({
  users: usersReducer,
  boards: boardsReducer,
  ui: uiReducer,
});
