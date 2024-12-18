// el archivo bugs es un slice de nuestra store

// Action types
const BUD_ADDED = "bugAdded";
const BUD_REMOVED = "bugRemoved";
const BUG_RESOLVED = "bugResolved";

// Action creators
// con ducks pattern se debe exportar cada action creator
import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";

// const bugUpdated = createAction("bugUpdated");
// console.log(bugUpdated({ id: 1 })); //este objeto entra en payload

// export const bugAdded = createAction("bugAdded");
// export const bugResolved = createAction("bugResolved");
// export const bugRemoved = createAction("bugRemoved");

// Reducer
// con ducks pattern siempre tu reducer tiene que estar exportado en default
let lastId = 0;

// redux toolkit usa immer para que los objetos sean inmutables
// bugs seria state
// export default createReducer([], {
//   [bugAdded.type]: (bugs, action) => {
//     bugs.push({
//       id: ++lastId,
//       description: action.payload.description,
//       resolved: false,
//     });
//   },
//   [bugResolved.type]: (bugs, action) => {
//     const index = bugs.findIndex((bug) => bug.id === action.payload.id);
//     bugs[index].resolved = true;
//   },
// });

// export default function reducer(state = [], action) {
//   switch (action.type) {
//     case bugAdded.type:
//       return [
//         ...state,
//         {
//           id: ++lastId,
//           description: action.payload.description,
//           resolved: false,
//         },
//       ];

//     case bugRemoved.type:
//       return state.filter((bug) => bug.id !== action.payload.id);

//     case bugResolved.type:
//       return state.map((bug) =>
//         bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
//       );

//     default:
//       return state;
//   }
// }

// slice combina create action y create reducer
const slice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    bugAdded: (bugs, action) => {
      bugs.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },
    bugResolved: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id === action.payload.id);
      bugs[index].resolved = true;
    },
  },
});

export const { bugAdded, bugResolved } = slice.actions;
export default slice.reducer;
