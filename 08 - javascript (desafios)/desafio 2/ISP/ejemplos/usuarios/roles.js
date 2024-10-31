import { AgregarUsuarioMixin } from "./mixinsusuarios.js";
import { Usuarios } from "./usuarios.js";

class Administrador extends AgregarUsuarioMixin(Usuarios) {
  constructor(nombre, contraseña) {
    super(nombre, contraseña);
  }

  agregarUsuario() {
    return console.log("agregaste a un usuario!");
  }
}

class Dueño extends AgregarUsuarioMixin(Usuarios) {
  constructor(nombre, contraseña) {
    super(nombre, contraseña);
  }

  agregarUsuario() {
    return console.log("agregaste a un usuario!");
  }
}
