import { useRef } from "react";

const CounterRef = () => {
  const countRef = useRef(0);

  const handleIncrement = () => {
    countRef.current += 1;
    console.log("valor actual: ", countRef.current);
  };

  return (
    <div>
      <p>Contador: {countRef.current}</p>
      <button onClick={handleIncrement}>Incrementar</button>
    </div>
  );
};

export default CounterRef;
