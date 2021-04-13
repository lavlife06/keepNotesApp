import { UPDATE_NOTES, CLEAR_NOTES } from "./types";

export const updateNotes = (notes) => {
  return {
    type: UPDATE_NOTES,
    payload: notes,
  };
};

export const clearNotes = () => {
  return {
    type: CLEAR_NOTES,
  };
};
