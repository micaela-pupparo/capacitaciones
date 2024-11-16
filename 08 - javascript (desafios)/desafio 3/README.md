# Aplicación Web de Gestión de Eventos y Tareas con Funcionalidades Avanzadas

## Consignas

El objetivo de este ejercicio es desarrollar una aplicación web interactiva que gestione eventos y tareas, integrando una variedad de APIs de JavaScript disponibles en navegadores modernos. La aplicación permitirá a los usuarios agregar y gestionar tareas, visualizar su ubicación, interactuar con un lienzo de dibujo, y recibir notificaciones. También se implementarán características avanzadas como el uso de WebSockets para la comunicación en tiempo real, y Service Workers para habilitar la funcionalidad offline.

### Funcionalidades Principales

Gestión de Tareas:

- Los usuarios podrán agregar nuevas tareas, marcarlas como completadas y eliminarlas.
- Cada tarea podrá tener una descripción, una fecha de vencimiento, y una ubicación geográfica que se obtendrá mediante la API de Geolocalización.

Persistencia de Datos:

- Utilizar localStorage para almacenar las tareas de manera que persistan entre recargas de la página.
- Implementar la lógica necesaria para cargar las tareas almacenadas al inicio de la aplicación.

Geolocalización:

- Utilizar la API de Geolocalización para obtener la ubicación actual del usuario y asociarla con cada tarea.
- Mostrar la ubicación en un mapa (se puede usar una biblioteca de mapas como Leaflet o Google Maps).

Dibujo en un Lienzo:

- Implementar un área de dibujo utilizando la API de Canvas donde los usuarios podrán dibujar algo relacionado con las tareas.
- Incluir opciones para limpiar el lienzo y guardar el dibujo en localStorage.

Notificaciones:

- Usar la API de Notificaciones para enviar alertas a los usuarios cuando se agreguen nuevas tareas.
- Solicitar permiso al usuario para mostrar notificaciones al cargar la aplicación.

Comunicación en Tiempo Real:

- Implementar una conexión WebSocket que permita a los usuarios recibir actualizaciones de tareas en tiempo real desde un servidor (puede ser un servidor simulado para este ejercicio).

Uso de Promesas y async/await:

- Gestionar las llamadas a APIs externas (como la de geolocalización o cualquier API adicional) utilizando async/await para manejar la asincronía y las promesas.

Funcionalidades Adicionales:

- Web Workers: Utilizar Web Workers para realizar cálculos pesados relacionados con las tareas (por ejemplo, establecer recordatorios basados en fechas).
- Service Workers y PWA: Implementar un Service Worker para habilitar el modo offline, permitiendo a los usuarios continuar usando la aplicación sin conexión a Internet.
- API de Media: Permitir a los usuarios grabar notas de voz asociadas a tareas mediante la API de Media.
- API de Drag and Drop: Permitir a los usuarios reorganizar las tareas en la lista mediante arrastrar y soltar.
- API de Clipboard: Proporcionar una opción para copiar la descripción de las tareas al portapapeles.

## Estructura del Proyecto

```plaintext
.
├── dist                      # Carpeta donde webpack guarda los bundles
├── src/                      # Carpeta que contiene toda la estructura del proyecto
│   ├── public                # Carpeta con todos los archivos públicos
|   |    ├── components       # Carpeta que contiene todos los componentes html
|   │    ├── css              # Estilos CSS
|   │    ├── js               # Lógicas para funcionalidades de la aplicación
|   │    └── pages            # Páginas de html
│   ├── index.html            # Página principal de la aplicación
│   ├── index.js              # Lógica principal de la aplicación
│   └── websocket-server.js   # Servidor Web Socket
├── package.json              # Archivo con todas las dependencias
├── README.md                 # Documentación del proyecto
└── webpack.config.cjs        # Configuraciones de WebPack
```

## Ejecución del proyecto

Para instalar todas las dependencias:

` npm i `

Para ejecutar webpack:

` npm run dev:serve `

Para el servidor Web Socket:

` node websocket-server.js `

## Funcionalidades

### API de Geolocalización

Esta función es parte de los métodos de la clase Tarea. Es llamada cuando se intenta enviar el formulario, creando antes una instancia de la clase. Para mostrar el mapa se utilizó la biblioteca Leaflet.

```js
obtenerPosicion = function () {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (posicion) => {
          this.ubicacion = posicion; // guarda la ubicacion en una instancia de la clase Tarea
          resolve(); // resuelve la promesa cuando se obtiene la geolocalización
        },
        (error) => {
          reject("Error en la geolocalización: " + error.message);
        }
      );
    } else {
      reject("Geolocalización no disponible.");
    }
  });
};
```

