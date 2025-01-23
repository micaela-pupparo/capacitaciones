import React, { useState, useTransition } from "react";

const WrongFormTransition = () => {
  const [formData, setFormData] = useState({ name: "" });
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    startTransition(() => {
      setFormData({ name: value });
    });
  };

  return (
    <div>
      <input
        type="text"
        value={formData.name}
        onChange={handleChange}
        placeholder="Escribe tu nombre"
      />
      {isPending && <p>Procesando entrada...</p>}
      <p>Nombre: {formData.name}</p>
    </div>
  );
};

export default WrongFormTransition;
