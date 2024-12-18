import store from "./store";
import * as actions from "./actionTypes";

// la funcion es llamada siempre que el esatdo cambia
// los componentes UI deberian estar suscriptos. pero cuando no estan visibles
// deberian desuscribirse.
const unsubscribe = store.subscribe(() => {
  console.log("Store changed!", store.getState());
});

store.dispatch({
  type: actions.BUD_ADDED,
  payload: {
    description: "Bug1",
  },
});

unsubscribe();

store.dispatch({
  type: actions.BUD_REMOVED,
  payload: {
    id: 1,
  },
});

console.log(store.getState());