### API Canva

```js
const $canva = document.querySelector(".new-task__canva");
const contexto = $canva.getContext("2d"); // para utilizar los métodos de dibujo

let inicialX; // coordenadas iniciales, cambian cuando el cursor se mueve
let inicialY;

const dibujar = (cursorX, cursorY) => {
  contexto.beginPath(); // inicia un nuevo camino del dibujo
  contexto.moveTo(inicialX, inicialY); // define el inicio del punto de la linea
  contexto.lineWidth = 5; // tamaño del trazo en pixeles
  contexto.strokeStyle = "#000";
  contexto.lineCap = "round"; // estilo de las terminaciones
  contexto.lineJoin = "round"; // forma en la que se unen las lineas
  contexto.lineTo(cursorX, cursorY); // traza una linea hasta las coordenadas actuales del cursor
  contexto.stroke(); // dibuja la linea

  inicialX = cursorX; //actualiza las coordenadas
  inicialY = cursorY;
};

const mouseDown = (event) => {
  inicialX = event.offsetX; // obtiene las coordenadas del cursor cuando hace click
  inicialY = event.offsetY;
  dibujar(inicialX, inicialY); // llama a la funcion dibujar
  $canva.addEventListener("mousemove", mouseMoving); // agrega un evento
};

const mouseMoving = (event) => {
  dibujar(event.offsetX, event.offsetY); // cada vez que se mueve llama a la funcion dibujar
};

const mouseUp = () => {
  $canva.removeEventListener("mousemove", mouseMoving); // elimina el evento para dejar de dibujar
};

$canva.addEventListener("mousedown", mouseDown);
$canva.addEventListener("mouseup", mouseUp);

//limpiar liezo
const $botonLimpiar = document.querySelector("#canva__clean-button");

if ($botonLimpiar) {
  $botonLimpiar.addEventListener("click", (event) => {
    event.preventDefault();
    contexto.clearRect(0, 0, $canva.width, $canva.height); // borra todo el contenido del lienzo
  });
}

//guardar lienzo
const $botonGuardar = document.querySelector("#canva__save-button");
let lienzo;
export function guardarLienzo() {
  return new Promise((resolve, reject) => {
    if ($botonGuardar) {
      $botonGuardar.addEventListener("click", (event) => {
        event.preventDefault();
        $botonGuardar.value = true;
        $botonGuardar.setAttribute("disabled", "");
        $botonGuardar.innerHTML = "Guardado";
        lienzo = $canva.toDataURL("image/png");

        resolve(lienzo); // retorna el lienzo para usarlo al crear la tarea
      });
    } else {
      reject(":( no se guardo");
    }
  });
}
```

### API Notificaciones

```js
Notification.requestPermission().then((permission) => {
  if (permission === "granted") {
    console.log("el permiso fue aceptado =)");
  } else {
    console.log("permiso para notificaciones denegado");
  }
});

export const Notificaciones = {
  nuevaTarea: function (nombreTarea) {
    new Notification(`¡${nombreTarea} fue agregada con éxito!`, {
      body: "Sigue añadiendo tareas para organizar tu vida.",
    });
  },
};
```

### API MediaRecorder

```js
const grabarBoton = document.querySelector("#grabarBoton");
const pararBoton = document.querySelector("#pararBoton");
const audio = document.querySelector("#audio");

let mediaRecorder; // objeto que va a controlar la grabacion
let audioChunks = []; // almacena todos los fragmentos del audio
let audioURL; // la url una vez terminemos de grabar para enviarla cuando se renderice la pagina

grabarBoton.addEventListener("click", empezarGrabacion);
pararBoton.addEventListener("click", detenerGrabacion);

async function empezarGrabacion(event) {
  event.preventDefault();
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); // pide acceso a microfono y retorna una entrada de audio
  mediaRecorder = new MediaRecorder(stream); // crea objeto para grabar esa entrada de audio

  mediaRecorder.ondataavailable = (event) => {
    audioChunks.push(event.data); // event.data contiene un nuevo fragmento de audio, por lo que cada vez que haya uno nuevo, se ejecuta el evento
  };

  mediaRecorder.onstop = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/wav" }); // blob combina los fragmentos en un archivo unico
    audioURL = URL.createObjectURL(audioBlob); // genera una url de ese archivo
    audio.src = audioURL; // para poder escucharlo en el formulario, funcionalidad temporal

    console.log("audio grabado", audioURL);
  };

  mediaRecorder.start();
  grabarBoton.disabled = true;
  pararBoton.disabled = false;
}

function detenerGrabacion(event) {
  event.preventDefault();
  mediaRecorder.stop();
  grabarBoton.disabled = false;
  pararBoton.disabled = true;
}

export function obtenerAudioURL() {
  return audioURL;
}
```

