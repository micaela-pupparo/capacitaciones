/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from "react";
import Counter from "./Counter";
import ICounter from "../types/counterType";

interface CountersProps {
  counters: ICounter[];
  onReset: () => void;
  onDelete: (id: number) => void;
  onIncrement: (counter: ICounter) => void;
}

class Counters extends React.Component<CountersProps, object> {
  render() {
    const { onReset, onDelete, counters, onIncrement } = this.props;
    return (
      <div>
        <button
          onClick={() => onReset()}
          className="btn btn-primary btn-sm m-2"
        >
          Reset
        </button>
        {counters.map((counter) => (
          <Counter
            key={counter.id}
            onDelete={onDelete}
            onIncrement={onIncrement}
            counter={counter}
          >
            {/* dentro se le pasa a la propiedad props hijos, se pueden acceder a ellos con props.children */}
            {/* <h4>Counter #{counter.id}</h4> podemos pasar directamente el id en props*/}
          </Counter>
        ))}
      </div>
    );
  }
}

export default Counters;
