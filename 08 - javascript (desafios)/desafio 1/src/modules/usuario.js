import { encontrarUsuario } from "./auth";

const _contraseña = new WeakMap();
const _logueoEIntentos = new WeakMap();

//para almacenar todos los usuarios
export let usuarios = [];

export function Usuarios(nombre, email, contraseña) {
  this.nombre = nombre;
  this.email = email;

  //hay una forma que esta en estado experimental que es usando el #
  _contraseña.set(this, contraseña);
  _logueoEIntentos.set(this, { logueado: false, intentos: 0 });

  let historialAcceso = [];
  this.agregarAcceso = function () {
    const horarioAcceso = new Date().toISOString();
    historialAcceso.push(horarioAcceso);
    if (historialAcceso.length > 5) historialAcceso.shift();
  };
  this.mostrarHistorialAcceso = function () {
    return historialAcceso.slice();
  };

  usuarios.push(this);
}

Usuarios.login = function (usuarioALoguear) {
  const resultado = encontrarUsuario(usuarioALoguear);
  const datos = _logueoEIntentos.get(resultado);

  if (resultado._contraseña === usuarioALoguear._contraseña) {
    if (datos.logueado === true)
      return console.log(
        `${resultado.nombre} ya estaba con la sesion iniciada`
      );
    datos.logueado = true;
    datos.intentos = 0;
    resultado.agregarAcceso();

    return console.log(`${resultado.nombre} ha iniciado sesion!`);
  }

  if (resultado._contraseña !== usuarioALoguear._contraseña) {
    datos.intentos++;
    if (datos.intentos > 3) throw new Error("Cuenta bloqueada");
    console.log("contraseña incorrecta");
  }
};

Usuarios.logout = function (usuarioADesloguear) {
  const resultado = encontrarUsuario(usuarioADesloguear);
  const datos = _logueoEIntentos.get(resultado);

  datos.logueado = false;
  datos.intentos = 0;

  return console.log(`${resultado.nombre} ha cerrado sesion!`);
};

Usuarios.prototype.cambiarContraseña = function (contraseña) {
  const validarContraseña = (nuevaContraseña) => {
    if (typeof nuevaContraseña === "string")
      if (nuevaContraseña.length > 4) return !nuevaContraseña.includes(" ");
    return false;
  };

  if (!validarContraseña(contraseña)) return console.log("contraseña invalida");

  _contraseña.set(this, contraseña);
  console.log("contraseña cambiada con exito!");
};

Usuarios.prototype.verContenido = function () {
  console.log("miraste contenido!");
};

Usuarios.prototype.mostrarActividad = function () {
  return `${this.nombre} últimos accesos:
  ${this.mostrarHistorialAcceso().join(", ")}`;
};
