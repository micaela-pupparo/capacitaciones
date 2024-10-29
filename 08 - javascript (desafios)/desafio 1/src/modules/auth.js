import { usuarios } from "./usuario";

export function encontrarUsuario(usuarioAEncontrar) {
  const resultado = usuarios.find(
    (usuario) => usuarioAEncontrar.email === usuario.email
  );
  if (!resultado) throw new Error("usuario no encontrado");
  return resultado;
}

export function validarDatos(...datos) {
  for (let dato of datos) {
    if (typeof dato !== "string") return false;
    if (dato.length < 1) return false;
  }
  return true;
}

export function validarEmail(email) {
  email.includes("@") ? true : false;
}
