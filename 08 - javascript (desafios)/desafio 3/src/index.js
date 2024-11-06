import "./public/css/styles.css"

import { createHash } from "crypto-browserify";

console.log(createHash('sha256').update('some data').digest('hex'))

// VALIDACIONES
export class Validaciones {
    static vacio = function(...valores) {
        const regex = /^(?!\s*$).+/
        valores.forEach(valor => {
            if(!regex.test(valor))
                throw new Error("el nombre no debe estar vacio");
        })
    }

    static nombre = function(nombre) {
        const regex = /^(?!\s*$)[A-Za-z0-9\s]+$/;
        if (!regex.test(nombre)) 
            throw new Error("el nombre debe tener números y letras");   
    }

    static descripcion = function(descripcion) {
        if (descripcion.length > 100) {
            throw new Error("descripcion muy larga");
        }
    }
}

//CREAR UN NUEVO GRUPO
document.addEventListener("DOMContentLoaded", () => {
    const gruposGuardados = obtenerGrupos();
    console.log(gruposGuardados)

    if(gruposGuardados.length !== 0) {
        gruposGuardados.forEach(grupo => {
            renderizarGrupo(grupo.nombre);
            const nombreClase = grupo.nombre.replace(/\s+/g, "-");
            grupo.tareas.forEach(tarea => {
                renderizaTarea(nombreClase, tarea)
            })
    });
    }
})

const $formNuevoGrupo = document.querySelector(".new-group");

if ($formNuevoGrupo) {
    $formNuevoGrupo.addEventListener("submit", (event) => {
        event.preventDefault();
    
        const formData = new FormData($formNuevoGrupo);
        const dato = {};
    
        formData.forEach((valor, llave) => {
            dato[llave] = valor;
        })
        const {grupo} = dato;
        //console.log(grupo.replace(/\s+/g, "-"));
    
        Validaciones.vacio(grupo);
        Validaciones.nombre(grupo);
    
        renderizarGrupo(grupo);
        guardarGrupo(grupo);
    })
}

function renderizarGrupo(grupo) {
    //console.log(grupo)
    const $contenedorInformacion = document.querySelector(".info-card-container");

    if ($contenedorInformacion) {

        //console.log(grupo)
        $contenedorInformacion.insertAdjacentHTML("beforebegin", `
            <table class="task-card">
            <thead>
              <tr class="task-card__header">
                <th class="task-card__heading">${grupo}</th>
                <th class="task-card__header-icon">
                  <a href="./public/pages/newTask.html"
                    ><i class="fa-solid fa-plus task-card__button" id="${grupo.replace(/\s+/g, "-")}"></i
                  ></a>
                </th>
              </tr>
            </thead>
            <tbody class="${grupo.replace(/\s+/g, "-")}">
            </tbody>
            </table>
            `)
    }
}

function renderizaTarea(nombreGrupo, tarea) {
    const $contenedorTareas = document.querySelector(`.${nombreGrupo}`);

    if ($contenedorTareas) {
        $contenedorTareas.insertAdjacentHTML("afterend", `
            <tr class="task-card__list">
                <td class="task-card__checkbox-cell"><input class="task-card__checkbox" type="checkbox" /></td>
                <td class="task-card__name">${tarea.nombre}</td>
                <td class="task-card__description">${tarea.descripcion}</td>
                <td>${tarea.fechaVencimiento}</td>
                <td>10/07/2024</td>
                <td><i class="fa-solid fa-trash-can"></i></td>
              </tr>
            `)
    }
}

function guardarGrupo(grupo) {
    const grupos = obtenerGrupos();
    grupos.push({nombre: grupo, tareas: []})

    localStorage.setItem("grupos", JSON.stringify(grupos));
}

export function obtenerGrupos() {
    return JSON.parse(localStorage.getItem("grupos")) || [];
}


// GUARDA INFO DE QUE BOTON FUE TOCADO PARA SABER A QUE GRUPO HAY QUE AGREGAR LA TAREA
const $contenedorTareas = document.querySelector(".tasks-container");

if ($contenedorTareas) {
    $contenedorTareas.addEventListener("click", (event) => {
        console.log(event.target.id)
        if (event.target.matches(".task-card__button")) {
            //const boton = event.target.id.replace(/-/g, " ");
            localStorage.setItem("boton", event.target.id);
        }
    })
}