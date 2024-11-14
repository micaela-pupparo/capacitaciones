const $gruposTarea = document.querySelectorAll(".task-card");
const $contenedor = document.querySelector(".tasks-container");

if ($gruposTarea) {
    $gruposTarea.forEach($grupo => {
        $grupo.addEventListener("dragstart", (e) => {
            e.stopPropagation();
            $grupo.classList.add("seleccionado");


            //TODO: cambiar esto
            const dragImage = document.createElement("img");
            dragImage.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
            e.dataTransfer.setDragImage(dragImage, 0, 0)
        })

        $grupo.addEventListener("dragend", (e) => {
            e.stopPropagation();
            $grupo.classList.remove("seleccionado");
        })
    })

    $contenedor.addEventListener("dragover", e => {
        e.preventDefault();

        const elementoDebajo = obtenerElementoDebajo(e.clientY);
        const seleccionado = document.querySelector(".seleccionado");
        
        if (elementoDebajo) {
            $contenedor.insertBefore(seleccionado, elementoDebajo);
        }
    })
}

function obtenerElementoDebajo(y) {
    const grupos = [...$contenedor.querySelectorAll(".task-card:not(.seleccionado)")];

    return grupos.reduce((masCercano, hijo) => {
        const box = hijo.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > masCercano.offset) {
            return { offset: offset, element: hijo }
        } else {
            return masCercano;
        }


    }, { offset: Number.NEGATIVE_INFINITY }).element
}