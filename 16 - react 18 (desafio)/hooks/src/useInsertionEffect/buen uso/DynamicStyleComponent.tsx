import React, { useInsertionEffect, useState } from "react";

type DynamicStyle = {
  backgroundColor: string;
  padding: string;
  borderRadius: string;
};

const DynamicStyleComponent: React.FC = () => {
  const [count, setCount] = useState(0);
  const [styleId, setStyleId] = useState("");

  useInsertionEffect(() => {
    const uniqueId = `dynamic-style-${Math.random()
      .toString(36)
      .substring(2, 9)}`;
    setStyleId(uniqueId);

    const styleElement = document.createElement("style");
    styleElement.setAttribute("id", uniqueId);

    const dynamicStyle: DynamicStyle = {
      backgroundColor: `hsl(${count * 20}, 70%, 80%)`,
      padding: `${8 + count}px`,
      borderRadius: `${4 + count}px`,
    };

    const cssRules = `
      .dynamic-box-${uniqueId} {
        background-color: ${dynamicStyle.backgroundColor};
        padding: ${dynamicStyle.padding};
        border-radius: ${dynamicStyle.borderRadius};
        transition: all 0.3s ease;
        margin: 20px;
        border: 1px solid #ccc;
      }
    `;

    styleElement.textContent = cssRules;
    document.head.appendChild(styleElement);

    return () => {
      const existingStyle = document.getElementById(uniqueId);
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, [count]);

  return (
    <div>
      <div className={`dynamic-box-${styleId}`}>
        <h3>Ejemplo</h3>
        <p>Contador: {count}</p>
        <button onClick={() => setCount((prev) => prev + 1)}>
          Incrementar
        </button>
      </div>
    </div>
  );
};

export default DynamicStyleComponent;

// no es recomendable insertar directamente el tag style porque:
// - la inyeccion en tiempo de ejecucion fuerza al navegador a recalcular los estilos mucho mas seguido
// - la inyeccion en tiempo de ejecucion puede ser muy lenta si pasa en un mal momento del ciclo de vida de React

// el hook ayuda a solucionar el segundo item pero no el primero.
