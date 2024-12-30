import { combineReducers } from "@reduxjs/toolkit";
import uiReducer from "./ui";
import usersReducer from "./users";
import boardsReducer from "./boards";
import listsReducer from "./lists";

export default combineReducers({
  users: usersReducer,
  boards: boardsReducer,
  lists: listsReducer,
  ui: uiReducer,
});
