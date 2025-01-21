import { useContext } from "react";
import CounterContext from "./counterContext";

const WrongCounterConsumer = () => {
  const { count, setCount } = useContext(CounterContext);

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Incrementar</button>
    </div>
  );
};

export default WrongCounterConsumer;

// era mas facil usar props
// agrega complejidad innecesaria el introducir un contexto para un componente pequeño
// peor rendimiento: react necesita verificar cambios en el contexto y puede causar re-renderizados innecesarios
