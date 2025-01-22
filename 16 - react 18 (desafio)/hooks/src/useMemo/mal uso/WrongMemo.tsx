import { useMemo } from "react";

const WrongMemo = () => {
  const suma = useMemo(() => 1 + 1, []);

  return <div>Suma: {suma}</div>;
};

export default WrongMemo;
