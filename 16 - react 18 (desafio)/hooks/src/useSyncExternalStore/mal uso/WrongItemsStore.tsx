import React, { useState, useSyncExternalStore } from "react";

const WrongItemsStore: React.FC = () => {
  const [data, setData] = useState(["Item 1", "Item 2"]);

  const subscribe = (listener: () => void) => {
    return () => {
      console.log(listener);
    };
  };

  const getSnapshot = () => data;

  const addItem = () => {
    setData((prev) => [...prev, `Item ${prev.length + 1}`]);
  };

  const items = useSyncExternalStore(subscribe, getSnapshot);

  return (
    <div>
      <h1>Lista de elementos</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={addItem}>Agregar elemento</button>
    </div>
  );
};

export default WrongItemsStore;

// se intenta sincronizar un estado que ya esta gestionado por react con usestate
// la suscripcion no tiene ningun proposito
// agrega capa adicional de complejidad sin beneficios
