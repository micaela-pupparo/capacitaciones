import { useDeferredValue, useState } from "react";

const WrongCounterDeferred = () => {
  const [count, setCount] = useState(0);

  const deferredCount = useDeferredValue(count);

  return (
    <div>
      <p>Contador diferido: {deferredCount}</p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
    </div>
  );
};

export default WrongCounterDeferred;

// no hya necesidad de diferir
// suma ruido al codigo
