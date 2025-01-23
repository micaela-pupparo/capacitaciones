import React, { useState, useOptimistic } from "react";

const BadOptimisticExample: React.FC = () => {
  const [messages] = useState<string[]>([]);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (currentState, newMessage: string) => {
      currentState.push(newMessage);
      return currentState;
    }
  );

  const sendMessage = async (newMessage: string) => {
    try {
      addOptimisticMessage(newMessage);

      await new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Conexion fallo")), 1000);
      });
    } catch (error) {
      console.error("Fallo en envio del mensaje: ", error);
    }
  };

  return (
    <div>
      {optimisticMessages.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
      <button onClick={() => sendMessage("Bad optimistic update")}>
        Send Message
      </button>
    </div>
  );
};

export default BadOptimisticExample;

// muta directamente el estado
// falta de manejo de errores apropiado
// falta mecanismo rollback
