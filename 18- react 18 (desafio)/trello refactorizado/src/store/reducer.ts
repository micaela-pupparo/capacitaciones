import { combineReducers } from "@reduxjs/toolkit";
import uiReducer from "./ui";
import usersReducer from "./users";
import boardsReducer from "./boards.ts";
import listsReducer from "./lists.ts";
import tasksReducer from "./tasks";

export default combineReducers({
  users: usersReducer,
  boards: boardsReducer,
  lists: listsReducer,
  tasks: tasksReducer,
  ui: uiReducer,
});
