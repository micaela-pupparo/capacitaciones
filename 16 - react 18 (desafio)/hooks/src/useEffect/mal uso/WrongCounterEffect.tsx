import { useEffect, useState } from "react";

const WrongCounterEffect = () => {
  const [count, setCount] = useState(0);
  // ya de por si esto esta mal porque no hacia falta crear otra variable de estado
  const [double, setDouble] = useState(0);

  useEffect(() => {
    setDouble(count * 2);
  }, [count]);

  return (
    <div>
      <p>Contador: {count}</p>
      <p>Doble: {double}</p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
    </div>
  );
};

export default WrongCounterEffect;
