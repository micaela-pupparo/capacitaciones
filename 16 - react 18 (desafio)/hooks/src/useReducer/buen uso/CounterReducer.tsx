import { useReducer } from "react";

interface State {
  count: number;
}

type Action = { type: "increment" } | { type: "decrement" } | { type: "reset" };

const initialState: State = { count: 0 };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

const CounterReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Contador: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>
        Incrementar
      </button>
      <button onClick={() => dispatch({ type: "decrement" })}>
        Decrementar
      </button>
      <button onClick={() => dispatch({ type: "reset" })}>Reiniciar</button>
    </div>
  );
};

export default CounterReducer;
