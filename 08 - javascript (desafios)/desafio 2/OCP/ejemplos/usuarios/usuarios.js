class Usuarios {
  constructor(nombre, contraseña, tipo) {
    this.nombre = nombre;
    this.contraseña = contraseña;
    this.tipo = tipo;
  }

  agregarUsuario() {
    if (this.tipo === "admin") return console.log("agregaste a un usuario!");
    throw new Error("necesitas ser admin");
  }
}

// esto no cumple con el principio abierto-cerrado ya que es solo un metodo para un tipo
// o si hay más roles en donde un Administrador y un Dueño tienen acceso, esto deberia
// estar implementado en una clase aparte.

export class Usuarios {
  constructor(nombre, contraseña) {
    this.nombre = nombre;
    this.contraseña = contraseña;
  }
}
