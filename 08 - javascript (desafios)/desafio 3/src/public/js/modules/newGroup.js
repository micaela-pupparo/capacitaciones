import { obtenerGrupos, renderizarGrupo } from "../../../index";
import { createHash } from "crypto-browserify";
import { Validaciones } from "../utils/validations";

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

function guardarGrupo(grupo) {
    const grupos = obtenerGrupos();
    const idGrupo = createHash('sha256').update(`${Date.now()}`).digest('hex');
    grupos.push({nombre: grupo, id: idGrupo, tareas: []})

    localStorage.setItem("grupos", JSON.stringify(grupos));
}