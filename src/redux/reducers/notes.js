import { UPDATE_NOTES, CLEAR_NOTES } from "../actions/types";

const initialState = {
  tasks: {
    "task-1": {
      id: "task-1",
      content: "Take out the garbage",
      title: "title hai re",
      completed: false,
    },
    "task-2": {
      id: "task-2",
      content: "Watch my favorite show",
      title: "title hai re",
      completed: false,
    },
    "task-3": {
      id: "task-3",
      content: "Charge my phone",
      title: "title hai re",
      completed: false,
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Pending Tasks",
      taskIds: ["task-1", "task-2", "task-3"],
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

const notesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_NOTES:
      return {
        ...state,
        tasks: payload.tasks,
        columns: payload.columns,
      };
    case CLEAR_NOTES:
      return {};
    default:
      return state;
  }
};

export default notesReducer;
