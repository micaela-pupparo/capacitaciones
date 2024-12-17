# Redux

Es una librería que maneja el estado. No importa cuál utilices (React, Angular, Vue, Vanilla JS).

Es útil cuando el estado de un componente se actualiza y necesitamos que en consecuencia se actualicen otros componentes más. Los datos también pueden ser actualizados como resultado de pedidos de network o tareas secundarias. En estas situaciones, los datos puede ir de un punto de la UI a otro y cambiar de forma impredecible. Saber cómo cambió la data y de dónde cambio se vuelve muy tedioso sin Redux.

Con Redux almacenamos todos los estados de la aplicación en un repositorio central llamado Store (objeto). Parecido a una base de datos para el front. De esta forma, los distintos componentes no van a mantener su propio estado, sino que obtendran lo que necesitan desde el Store. Así, existe sólo un lugar que debe ser actualizado. Si algo sale mal, podemos saber el por qué, el cómo, cuándo y dónde.

## Pros y Cons

### Pros

En Chrome existe Redux DevTools. Dentro existe una opción State para ver todos los datos que tenemos del estado. También se pueden ver todas las acciones performadas dentro de la apliación. Se puede seleccionar la acción y obtener los datos asociados, como saltar (jump) a la acción y ver reflejado en el UI el estado asociado. A esto se lo llama Timetravel debugging. También podemos guardar el estado de la aplicacion en un archivo y luego recargar la pagina desde este lugar.

Log Rocket: herramienta para obtener el estado que tiene el usuario para ver paso por paso lo que hizo y así solucionar algun error.

- Predictable state changes
- Centralized state
- Easy debuggung
- Preserve page state
- Undo/redo
- Ecosystem of add-ons

### Cons

- Complexity: está basado en los principios de Functional Programming
- Verbosity: se necesita escribir algunas lineas de codigo para que Redux haga lo que tiene que hacer

## State Management Libraries

- Flux (de Facebook)
- Redux (inspirado por Flux, más popular por ser simple y elegante)
- MobX

## Cuándo NO usar Redux

- Tight budget
- Small to medium-size que además es:
  - Simple UI/data flow
  - Static data: no cambia o se fetchean los datos con la recarga de la página y se renderiza estáticamente
