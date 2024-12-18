// el archivo bugs es un slice de nuestra store

// Action types
const BUD_ADDED = "bugAdded";
const BUD_REMOVED = "bugRemoved";
const BUG_RESOLVED = "bugResolved";

// Action creators
// con ducks pattern se debe exportar cada action creator
import { createAction } from "@reduxjs/toolkit";

// const bugUpdated = createAction("bugUpdated");
// console.log(bugUpdated({ id: 1 })); //este objeto entra en payload

export const bugAdded = createAction("bugAdded");
export const bugResolved = createAction("bugResolved");
export const bugRemoved = createAction("bugRemoved");

// Reducer
// con ducks pattern siempre tu reducer tiene que estar exportado en default
let lastId = 0;

export default function reducer(state = [], action) {
  switch (action.type) {
    case bugAdded.type:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];

    case bugRemoved.type:
      return state.filter((bug) => bug.id !== action.payload.id);

    case bugResolved.type:
      return state.map((bug) =>
        bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
      );

    default:
      return state;
  }
}
