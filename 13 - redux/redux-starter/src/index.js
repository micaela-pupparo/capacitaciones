import configureStore from "./store/configureStore";
import * as actions from "./store/bugs";

// la funcion es llamada siempre que el esatdo cambia
// los componentes UI deberian estar suscriptos. pero cuando no estan visibles
// deberian desuscribirse.
const store = configureStore();

store.subscribe(() => {
  console.log("Store changed!", store.getState());
});

store.dispatch(actions.bugAdded({ description: "Bug 1" }));
store.dispatch(actions.bugAdded({ description: "Bug 2" }));
store.dispatch(actions.bugAdded({ description: "Bug 3" }));
store.dispatch(actions.bugResolved({ id: 1 }));

unsubscribe();

console.log(store.getState());
