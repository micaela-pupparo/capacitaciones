import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugResolved,
  bugAssignedToUser,
  getUnresolvedBugs,
  getBugsByUser,
} from "./store/bugs";
import { userAdded } from "./store/users";

// la funcion es llamada siempre que el esatdo cambia
// los componentes UI deberian estar suscriptos. pero cuando no estan visibles
// deberian desuscribirse.
const store = configureStore();

store.subscribe(() => {
  console.log("Store changed!", store.getState());
});

store.dispatch(userAdded({ name: "User 1" }));
store.dispatch(userAdded({ name: "User 2" }));
store.dispatch(bugAdded({ description: "Bug 1" }));
store.dispatch(bugAdded({ description: "Bug 2" }));
store.dispatch(bugAdded({ description: "Bug 3" }));
store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));
store.dispatch(bugResolved({ id: 1 }));

const unresolvedBugs = getUnresolvedBugs(store.getState());
const bugsByUser = getBugsByUser(1)(store.getState());

console.log(unresolvedBugs);
console.log(bugsByUser);

unsubscribe();

console.log(store.getState());
