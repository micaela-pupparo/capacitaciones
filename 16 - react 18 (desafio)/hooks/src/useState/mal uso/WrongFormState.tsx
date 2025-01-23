import { useState } from "react";

const WrongFormState = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState<number | null>(null);

  const handleSubmit = () => {
    console.log({ name, email, age });
  };

  return (
    <form>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo"
      />
      <input
        type="number"
        value={age ?? ""}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="Edad"
      />
      <button type="button" onClick={handleSubmit}>
        Enviar
      </button>
    </form>
  );
};

export default WrongFormState;

// cada campo tiene su propio estado
// puede resultar en logica duplicada y dificil de escalar
// mas facil usar useReducer
