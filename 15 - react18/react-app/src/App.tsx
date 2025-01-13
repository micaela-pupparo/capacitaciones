import ListGroup from "./components/ListGroup";

// function App() {
//   const items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

//   const handleSelectItem = (item: string) => {};

//   return (
//     <div>
//       <ListGroup
//         items={items}
//         heading="Cities"
//         onSelectItem={handleSelectItem}
//       />
//     </div>
//   );
// }

// export default App;

// import Alert from "./components/Alert";

// function App() {
//   const items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

//   const handleSelectItem = (item: string) => {};

//   return (
//     <div>
//       <Alert>
//         Hello <span>World</span>
//       </Alert>
//     </div>
//   );
// }

// export default App;

// import Button from "./components/Button";
// import Alert from "./components/Alert";
// import { useState } from "react";

// function App() {
//   const [alertVisible, setAlertVisibility] = useState(false);

//   return (
//     <div>
//       {alertVisible && (
//         <Alert onClose={() => setAlertVisibility(false)}>My alert</Alert>
//       )}
//       <Button onClick={() => setAlertVisibility(true)}>My button</Button>
//     </div>
//   );
// }

// export default App;
import Like from "./components/Like";

function App() {
  return (
    <div>
      <Like onClick={() => console.log("clicked")} />
    </div>
  );
}

export default App;
