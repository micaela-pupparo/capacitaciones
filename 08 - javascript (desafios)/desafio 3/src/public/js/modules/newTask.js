// Objeto Tareas
//crea una linea nada mas, lo podes guardar en un array
//para que cada grupo tenga un conjunto de tareas
import { createHash } from "crypto-browserify";
import { obtenerGrupos } from "../../../index";
import { Validaciones } from "../utils/validations";
import { guardarLienzo } from "./canva";
import { Notificaciones } from "./notifications";

// reiniciamos los valores del boton guardar lienzo
const $botonGuardar = document.querySelector("#canva__save-button");
console.log($botonGuardar.value)
document.addEventListener("DOMContentLoaded", () => {
    if ($botonGuardar) {
        $botonGuardar.value = false;
        $botonGuardar.removeAttribute("disabled");
        $botonGuardar.innerHTML = "Guardar";
    }
})

// llamamos a la funcion para tener el evento escuchando
let canva;
guardarLienzo().then(lienzo => canva = lienzo).catch(error => console.log("error al guardar img"));

// CREA CLASE TAREA
class Tareas {
    constructor(nombre, descripcion, fechaVencimiento) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fechaVencimiento = fechaVencimiento;
        this.id = createHash('sha256').update(`${Date.now()}`).digest('hex');
        this.estado = false;
        this.ubicacion = null;
        this.imagen = null;
    }

    obtenerPosicion = function() {
        return new Promise((resolve, reject) => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(posicion => {
                    console.log(posicion);
                    this.ubicacion = posicion;
                    resolve();  // Resuelve la promesa cuando se obtiene la geolocalización
                }, error => {
                    reject("Error en la geolocalización: " + error.message);
                });
            } else {
                reject("Geolocalización no disponible.");
            }
        });
    };

    guardarImagen = function() {
        // por mas de que sea falso el valor esta guardado en string, por lo que hay que hacer esto
        if($botonGuardar.value !== "false") {
            console.log("wtfff")
            this.imagen = `<img src="${canva}" />`;
        }
        else {
            this.imagen = "<p></p>";
        }
    }
}

//para tomar nuevos valores en el formulario
//y crear nuevas instancias
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
    tarea.guardarImagen();
    tarea.obtenerPosicion()
        .then(ubicacion => {
            console.log("ubicacion ", ubicacion);

            const idGrupo = localStorage.getItem("boton");
            console.log(idGrupo)
            //ENCUENTRA EL NOMBRE DEL GRUPO AL QUE LE QUEREMOS SUMAR UNA TAREA
            const grupos = obtenerGrupos();
            console.log(grupos)
            let grupoObjeto;
            if (grupos.length !== 0) 
                grupoObjeto = grupos.find(grupo => grupo.id === idGrupo);
            console.log("OBJETOOOO---->" ,grupoObjeto)
            console.log("TAREAAAAAAAA", tarea)
        
            //GUARDAMOS LA TAREA
            grupoObjeto.tareas.push(tarea);
            //console.log(grupos)
            console.log("tarea: ----->", tarea.imagen)
            localStorage.setItem("grupos", JSON.stringify(grupos));
            
            Notificaciones.nuevaTarea(tarea.nombre)

            window.location.href = "../../index.html"
        })
})
