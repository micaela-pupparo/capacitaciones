import { useInsertionEffect, useState } from "react";

const WrongInsertionEffect = () => {
  //   const [data, setData] = useState(initialData);
  const [apiData, setApiData] = useState([]);

  useInsertionEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setApiData(data));
  }, []);

  return <div>{apiData}</div>;
};

export default WrongInsertionEffect;

// si bien este hook se ejecuta antes de useEffect o useLayoutEffect, no fue diseñado para esto. Se deberia usar useEffect para este caso.
