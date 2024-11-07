import "./public/css/styles.css"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { createHash } from "crypto-browserify";

if (window.location.pathname === "/index.html") {
    import(/* webpackChunkName: "newTask" */ "./public/js/collapsible" )
      .catch((error) => console.error("Error loading newTask.js", error));
}

if (window.location.pathname === "/public/pages/newTask.html") {
    import(/* webpackChunkName: "newTask" */ "./public/js/newTask.js")
      .catch((error) => console.error("Error loading newTask.js", error));
}


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
    //localStorage.clear()
    const gruposGuardados = obtenerGrupos();
    console.log(gruposGuardados)

    if(gruposGuardados.length !== 0) {
        gruposGuardados.forEach(grupo => {
            renderizarGrupo(grupo.nombre, grupo.id);
            console.log(grupo)
            grupo.tareas.forEach(tarea => {
                renderizaTarea(grupo.id, tarea)
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

function renderizarGrupo(nombre, id) {
    //console.log(grupo)
    const $contenedorInformacion = document.querySelector(".info-card-container");

    if ($contenedorInformacion) {

        //console.log(grupo)
        $contenedorInformacion.insertAdjacentHTML("beforebegin", `
            <table class="task-card">
            <thead>
              <tr class="task-card__header">
                <th class="task-card__heading">${nombre}</th>
                <th class="task-card__header-icon">
                  <a href="./public/pages/newTask.html"
                    ><i class="fa-solid fa-plus task-card__button" id="${id}"></i
                  ></a>
                </th>
              </tr>
            </thead>
            <tbody class="${id}">
            </tbody>
            </table>
            `)
    }
}

function renderizaTarea(nombreGrupo, tarea) {
    const $contenedorTareas = document.querySelector(`.${nombreGrupo}`);

    if ($contenedorTareas) {
        $contenedorTareas.insertAdjacentHTML("afterend", `
            <tr class="task-card__list ${tarea.id}">
                <td class="task-card__checkbox-cell"><input class="task-card__checkbox" type="checkbox" /></td>
                <td class="task-card__name">${tarea.nombre}</td>
                <td class="task-card__description">${tarea.descripcion}</td>
                <td>${tarea.fechaVencimiento}</td>
                <td class="task-card__image"><img src="${tarea.imagen}"/></td>
                <td id="map${tarea.id}" style="height: 40px; width: 200px"></td>
                <td><i class="fa-solid fa-trash-can" id="${tarea.id}"></i></td>
              </tr>
            `)
        
            const contenedorMapa = document.getElementById(`map${tarea.id}`);
            console.log(contenedorMapa)
            console.log(tarea.posicion)
            console.log(tarea)
            if (contenedorMapa) {
                const map = L.map(`map${tarea.id}`).setView([tarea.ubicacion.coords.latitude, tarea.ubicacion.coords.longitude], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);
            }   
    }
}

function guardarGrupo(grupo) {
    const grupos = obtenerGrupos();
    const idGrupo = createHash('sha256').update(`${Date.now()}`).digest('hex');
    grupos.push({nombre: grupo, id: idGrupo, tareas: []})

    localStorage.setItem("grupos", JSON.stringify(grupos));
}

export function obtenerGrupos() {
    return JSON.parse(localStorage.getItem("grupos")) || [];
}


// GUARDA INFO DE QUE BOTON FUE TOCADO PARA SABER A QUE GRUPO HAY QUE AGREGAR LA TAREA
// ELIMINA TAMBIEN TAREA POR ID
const $contenedorTareas = document.querySelector(".tasks-container");

if ($contenedorTareas) {
    $contenedorTareas.addEventListener("click", (event) => {
        console.log(event.target.id)
        if (event.target.matches(".task-card__button")) {
            //const boton = event.target.id.replace(/-/g, " ");
            localStorage.setItem("boton", event.target.id);
        }
        if (event.target.matches(".fa-trash-can")) {
            const id = event.target.id;
            const grupos = obtenerGrupos();
            let tarea;
            let indexTarea;

            grupos.forEach(grupo => {
                tarea = grupo.tareas.find( t => t.id === id);
                if (tarea) {
                    indexTarea = grupo.tareas.indexOf(tarea);
                    grupo.tareas.splice(indexTarea, 1);
                    //borrarlo de la memoria
                    localStorage.setItem("grupos", JSON.stringify(grupos));

                    //borrarlo del html sin refrescar la pagina
                    const $tarea = document.querySelector(`.${CSS.escape(id)}`);
                    if ($tarea) {
                        $tarea.remove();
                    }
                }
            })
        }
    })
}
