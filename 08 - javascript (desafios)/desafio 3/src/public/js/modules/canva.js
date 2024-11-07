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

//limpiar liezo
const $botonLimpiar = document.querySelector("#canva__clean-button");

if ($botonLimpiar) {
    $botonLimpiar.addEventListener("click", event => {
        event.preventDefault();
        contexto.clearRect(0, 0, $canva.width, $canva.height);
    })
}

//guardar lienzo
const $botonGuardar = document.querySelector("#canva__save-button");
let lienzo;
export function guardarLienzo() {
    return new Promise((resolve, reject) => {
        if ($botonGuardar) {
            $botonGuardar.addEventListener("click", event => {
                event.preventDefault();
                $botonGuardar.value = true;       
                $botonGuardar.setAttribute("disabled", "");
                $botonGuardar.innerHTML = "Guardado";
                lienzo = $canva.toDataURL("image/png");

                resolve(lienzo);
            })
        } else {
            reject(":( no se guardo");
        }
    })
}
