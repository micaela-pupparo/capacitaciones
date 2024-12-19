import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugResolved,
  bugAssignedToUser,
  getUnresolvedBugs,
  getBugsByUser,
  loadBugs,
  addBug,
  resolveBug,
} from "./store/bugs";
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

store.dispatch(userAdded({ name: "User 1" }));
store.dispatch(userAdded({ name: "User 2" }));
store.dispatch(bugAdded({ description: "Bug 1" }));
store.dispatch(bugAdded({ description: "Bug 2" }));
store.dispatch(bugAdded({ description: "Bug 3" }));
store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));
store.dispatch(bugResolved({ id: 1 }));
store.dispatch((dispatch, getState) => {
  dispatch({ type: "bugsReceived", bugs: [1, 2, 3] });
});

const unresolvedBugs = getUnresolvedBugs(store.getState());
const bugsByUser = getBugsByUser(1)(store.getState());

console.log(unresolvedBugs);
console.log(bugsByUser);

unsubscribe();

console.log(store.getState());
