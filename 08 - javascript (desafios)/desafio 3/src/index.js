import "./public/css/styles.css"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import "./public/js/modules/newGroup.js"

if (window.location.pathname === "/index.html" || window.location.pathname === "/") {
    import(/* webpackChunkName: "collapsible" */ "./public/js/modules/collapsible.js" )
      .catch((error) => console.error("Error loading newTask.js", error));
}

if (window.location.pathname === "/public/pages/newTask.html") {
    import(/* webpackChunkName: "newTask" */ "./public/js/modules/newTask.js")
      .catch((error) => console.error("Error loading newTask.js", error));
}

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

export function renderizarGrupo(nombre, id) {
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
    const $contenedorTareas = document.querySelector(`.${CSS.escape(nombreGrupo)}`);

    if ($contenedorTareas) {
        $contenedorTareas.insertAdjacentHTML("afterend", `
            <tr class="task-card__list ${tarea.id}">
                <td class="task-card__checkbox-cell"><input class="task-card__checkbox" type="checkbox" /></td>
                <td class="task-card__name">${tarea.nombre}</td>
                <td class="task-card__description">${tarea.descripcion}</td>
                <td>${tarea.fechaVencimiento}</td>
                <td class="task-card__image">${tarea.imagen}</td>
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
