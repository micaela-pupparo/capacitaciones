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
import ThemedButton from "./useContext/buen uso/ThemedButton";
import ThemeProvider from "./useContext/buen uso/ThemeProvider";
import CounterProvider from "./useContext/mal uso/CounterProvider";
import WrongCounterConsumer from "./useContext/mal uso/WrongCounterConsumer";

function App() {
  return (
    <>
      <ThemeProvider>
        <ThemedButton />
      </ThemeProvider>

      <CounterProvider>
        <WrongCounterConsumer />
      </CounterProvider>
    </>
  );
}

export default App;
