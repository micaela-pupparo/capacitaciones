import store from "./store";

// la funcion es llamada siempre que el esatdo cambia
// los componentes UI deberian estar suscriptos. pero cuando no estan visibles
// deberian desuscribirse.
const unsubscribe = store.subscribe(() => {
  console.log("Store changed!", store.getState());
});

store.dispatch({
  type: "bugAdded",
  payload: {
    description: "Bug1",
  },
});

unsubscribe();

store.dispatch({
  type: "bugRemoved",
  payload: {
    id: 1,
  },
});

console.log(store.getState());
