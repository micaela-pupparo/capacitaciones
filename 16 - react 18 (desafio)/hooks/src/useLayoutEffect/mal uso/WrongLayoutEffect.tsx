import { useLayoutEffect, useState } from "react";

const WrongLayoutEffect = () => {
  const [data, setData] = useState<string | null>(null);

  useLayoutEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((response) => response.json())
      .then((json) => setData(json.title));
  }, []);

  return <div>{data || "Loading..."}</div>;
};

export default WrongLayoutEffect;
