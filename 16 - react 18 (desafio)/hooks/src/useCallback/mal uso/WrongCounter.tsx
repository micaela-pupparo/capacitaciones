import { useCallback, useState } from "react";

const WrongCounter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={handleIncrement}>Incrementar</button>
    </div>
  );
};

export default WrongCounter;

// no hay beneficios de rendimiento: la funcion se define dentro del mismo componente y no se pasa como prop a un hijo memoizado
// la dependencia de count hace que la funcion se vuelva a crear en cada render --> pierde proposito el hook
// mas dificil de leer y mantener sin ninguna ventaja real
