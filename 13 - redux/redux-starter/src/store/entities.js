import { combineReducers } from "redux";
import bugsReducer from "./bugs";
import projectsReducer from "./projects";

// combina en un solo reducer para poder pasarlo a la store
export default combineReducers({
  bugs: bugsReducer,
  projects: projectsReducer,
});