### API Drag And Drop

```js
const $gruposTarea = document.querySelectorAll(".task-card");
const $contenedor = document.querySelector(".tasks-container");

if ($gruposTarea) {
  $gruposTarea.forEach(($grupo) => {
    $grupo.addEventListener("dragstart", (e) => {
      e.stopPropagation();
      $grupo.classList.add("seleccionado"); // para poder saber qué grupo está siendo seleccionado

      const dragImage = document.createElement("img");
      dragImage.src =
        "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
      e.dataTransfer.setDragImage(dragImage, 0, 0); // esto es para que no se muestre una imagen fantasma cuando se ejecuta el arrastre. Hay un fallo visual cuando se agrega una tarea al grupo
    });

    $grupo.addEventListener("dragend", (e) => {
      e.stopPropagation();
      $grupo.classList.remove("seleccionado");
    });
  });

  $contenedor.addEventListener("dragover", (e) => {
    e.preventDefault();

    const elementoDebajo = obtenerElementoDebajo(e.clientY);
    const seleccionado = document.querySelector(".seleccionado");
    console.log(seleccionado);

    if (elementoDebajo) {
      $contenedor.insertBefore(seleccionado, elementoDebajo);
    }
  });
}

function obtenerElementoDebajo(y) {
  const grupos = [
    ...$contenedor.querySelectorAll(".task-card:not(.seleccionado)"),
  ]; // querySelector devuelve un NodeList, por lo que aca lo convertimos en un array

  return grupos.reduce(
    // itera sobre todos los elementos hasta llegar al que le pedis
    (masCercano, hijo) => {
      // el mas cercano hasta el momento y el hijo actual
      const box = hijo.getBoundingClientRect(); // obtiene la posicion y dimensiones del elemento en relacion a la ventana del navegador
      const offset = y - box.top - box.height / 2; // top: distancia entre la parte superior del elemento y la parte superior de la ventana
      // heigh es la altura del elemento. La cuenta que hacemos es la diferencia de la coordenada y y el punto medio del elemento

      if (offset < 0 && offset > masCercano.offset) {
        return { offset: offset, element: hijo }; // si es el mas cercano lo devuelve
      } else {
        return masCercano;
      }
    },
    { offset: Number.NEGATIVE_INFINITY } // valor inicial de offset para garantizar que haya un elemento más cercano
  ).element; // retorna el elemento
}
```

### API Clipboard

```js
const $descripcionTareas = document.querySelectorAll(".task-card__description");

$descripcionTareas.forEach(($descripcionTarea) => {
  $descripcionTarea.addEventListener("click", (e) => {
    e.preventDefault();

    navigator.clipboard
      .writeText($descripcionTarea.innerHTML)
      .then(() => {
        console.log("copiado");
      })
      .catch((err) => {
        console.error("error en el copiado", err);
      });
  });
});
```

## Desafíos enfrentados

### API Geolocalización

- getCurrentLocation es una función asíncrona por loq ue al principio la propiedad de la tarea (ubicación) quedaba undefined.
  - Hice un método dentro de la clase Tareas para obtener la posición mediante una promesa.
    - Al principio intenté llamarla del DOM Loader pero localStorage no guarda métodos, los borra completamente
    - Luego lo llamé cuando instancié el objeto, de esta forma me resultó

### API Canva

- Se tiene que especificar sí o sí el alto y el ancho del canva para que se pueda definir bien las coordenadas
- Al convertir el canva en imagen al principio puse jpeg pero no soporta imágenes con fondo transparente y me devolvía un archivo en negro. Se debe poner en formato PNG

### Web Worker

- WebPack tenía dificultades para generar el worker por lo que en vez de:

```js
new Worker("url-archivo.js");
```

Tuve que hacer:

```js
new Worker(new URL("url archivo", import.meta.url));
```

Esto es por cómo WebPack maneja los archivos y url en su sitema de empaquetado.

Webpack puede identificar que "url archivo" es un recurso del proyecto y lo incluye en el proceso de construcción. La URL generada será válida en el contexto de la aplicación empaquetada. Soluciona problemas relacionados con rutas incorrectas en entornos empaquetados.

## Documentación utilizada

- https://leafletjs.com/
- https://developer.mozilla.org/es/docs/Web/API/Geolocation_API
- https://developer.mozilla.org/es/docs/Web/API/Geolocation_API
- https://developer.mozilla.org/es/docs/Web/API/Canvas_API
- https://developer.mozilla.org/es/docs/Web/API/Canvas_API
- https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
