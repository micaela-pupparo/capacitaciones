import "./App.css";

// --------------- useActionState --------------------
// import Form from "./useActionState/buen uso/form";
// import WrongForm from "./useActionState/mal uso/WrongForm";

// function App() {
//   return (
//     <>
//       {/* <Form /> */}
//       <WrongForm />
//     </>
//   );
// }

// export default App;

// --------------- useCallback -----------------------
// import List from "./useCallback/buen uso/List";
// import WrongCounter from "./useCallback/mal uso/wrongCounter";
// function App() {
//   return (
//     <>
//       <List />
//       <WrongCounter />
//     </>
//   );
// }

// export default App;

// ---------------- useContext ----------------------
// import ThemedButton from "./useContext/buen uso/ThemedButton";
// import ThemeProvider from "./useContext/buen uso/ThemeProvider";
// import CounterProvider from "./useContext/mal uso/CounterProvider";
// import WrongCounterConsumer from "./useContext/mal uso/WrongCounterConsumer";

// function App() {
//   return (
//     <>
//       <ThemeProvider>
//         <ThemedButton />
//       </ThemeProvider>

//       <CounterProvider>
//         <WrongCounterConsumer />
//       </CounterProvider>
//     </>
//   );
// }

// export default App;

// ---------------- useDebugValue -------------------
// import UserProfile from "./useDebugValue/buen uso/UserProfile";
// import WrongCounterDebugger from "./useDebugValue/mal uso/WrongCounterDebugger";

// function App() {
//   return (
//     <>
//       <UserProfile />
//       <WrongCounterDebugger />
//     </>
//   );
// }

// export default App;

// ----------------- useDeferredValue ----------------
// import FilteredLists from "./useDeferredValue/buen uso/FilteredListss";
// import WrongCounterDeferred from "./useDeferredValue/mal uso/WrongCounterDeferred";

// function App() {
//   const items = Array.from({ length: 1000 }, (_, i) => `Elemento ${i + 1}`);
//   return (
//     <>
//       <FilteredLists items={items} />
//       <WrongCounterDeferred />
//     </>
//   );
// }

// export default App;

// ------------------- useEffect ----------------------
// import UserList from "./useEffect/buen uso/UserList";
// import WrongCounterEffect from "./useEffect/mal uso/WrongCounterEffect";

// function App() {
//   return (
//     <>
//       <UserList />
//       <WrongCounterEffect />
//     </>
//   );
// }

// export default App;

// ------------------ useId -----------------------------
// import FormFieldId from "./useId/buen uso/FormFieldId";
// import WrongItemList from "./useId/mal uso/WrongItemList";

// function App() {
//   const items = ["item1", "item2", "item3"];

//   return (
//     <>
//       <FormFieldId label="Nombre" />
//       <FormFieldId label="Correo electronico" />

//       <WrongItemList items={items} />
//     </>
//   );
// }

// export default App;

// -------------------- useImperativeHandle --------------
// import { useRef } from "react";
// import CustomInput, {
//   CustomInputHandles,
// } from "./useImperativeHandle/buen uso/CustomInput";

// function App() {
//   const inputRef = useRef<CustomInputHandles>(null);

//   return (
//     <>
//       <CustomInput ref={inputRef} />
//       <button onClick={() => inputRef.current?.focus()}>Focus</button>
//       <button onClick={() => inputRef.current?.clear()}>Clear</button>
//     </>
//   );
// }

// export default App;

// -------------------- useInsertionEffect ---------------------
import DynamicStyleComponent from "./useInsertionEffect/buen uso/DynamicStyleComponent";

function App() {
  return (
    <>
      <DynamicStyleComponent />
    </>
  );
}

export default App;
