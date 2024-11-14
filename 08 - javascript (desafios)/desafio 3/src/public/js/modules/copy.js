const $descripcionTareas = document.querySelectorAll(".task-card__description");

$descripcionTareas.forEach($descripcionTarea => {
    $descripcionTarea.addEventListener("click", e => {
        e.preventDefault();
    
        navigator.clipboard
            .writeText($descripcionTarea.innerHTML)
            .then(() => {
                console.log('copiado');
            })
            .catch((err) => {
                console.error('error en el copiado', err);
            });
            })
})