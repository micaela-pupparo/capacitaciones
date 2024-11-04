// Objeto Tareas
//crea una linea nada mas, lo podes guardar en un array
//para que cada grupo tenga un conjunto de tareas
class Tareas {
    constructor(nombre, descripcion, fechaVencimiento) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fechaVencimiento = fechaVencimiento;
        //this.ubicacion = ubicacion;
        //this.lienzo = lienzo;
        this.estado = false;
    }
}

//para tomar nuevos valores en el formulario
//y crear nuevas instancias
import { Validaciones, obtenerGrupos } from "./index.js";

const $formNuevaTarea = document.querySelector(".new-task");

$formNuevaTarea.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData($formNuevaTarea);
    const datos = {};
    
    formData.forEach((valor, llave) => {
        datos[llave] = valor;
    })
    
    const {nombre, descripcion, fechaVencimiento} = datos;

    Validaciones.vacio(nombre, descripcion);
    Validaciones.nombre(nombre);
    Validaciones.descripcion(descripcion);

    const tarea = new Tareas(nombre, descripcion, fechaVencimiento);

    const nombreGrupo = localStorage.getItem("boton").replace(/-/g, " ");
    console.log(nombreGrupo)

    //ENCUENTRA EL NOMBRE DEL GRUPO AL QUE LE QUEREMOS SUMAR UNA TAREA
    const grupos = obtenerGrupos();
    console.log(grupos)
    let grupoObjeto;
    if (grupos.length !== 0) 
        grupoObjeto = grupos.find(grupo => grupo.nombre === nombreGrupo);
    console.log(grupoObjeto)

    //GUARDAMOS LA TAREA
    grupoObjeto.tareas.push(tarea);
    console.log(grupos)
    localStorage.setItem("grupos", JSON.stringify(grupos));

    window.location.href = "../../index.html"
})
