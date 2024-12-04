/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState } from "react";
// import "./App.css";

// import Counters from "./components/Counters";
// import ICounter from "./types/counterType";
// import NavBar from "./components/NavBar";
import { Component } from "react";

// interface AppState {
//   counters: ICounter[];
// }

// class App extends Component<object, AppState> {
//   // const [count, setCount] = useState(0);
//   state = {
//     counters: [
//       { id: 1, value: 4 },
//       { id: 2, value: 0 },
//       { id: 3, value: 0 },
//       { id: 4, value: 0 },
//     ],
//   };

//   handleReset = () => {
//     const counters = this.state.counters.map((c) => {
//       c.value = 0;
//       return c;
//     });
//     this.setState({ counters });
//   };

//   //   esto se le llama handling an event
//   handleDelete = (counterId: number) => {
//     const counters = this.state.counters.filter((c) => c.id !== counterId);
//     return this.setState({ counters });
//   };

//   handleIncrement = (counter: ICounter) => {
//     // no podemos incrementar directamente con esta constante porque al hacer referencia al objeto original, se va a incrementar el valor en this.state.counters y no es lo que queremos. la idea es siempre clonar el objeto.
//     const counters = [...this.state.counters];

//     const index = counters.indexOf(counter);
//     // clonamos el objeto. de esta forma el objeto que tenemos en state permanece sin cambios
//     counters[index] = { ...counter };
//     counters[index].value++;

//     this.setState({ counters });
//   };

//   handleDecrement = (counter: ICounter) => {
//     const counters = [...this.state.counters];

//     const index = counters.indexOf(counter);
//     counters[index] = { ...counter };

//     counters[index].value--;

//     this.setState({ counters });
//   };

//   render() {
//     return (
//       <div>
//         <NavBar
//           totalCounters={this.state.counters.filter((c) => c.value > 0).length}
//         ></NavBar>
//         <main className="container">
//           {/* <TableOfMovies></TableOfMovies> */}
//           <Counters
//             counters={this.state.counters}
//             onReset={this.handleReset}
//             onIncrement={this.handleIncrement}
//             onDecrement={this.handleDecrement}
//             onDelete={this.handleDelete}
//           ></Counters>
//         </main>
//       </div>
//     );
//   }
// }

import TableOfMovies from "./components/ListOfMovies";

class App extends Component<object, object> {
  render() {
    return (
      <div>
        <main className="container">
          <TableOfMovies></TableOfMovies>
        </main>
      </div>
    );
  }
}

export default App;
