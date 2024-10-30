// teniendo en cuenta el desafío pasado, en la clase Usuarios 
// violamos el principio de responsabilidad única al tener los métodos
// login y logout. La clase tiene dos razones de cambio: la lógica de
// persistencia, en donde almacenamos los datos, y la lógica de 
// autenticación para que el usuario inicie sesión.

const baseDeDatos = [];

class Usuarios {
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

// acá podemos modularizar!

class Autenticaciones {
    login(email, contraseña) {
        //lógica para el login
        console.log(`el usuario inició sesión!`);
    }

    logout(email, contraseña) {
        //lógica para el logout
        console.log(`el usuario cerró sesión!`);
    }
}