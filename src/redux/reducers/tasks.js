import { UPDATE_TASKS, CLEAR_TASKS } from "../actions/types";

const initialState = {
  tasks: {},
  columns: {
    "column-1": {
      id: "column-1",
      title: "Pending Tasks",
      taskIds: [],
    },
    "column-2": {
      id: "column-2",
      title: "Completed Tasks",
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2"],
};

const tasksReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_TASKS:
      return {
        ...state,
        tasks: payload.tasks,
        columns: payload.columns,
      };
    case CLEAR_TASKS:
      return {};
    default:
      return state;
  }
};

export default tasksReducer;
