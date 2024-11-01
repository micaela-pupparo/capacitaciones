// Objeto Tareas
//crea una linea nada mas, lo podes guardar en un array
//para que cada grupo tenga un conjunto de tareas
class Tareas {
    constructor(nombre, fechaVencimiento, ubicacion, lienzo) {
        this.nombre = nombre;
        this.fechaVencimiento = fechaVencimiento;
        this.ubicacion = ubicacion;
        this.lienzo = lienzo;
        this.estado = false;
    }
}