export const AgregarUsuarioMixin = (Clase) =>
  class extends Clase {
    constructor(nombre, contraseña) {
      super(nombre, contraseña);
    }

    agregarUsuario() {
      return console.log("agregaste a un usuario!");
    }
  };
