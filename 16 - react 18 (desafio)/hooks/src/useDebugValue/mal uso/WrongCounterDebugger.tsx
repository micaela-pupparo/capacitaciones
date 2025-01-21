import { useDebugValue, useState } from "react";

const WrongCounterDebugger = () => {
  const [count, setCount] = useState(0);

  useDebugValue(`Contador: ${count}`);

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
    </div>
  );
};

export default WrongCounterDebugger;

// no se debe usar en componentes funcionales, solo hooks personalizados
// react devtools ya puede inspeccionar el estado sin utilizar usedebugvalue
