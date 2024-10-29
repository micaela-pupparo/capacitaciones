import { usuarios, Usuarios } from "./usuario";
import {
  encontrarUsuario,
  validarDatos,
  validarEmail,
  validarContraseña,
  validarNombre,
} from "./auth";

const _tipo = new WeakMap();

export function Administrador(nombre, email, _contraseña) {
  Usuarios.call(this, nombre, email, _contraseña);
  _tipo.set(this, "admin");
}

Administrador.prototype = Object.create(Usuarios.prototype);
Administrador.prototype.constructor = Administrador;

Administrador.prototype.agregarUsuario = function (usuario) {
  const { nombre, email, _contraseña } = usuario;
  let datosValidos = validarDatos(nombre, _contraseña, email);
  let emailValido = validarEmail(email);
  let nombreValido = validarNombre(nombre);
  let contraseñaValida = validarContraseña(_contraseña);

  if (!datosValidos || !emailValido || !nombreValido || !contraseñaValida)
    return;

  new Usuarios(nombre, email, _contraseña);
  console.log(`${nombre} fue creado con exito por ${this.nombre}`);
};

Administrador.prototype.eliminarUsuario = function (usuario) {
  const resultado = encontrarUsuario(usuario);

  if (resultado) {
    usuarios = usuarios.filter((usr) => usr.email !== resultado.email);
    console.log(
      `el usuario ${resultado.nombre} ha sido eliminado por ${this.nombre}`
    );
  }
};

export function Editor(nombre, email, _contraseña) {
  Usuarios.call(this, nombre, email, _contraseña);
  _tipo.set(this, "editor");
}

Editor.prototype = Object.create(Usuarios.prototype);
Editor.prototype.constructor = Editor;

Editor.prototype.modificarCotenido = function () {
  console.log("modificaste contenido!");
};
