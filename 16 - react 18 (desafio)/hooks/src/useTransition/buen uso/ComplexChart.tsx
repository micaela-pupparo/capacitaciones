import { useState, useTransition } from "react";

const ComplexChart = () => {
  const [data, setData] = useState([0, 0, 0]);
  const [isPending, startTransition] = useTransition();

  const handleUpdateChart = () => {
    startTransition(() => {
      const newData = Array.from({ length: 20 }, () =>
        Math.floor(Math.random() * 100)
      );
      setData(newData);
    });
  };

  return (
    <div>
      <button onClick={handleUpdateChart}>Actualizar Gráfico</button>
      {isPending && <p>Cargando gráfico...</p>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(20, 1fr)",
          marginTop: 60,
        }}
      >
        {data.map((value, index) => (
          <div
            key={index}
            style={{
              height: `${value}px`,
              background: "teal",
              margin: "2px",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ComplexChart;
