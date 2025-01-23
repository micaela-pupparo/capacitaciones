import { useActionState } from "react";

async function genericAction(
  previousState: object | undefined,
  formData: FormData
) {
  // solo actualiza una cosa por mas de que en el form 2 tenga name y username
  if (formData.has("username")) {
    const newUsername = formData.get("username");

    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1",
      {
        method: "PATCH",
        body: JSON.stringify({ username: newUsername }),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      return { username: previousState };
    }

    return { username: newUsername };
  }

  if (formData.has("name")) {
    const newName = formData.get("name");

    const response = await fetch(
      "https://jsonplaceholder.typicode.com/comments/1",
      {
        method: "PATCH",
        body: JSON.stringify({ name: newName }),
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      return { name: previousState };
    }

    return { name: newName };
  }
}

const WrongForm = () => {
  const [state, submitAction, isPending] = useActionState(genericAction, {
    username: "",
  });
  const name = state?.name ? state.name : "";
  const username = state?.username ? state.username : "";

  console.log(state);

  return (
    <>
      <div>
        <div>Formulario 1</div>
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
              defaultValue={String(name)}
              style={{ padding: 6, marginTop: 6 }}
            />
            {name && !isPending && (
              <p style={{ fontSize: 8, textAlign: "left", margin: 0 }}>
                Nombre del comentario actualizado a: {String(name)}
              </p>
            )}
          </div>
          <button disabled={isPending} type="submit">
            {isPending ? "Actualizando..." : "Actualizar"}
          </button>
        </form>
      </div>
      <div style={{ marginTop: 40 }}>
        <div>Formulario 2</div>
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
              defaultValue={String(name)}
              style={{ padding: 6, marginTop: 6 }}
            />
            {name && !isPending && (
              <p style={{ fontSize: 8, textAlign: "left", margin: 0 }}>
                Nombre del usuario actualizado a: {String(name)}
              </p>
            )}
          </div>
          <div style={{ marginBottom: 30 }}>
            <label
              htmlFor="username"
              style={{
                display: "block",
                textAlign: "left",
                fontSize: 14,
              }}
            >
              Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Usuario..."
              defaultValue={String(username)}
              style={{ padding: 6, marginTop: 6 }}
            />
            {username && !isPending && (
              <p style={{ fontSize: 8, textAlign: "left", margin: 0 }}>
                Usuario actualizado a: {String(username)}
              </p>
            )}
          </div>
          <button disabled={isPending} type="submit">
            {isPending ? "Actualizando..." : "Actualizar"}
          </button>
        </form>
      </div>
    </>
  );
};

export default WrongForm;
