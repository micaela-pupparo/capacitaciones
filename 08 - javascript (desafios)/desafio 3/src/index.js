import "./public/css/styles.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./public/js/modules/newGroup.js";

if (
  window.location.pathname === "/index.html" ||
  window.location.pathname === "/"
) {
  import(
    /* webpackChunkName: "collapsible" */ "./public/js/modules/collapsible.js"
  ).catch((error) => console.error("Error loading collapsible.js", error));
  import(
    /* webpackChunkName: "draggable" */ "./public/js/modules/draggable.js"
  ).catch((error) => console.error("Error loading draggable.js", error));
  import(/* webpackChunkName: "copy" */ "./public/js/modules/copy.js").catch(
    (error) => console.error("Error loading copy.js", error)
  );
}

if (window.location.pathname === "/public/pages/newTask.html") {
  import(
    /* webpackChunkName: "newTask" */ "./public/js/modules/newTask.js"
  ).catch((error) => console.error("Error loading newTask.js", error));
}

document.addEventListener("DOMContentLoaded", () => {
  //localStorage.clear()
  const gruposGuardados = obtenerGrupos();
  console.log(gruposGuardados);

  if (gruposGuardados.length !== 0) {
    gruposGuardados.forEach((grupo) => {
      renderizarGrupo(grupo.nombre, grupo.id);
      console.log(grupo);
      grupo.tareas.forEach((tarea) => {
        renderizaTarea(grupo.id, tarea);
      });
    });
  }
});

export function renderizarGrupo(nombre, id) {
  //console.log(grupo)
  const $contenedorInformacion = document.querySelector(".info-card-container");

  if ($contenedorInformacion) {
    //console.log(grupo)
    $contenedorInformacion.insertAdjacentHTML(
      "beforebegin",
      `
            <table class="task-card" draggable="true">
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
            `
    );
  }
}

function renderizaTarea(nombreGrupo, tarea) {
  const $contenedorTareas = document.querySelector(
    `.${CSS.escape(nombreGrupo)}`
  );

  if ($contenedorTareas) {
    $contenedorTareas.insertAdjacentHTML(
      "beforeend",
      `
            <tr class="task-card__list ${tarea.id}">
                <td class="task-card__checkbox-cell"><input class="task-card__checkbox" type="checkbox" /></td>
                <td class="task-card__name">${tarea.nombre}</td>
                <td class="task-card__description">${tarea.descripcion}</td>
                <td class="task-card__date">${tarea.fechaVencimiento}</td>
                <td class="task-card__image">${tarea.imagen}</td>
                <td id="map${tarea.id}" style="height: 40px; width: 200px"></td>
                <td><i class="fa-solid fa-trash-can" id="${tarea.id}"></i></td>
              </tr>
            `
    );

    const contenedorMapa = document.getElementById(`map${tarea.id}`);
    //console.log(contenedorMapa)
    //console.log(tarea.posicion)
    //console.log(tarea)
    if (contenedorMapa) {
      const map = L.map(`map${tarea.id}`).setView(
        [tarea.ubicacion.coords.latitude, tarea.ubicacion.coords.longitude],
        13
      );
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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
    console.log(event.target.id);
    if (event.target.matches(".task-card__button")) {
      //const boton = event.target.id.replace(/-/g, " ");
      localStorage.setItem("boton", event.target.id);
    }
    if (event.target.matches(".fa-trash-can")) {
      const id = event.target.id;
      const grupos = obtenerGrupos();
      let tarea;
      let indexTarea;

      grupos.forEach((grupo) => {
        tarea = grupo.tareas.find((t) => t.id === id);
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
      });
    }
  });
}

// ------------------ WEBSOCKET --------------------
// Conectar al servidor WebSocket

//FIXME: SI NO CONECTA EL WEB SCOKET DEJA DE EJECUTAR LAS LINEAS QUE LE SIGUEN
// debemos chequear primero que el navegador soporte wesockets

// if (window.WebSocket) {
//     const socket = new WebSocket(`ws://${process.env.IP_LOCAL}:8080`);
//     console.log("processssssssss s-------->", process.env)

//     socket.onopen = () => {
//       console.log("Conectado al servidor WebSocket");

//       const datos = localStorage.getItem("grupos");

//       if (datos)
//         socket.send(datos);
//     };

//     // maneja los mensajes recibidos del servidor
//     socket.onmessage = (event) => {
//       const update = JSON.parse(event.data);
//       console.log(`Task ID: ${update.taskId} - Status: ${update.status} - Message: ${update.message}`);
//     };

//     socket.onclose = () => {
//       console.log("Desconectado del servidor WebSocket");
//     };
// } else {
//     console.log("no soporta websockets");
// }

//----------------------WEB WORKER----------------------
const worker = new Worker(
  new URL("./public/js/utils/worker.js", import.meta.url)
);

//TODO: ver si lo podes hacer directamente en la variable
function traerTareasYFechas() {
  const grupos = obtenerGrupos();
  const tareas = [];

  grupos.forEach((grupo) => {
    grupo.tareas.forEach((tarea) => {
      const nombreYFecha = {};
      nombreYFecha.id = tarea.id;
      nombreYFecha.fechaVencimiento = tarea.fechaVencimiento;
      tareas.push(nombreYFecha);
    });
  });

  return tareas;
}

worker.postMessage(traerTareasYFechas());

worker.onmessage = function (event) {
  console.log("mensaje del worker: ", event.data);
  let dato = event.data;
  console.log(dato);

  //diferencia es lo que falta para que venza la tarea
  if (typeof dato.diferencia === "number") {
    let tarea = obtenerTarea(dato.id);
    const $tarea = document.querySelector(`.${CSS.escape(tarea.id)}`);

    if ($tarea) {
      const $fecha = $tarea.querySelector(".task-card__date");
      if ($fecha.querySelector(".task-card__date__icon")) {
        const $tooltip = $fecha.querySelector(".task-card__date__tooltip");
        $tooltip.innerHTML = `vence en ${dato.diferencia} días`;
      } else {
        const icono = document.createElement("i");
        icono.className =
          "fa-solid fa-circle-exclamation task-card__date__icon";

        const tooltip = document.createElement("span");
        tooltip.className = "task-card__date__tooltip";
        tooltip.textContent = `vence en ${dato.diferencia} días`;
        icono.appendChild(tooltip);

        $fecha.insertAdjacentElement("beforeend", icono);
      }
    }
  }
};

function obtenerTarea(id) {
  console.log(id);
  const grupos = obtenerGrupos();
  console.log(grupos);

  //al principio puse un forEach pero el return no detiene el bucle
  for (let grupo of grupos) {
    let tarea = grupo.tareas.find((tarea) => tarea.id === id);
    console.log(tarea);
    if (tarea) {
      return tarea;
    }
  }
}
