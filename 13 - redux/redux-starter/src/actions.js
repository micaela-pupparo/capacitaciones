import * as actions from "./actionTypes";

export const bugAdded = (description) => ({
  type: actions.BUD_ADDED,
  payload: {
    description,
  },
});

export const bugResolved = (id) => ({
  type: actions.BUG_RESOLVED,
  payload: {
    id,
  },
});
