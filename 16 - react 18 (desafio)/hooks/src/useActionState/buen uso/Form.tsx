import { useActionState } from "react";

async function updateName(previousName: string, formData: FormData) {
  const newName = formData.get("name");

  const response = await fetch("https://jsonplaceholder.typicode.com/users/1", {
    method: "PATCH",
    body: JSON.stringify({ name: newName }),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const { message } = await response.json();
    return { message, previousName };
  }

  return newName;
}

const Form = () => {
  const [name, submitAction, isPending] = useActionState(updateName, "");

  return (
    <form action={submitAction}>
      <div style={{ marginBottom: 30 }}>
        <label
          htmlFor="name"
          style={{
            display: "block",
            textAlign: "left",
            fontSize: 14,
          }}
        >
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Nombre..."
          defaultValue={name}
          style={{ padding: 6, marginTop: 6 }}
        />
        {name && !isPending && (
          <p style={{ fontSize: 8, textAlign: "left", margin: 0 }}>
            Nombre actualizado a: {name}
          </p>
        )}
      </div>

      <button disabled={isPending} type="submit">
        {isPending ? "Actualizando..." : "Actualizar"}
      </button>
    </form>
  );
};

export default Form;
