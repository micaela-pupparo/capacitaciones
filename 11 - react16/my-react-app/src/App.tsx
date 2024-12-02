/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState } from "react";
// import TableOfMovies from "./components/TableOfMovies";
// import "./App.css";

import Counters from "./components/Counters";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div>
      <main className="container">
        {/* <TableOfMovies></TableOfMovies> */}
        <Counters></Counters>
      </main>
    </div>
  );
}

export default App;
