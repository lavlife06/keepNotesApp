import { combineReducers } from "redux";
import tasksReducer from "./tasks";

export default combineReducers({
  notes: tasksReducer,
});
