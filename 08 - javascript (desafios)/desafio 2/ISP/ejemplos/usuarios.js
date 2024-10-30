// podemos aplicar la del ejemplo principal. Donde tenemos dos subclases Administrador
// y Dueño que usan un mismo método

class Usuarios {
    constructor(nombre, contraseña) {
        this.nombre = nombre;
        this.contraseña = contraseña;
    }
}

//acá si se quiere se puede modularizar!


const AgregarUsuarioMixin = (Clase) => class extends Clase {
    constructor(nombre, contraseña) {
        super(nombre, contraseña);
    }
    
    agregarUsuario() {
        return console.log("agregaste a un usuario!");     
    }
}

class Administrador extends AgregarUsuarioMixin {
    constructor(nombre, contraseña) {
        super(nombre, contraseña);
    }

    agregarUsuario() {
       return console.log("agregaste a un usuario!");     
    }
}

class Dueño extends AgregarUsuarioMixin {
    constructor(nombre, contraseña) {
        super(nombre, contraseña);
    }

    agregarUsuario() {
       return console.log("agregaste a un usuario!");     
    }
}