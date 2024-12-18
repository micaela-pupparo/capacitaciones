// el archivo bugs es un slice de nuestra store

// Action types
const BUD_ADDED = "bugAdded";
const BUD_REMOVED = "bugRemoved";
const BUG_RESOLVED = "bugResolved";

// Action creators
// con ducks pattern se debe exportar cada action creator
export const bugAdded = (description) => ({
  type: BUD_ADDED,
  payload: {
    description,
  },
});

export const bugResolved = (id) => ({
  type: BUG_RESOLVED,
  payload: {
    id,
  },
});

// Reducer
// con ducks pattern siempre tu reducer tiene que estar exportado en default
let lastId = 0;

export default function reducer(state = [], action) {
  switch (action.type) {
    case BUD_ADDED:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];

    case BUD_REMOVED:
      return state.filter((bug) => bug.id !== action.payload.id);

    case BUG_RESOLVED:
      return state.map((bug) =>
        bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
      );

    default:
      return state;
  }
}
