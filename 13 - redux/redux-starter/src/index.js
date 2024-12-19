import configureStore from "./store/configureStore";
import { loadBugs, addBug, resolveBug, assignBugToUser } from "./store/bugs";
import { userAdded } from "./store/users";

// la funcion es llamada siempre que el esatdo cambia
// los componentes UI deberian estar suscriptos. pero cuando no estan visibles
// deberian desuscribirse.
const store = configureStore();

store.subscribe(() => {
  console.log("Store changed!", store.getState());
});

// aca estariamos en la UI Layer. no queremos mostrar estos datos tan especificos aca por posibilidades de cambiar la implementacion
store.dispatch(addBug({ description: "a" }));

store.dispatch(loadBugs());

setTimeout(() => store.dispatch(resolveBug(1)), 2000);
setTimeout(() => store.dispatch(assignBugToUser(1, 4)), 4000);

// store.dispatch((dispatch, getState) => {
//   dispatch({ type: "bugsReceived", bugs: [1, 2, 3] });
// });

const unresolvedBugs = getUnresolvedBugs(store.getState());
const bugsByUser = getBugsByUser(1)(store.getState());

console.log(unresolvedBugs);
console.log(bugsByUser);

unsubscribe();

console.log(store.getState());
