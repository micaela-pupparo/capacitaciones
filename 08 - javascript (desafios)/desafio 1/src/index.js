import { Usuarios } from "./modules/usuario";
import { Administrador, Editor } from "./modules/roles";
// ------------------------ INDEX ------------------------------
const usuario = new Usuarios("micaela", "micaela@gmail.com", "mica1234");
const otro = new Usuarios("belen", "belen@gmail.com", "belen1234");
const admin = new Administrador("mauro", "mauro@gmail.com", "mauro");
const editor = new Editor("matias", "matias@gmail.com", "matias123");
const nuevo = {
  nombre: "agus",
  email: "agus@gmail.com",
  _contraseña: "123",
};
const contraseñaEquivocada = {
  nombre: "belen",
  email: "belen@gmail.com",
  _contraseña: "belen1234",
};
const contraseñaInvalida = {
  nombre: "lorena",
  email: "lorena@gmail.com",
  _contraseña: "!!!",
};
const emailInvalido = {
  nombre: "lorena",
  email: "lore   na@gmail.com",
  _contraseña: "am123",
};
const nombreInvalido = {
  nombre: "123",
  email: "lorena@gmail.com",
  _contraseña: "lore1232",
};

try {
  admin.agregarUsuario(nuevo);
  admin.agregarUsuario(contraseñaInvalida);
  admin.agregarUsuario(nombreInvalido);
  admin.agregarUsuario(emailInvalido);
  admin.eliminarUsuario(nuevo);
  Usuarios.logout(otro);
  Usuarios.login(contraseñaEquivocada);
  Usuarios.login(otro);
  //Usuarios.login(contraseñaEquivocada);
  //Usuarios.login(contraseñaEquivocada);
  //Usuarios.login(contraseñaEquivocada);
  otro.cambiarContraseña("12345");
  console.log(otro.mostrarActividad());
} catch (e) {
  console.log(e);
}
