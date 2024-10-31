import { AgregarUsuarioMixin } from "./mixinsusuarios.js";
import { Usuarios } from "./usuarios.js";

class Administrador extends AgregarUsuarioMixin(Usuarios) {
  constructor(nombre, contraseña) {
    super(nombre, contraseña);
  }
}

class Dueño extends AgregarUsuarioMixin(Usuarios) {
  constructor(nombre, contraseña) {
    super(nombre, contraseña);
  }
}
