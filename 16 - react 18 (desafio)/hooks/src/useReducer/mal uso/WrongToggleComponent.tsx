import { useReducer } from "react";

interface State {
  isVisible: boolean;
}

type Action = { type: "toggle" };

const initialState: State = { isVisible: false };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "toggle":
      return { ...state, isVisible: !state.isVisible };
    default:
      return state;
  }
};

const WrongToggleComponent = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>{state.isVisible ? "Visible" : "Oculto"}</p>
      <button onClick={() => dispatch({ type: "toggle" })}>Toggle</button>
    </div>
  );
};

export default WrongToggleComponent;
