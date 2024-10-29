import { usuarios } from "./usuario";

export function encontrarUsuario(usuarioAEncontrar) {
  const resultado = usuarios.find(
    (usuario) => usuarioAEncontrar.email === usuario.email
  );
  if (!resultado) throw new Error("usuario no encontrado");
  return resultado;
}

//solo para validar strings y que no esté vacío
export function validarDatos(...datos) {
  for (let dato of datos) {
    if (typeof dato !== "string") return false;
    if (dato.length < 1) return false;
  }
  return true;
}

export function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    console.log("el mail debe ser válido");
    return false;
  }
  return true;
}

export function validarContraseña(contraseña) {
  const regex = /^[A-Za-z0-9]+$/;
  if (!regex.test(contraseña)) {
    console.log("la contraseña debe tener números y letras");
    return false;
  }
  return true;
}

export function validarNombre(nombre) {
  const regex = /^[A-Za-z]+$/;
  if (!regex.test(nombre)) {
    console.log("el nombre puede contener solo letras");
    return false;
  }
  return true;
}
