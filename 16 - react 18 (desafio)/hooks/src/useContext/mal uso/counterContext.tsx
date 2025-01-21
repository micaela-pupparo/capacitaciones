import React, { createContext } from "react";

type CountContextType = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const CounterContext = createContext<CountContextType>({
  count: 0,
  setCount: () => {
    throw new Error("setCount debe ser usado en CountProvider");
  },
});

export default CounterContext;
