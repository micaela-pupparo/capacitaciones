import { usuarios, Usuarios } from "./usuario";
import { encontrarUsuario, validarDatos, validarEmail } from "./auth";

const _tipo = new WeakMap();

export function Administrador(nombre, email, _contraseña) {
  Usuarios.call(this, nombre, email, _contraseña);
  _tipo.set(this, "admin");
}

Administrador.prototype = Object.create(Usuarios.prototype);
Administrador.prototype.constructor = Administrador;

Administrador.prototype.agregarUsuario = function (usuario) {
  const { nombre, email, _contraseña } = usuario;
  let esValido = validarDatos(nombre, _contraseña);

  if (!esValido) return console.log("datos invalidos");

  new Usuarios(nombre, email, _contraseña);
  console.log(`${nombre} fue creado con exito por ${this.nombre}`);
};

Administrador.prototype.eliminarUsuario = function (usuario) {
  const verificarUsuario = (usuario) => {
    return usuarios.some((usr) => usr.email === usuario.email);
  };

  if (!verificarUsuario(usuario)) {
    return console.log("El usuario no existe");
  }

  usuarios = usuarios.filter((usr) => usr.email !== usuario.email);
  console.log(
    `el usuario ${usuario.nombre} ha sido eliminado por ${this.nombre}`
  );
};

export function Editor(nombre, email, _contraseña) {
  new Usuarios(nombre, email, _contraseña);
  _tipo.set(this, "editor");
}

Editor.prototype = Object.create(Usuarios.prototype);
Editor.prototype.constructor = Editor;

Editor.prototype.modificarCotenido = function () {
  console.log("modificaste contenido!");
};
