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
// import Like from "./components/Like";

// function App() {
//   return (
//     <div>
//       <Like onClick={() => console.log("clicked")} />
//     </div>
//   );
// }

// import ExpandableText from "./components/ExpandableText";

// function App() {
//   return (
//     <div>
//       <ExpandableText maxChars={20}>
//         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus
//         fuga maxime omnis hic distinctio amet illum corrupti labore eius tenetur
//         deserunt, animi, iusto adipisci, ducimus tempora ullam debitis eveniet
//         explicabo esse quo nisi qui? Minus, quod sint consequuntur itaque
//         blanditiis facere magnam eveniet sapiente tempore quasi animi culpa
//         dolores illo voluptas dolor exercitationem earum! Quam, nam pariatur
//         numquam iste repudiandae architecto earum iure omnis? Quibusdam,
//         blanditiis! Quia repudiandae quo quaerat, fuga ab eaque delectus enim
//         quis voluptas? Quo, sunt. Obcaecati impedit quaerat, dolore ducimus
//         autem ad ipsam itaque eaque nam porro facilis architecto minima dolorem
//         debitis fugit commodi! Debitis, obcaecati.
//       </ExpandableText>
//     </div>
//   );
// }

// import Form from "./components/Form";

// function App() {
//   return (
//     <div>
//       <Form></Form>
//     </div>
//   );
// }

import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import { useState } from "react";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expenses, setExpenses] = useState([
    { id: 1, description: "aaa", amount: 10, category: "Utilities" },
    { id: 2, description: "bbb", amount: 10, category: "Utilities" },
    { id: 3, description: "ccc", amount: 10, category: "Utilities" },
    { id: 4, description: "ddd", amount: 10, category: "Utilities" },
  ]);

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  return (
    <div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>
      <ExpenseList
        expenses={visibleExpenses}
        onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
      />
    </div>
  );
}

export default App;
