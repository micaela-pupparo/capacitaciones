// import ListGroup from "./components/ListGroup";

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

import Alert from "./components/Alert";

function App() {
  const items = ["New York", "San Francisco", "Tokyo", "London", "Paris"];

  const handleSelectItem = (item: string) => {};

  return (
    <div>
      <Alert>
        Hello <span>World</span>
      </Alert>
    </div>
  );
}

export default App;
