/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from "react";
import Counter from "./Counter";

interface CountersProps {}

interface CountersState {
  counters: object[];
}

class Counters extends React.Component<CountersProps, CountersState> {
  state = {
    counters: [
      { id: 1, value: 4 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
  };

  render() {
    return (
      <div>
        {this.state.counters.map((counter) => (
          <Counter
            key={counter.id}
            onDelete={this.handleDelete}
            counter={counter}
          >
            {/* dentro se le pasa a la propiedad props hijos, se pueden acceder a ellos con props.children */}
            {/* <h4>Counter #{counter.id}</h4> podemos pasar directamente el id en props*/}
          </Counter>
        ))}
      </div>
    );
  }

  //   esto se le llama handling an event
  handleDelete = (counterId: number) => {
    const counters = this.state.counters.filter((c) => c.id !== counterId);
    return this.setState({ counters });
  };
}

export default Counters;
