// Objeto Tareas
//crea una linea nada mas, lo podes guardar en un array
//para que cada grupo tenga un conjunto de tareas
import { createHash } from "crypto-browserify";
import { Validaciones, obtenerGrupos } from "../../index";

//LIENZO
const $canva = document.querySelector(".new-task__canva");
const contexto = $canva.getContext("2d");

let inicialX;
let inicialY;

const dibujar = (cursorX, cursorY) => {
    contexto.beginPath();
    contexto.moveTo(inicialX, inicialY);
    contexto.lineWidth = 5;
    contexto.strokeStyle = "#000";
    contexto.lineCap = "round";
    contexto.lineJoin = "round";
    contexto.lineTo(cursorX, cursorY);
    contexto.stroke();

    inicialX = cursorX;
    inicialY = cursorY;
}

const mouseDown = (event) => {
    inicialX = event.offsetX;
    inicialY = event.offsetY;
    dibujar(inicialX, inicialY);
    $canva.addEventListener("mousemove", mouseMoving);
}

const mouseMoving = (event) => {
    dibujar(event.offsetX, event.offsetY);
}

const mouseUp = () => {
    $canva.removeEventListener("mousemove", mouseMoving);
}

$canva.addEventListener("mousedown", mouseDown);
$canva.addEventListener("mouseup", mouseUp);

// crea clase Tarea
class Tareas {
    constructor(nombre, descripcion, fechaVencimiento) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fechaVencimiento = fechaVencimiento;
        //this.lienzo = lienzo;
        this.id = createHash('sha256').update(`${Date.now()}`).digest('hex');
        this.estado = false;
        this.ubicacion = null;
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

    tarea.obtenerPosicion()
        .then(ubicacion => {
            console.log("ubicacion ", ubicacion);

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
            console.log(tarea.ubicacion)
            localStorage.setItem("grupos", JSON.stringify(grupos));
            console.log(JSON.parse(localStorage.getItem("grupos")))
            window.location.href = "../../index.html"
        })


})
