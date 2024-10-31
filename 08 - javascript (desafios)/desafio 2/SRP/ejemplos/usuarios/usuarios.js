//acá podría haber un import para validaciones
import { baseDeDatos } from "./basededatos.js";

// teniendo en cuenta el desafío pasado, en la clase Usuarios
// violamos el principio de responsabilidad única al tener los métodos
// login y logout. La clase tiene dos razones de cambio: la lógica de
// persistencia, en donde almacenamos los datos, y la lógica de
// autenticación para que el usuario inicie sesión.

export class Usuarios {
  constructor(nombre, email, contraseña) {
    this.nombre = nombre;
    this.email = email;
    this.contraseña = contraseña;
  }

  guardar() {
    //podemos hacer que se guarden los datos en una base de datos
    //para simular esto con el desafío pasado podemos declarar una variable y asignarle
    //un array vacío
    baseDeDatos.push(this);
  }
}
