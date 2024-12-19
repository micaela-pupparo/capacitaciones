// el archivo bugs es un slice de nuestra store

// Action types
const BUD_ADDED = "bugAdded";
const BUD_REMOVED = "bugRemoved";
const BUG_RESOLVED = "bugResolved";

// Action creators
// con ducks pattern se debe exportar cada action creator
import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import moment from "moment";

// const bugUpdated = createAction("bugUpdated");
// console.log(bugUpdated({ id: 1 })); //este objeto entra en payload

// export const bugAdded = createAction("bugAdded");
// export const bugResolved = createAction("bugResolved");
// export const bugRemoved = createAction("bugRemoved");

// Reducer
// con ducks pattern siempre tu reducer tiene que estar exportado en default
// let lastId = 0;

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
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    // creando un reducer automaticamente nos crea una accion
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },
    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },
    bugAssignedToUser: (bugs, action) => {
      const { id: bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },
    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },
  },
});

export const {
  bugAdded,
  bugResolved,
  bugAssignedToUser,
  bugsReceived,
  bugsRequested,
  bugsRequestFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators
const url = "/bugs"; //esto podria estar en un config file

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  // el 10 deberia estar tambien en un config file, ademas esta implementacion deberia ser generalizada
  if (diffInMinutes < 10) return;

  dispatch(
    apiCallBegan({
      url,
      // method: "get", por default el metodo es get
      // data: {},
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type,
    })
  );
};

// command - event
// addBug - bugAdded
// command: instruction into the system. representa lo que se debe hacer
// event: representa lo que acaba de pasar
export const addBug = (bug) =>
  apiCallBegan({
    url,
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
  });

export const resolveBug = (id) =>
  apiCallBegan({
    url: url + "/" + id,
    method: "patch",
    data: { resolved: true },
    onSuccess: bugResolved.type,
  });

export const assignBugToUser = (bugId, userId) =>
  apiCallBegan({
    url: url + "/" + bugId,
    method: "patch",
    data: { userId },
    onSuccess: bugAssignedToUser.type,
  });

// Selector Function, funcion que toma el estado y retorna el estado computado
getUnresolvedBugsMalHecho = (state) =>
  state.entities.bugs.filter((bug) => !bug.resolved); //el problema es que devuelve un array nuevo cada vez que es llamado y esto hace que se vuelva a renderizar los componentes cada vez que llamamos la funcion

// Memoization es una tecnica para optimizar estas funciones costosas (en terminos de tiempo). si la lista de unresolved bugs no cambio, podemos obtenerla desde el cache
export const getUnresolvedBugs = createSelector(
  // selectors functions
  (state) => state.entities.bugs,
  (state) => state.entities.projects, //(1)
  // result function
  (bugs, projects) => bugs.filter((bug) => !bug.unresolved) //esto no se va a ejecutar si la lista de bugs no cambio
);

// podemos crear varios selectors (1). la ultima funcion toma los outputs de las otras funciones

export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );
