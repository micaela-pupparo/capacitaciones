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
      { id: 1, value: 0 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
  };

  render() {
    return (
      <div>
        {this.state.counters.map((counter) => (
          <Counter key={counter.id}></Counter>
        ))}
      </div>
    );
  }
}

export default Counters;
