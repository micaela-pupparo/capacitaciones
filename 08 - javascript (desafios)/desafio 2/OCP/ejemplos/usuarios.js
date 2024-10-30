class Usuarios {
    constructor(nombre, contraseña, tipo) {
        this.nombre = nombre;
        this.contraseña = contraseña;
        this.tipo = tipo;
    }

    agregarUsuario() {
        if (this.tipo === "admin")
            return console.log("agregaste a un usuario!");
        throw new Error("necesitas ser admin");
    }
}

// esto no cumple con el principio abierto-cerrado ya que es solo un metodo para un tipo
// o si hay más roles en donde un Administrador y un Dueño tienen acceso, esto deberia
// estar implementado en una clase aparte.

class Usuarios {
    constructor(nombre, contraseña) {
        this.nombre = nombre;
        this.contraseña = contraseña;
    }
}

//acá si se quiere se puede modularizar!

class Administrador extends Usuarios {
    constructor(nombre, contraseña) {
        super(nombre, contraseña);
    }

    agregarUsuario() {
       return console.log("agregaste a un usuario!");     
    }
}