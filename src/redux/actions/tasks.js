import { UPDATE_TASKS, CLEAR_TASKS } from "./types";

export const updateTasks = (notes) => {
  return {
    type: UPDATE_TASKS,
    payload: notes,
  };
};

export const clearTasks = () => {
  return {
    type: CLEAR_TASKS,
  };
};
