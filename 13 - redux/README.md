# Redux Course

## Redux

Es una librería que maneja el estado. No importa cuál utilices (React, Angular, Vue, Vanilla JS).

Es útil cuando el estado de un componente se actualiza y necesitamos que en consecuencia se actualicen otros componentes más. Los datos también pueden ser actualizados como resultado de pedidos de network o tareas secundarias. En estas situaciones, los datos puede ir de un punto de la UI a otro y cambiar de forma impredecible. Saber cómo cambió la data y de dónde cambio se vuelve muy tedioso sin Redux.

Con Redux almacenamos todos los estados de la aplicación en un repositorio central llamado Store (objeto). Parecido a una base de datos para el front. De esta forma, los distintos componentes no van a mantener su propio estado, sino que obtendran lo que necesitan desde el Store. Así, existe sólo un lugar que debe ser actualizado. Si algo sale mal, podemos saber el por qué, el cómo, cuándo y dónde.

### Pros y Cons

#### Pros

En Chrome existe Redux DevTools. Dentro existe una opción State para ver todos los datos que tenemos del estado. También se pueden ver todas las acciones performadas dentro de la apliación. Se puede seleccionar la acción y obtener los datos asociados, como saltar (jump) a la acción y ver reflejado en el UI el estado asociado. A esto se lo llama Timetravel debugging. También podemos guardar el estado de la aplicacion en un archivo y luego recargar la pagina desde este lugar.

Log Rocket: herramienta para obtener el estado que tiene el usuario para ver paso por paso lo que hizo y así solucionar algun error.

- Predictable state changes
- Centralized state
- Easy debuggung
- Preserve page state
- Undo/redo
- Ecosystem of add-ons

#### Cons

- Complexity: está basado en los principios de Functional Programming
- Verbosity: se necesita escribir algunas lineas de codigo para que Redux haga lo que tiene que hacer

### State Management Libraries

- Flux (de Facebook)
- Redux (inspirado por Flux, más popular por ser simple y elegante)
- MobX

### Cuándo NO usar Redux

- Tight budget
- Small to medium-size que además es:
  - Simple UI/data flow
  - Static data: no cambia o se fetchean los datos con la recarga de la página y se renderiza estáticamente

## Functional Programming

Es un paradigma de programación. La idea es descomponer un problema en un conjunto de funciones reutilizables que obtienen un input y devuelven un resultado. No mutan o cambian datos.

Con esta estructura podemos componer las funciones para construir funciones más complejas.

### Beneficios

- Más conciso
- Más facil de debuggear
- Más fácil de testear
- Más escalable: porque podemos ejecutar muchas llamadas a funciones en paralelo y tomar ventaja de los multiple course of a cpu

### JavaScript

JavaScript es un lenguaje multiparadigma.

#### Funciones

Las funciones son First-class Citizens, o sea, podemos tratarlos como cualquier otra variable:

- Podemos asignarlas a una variable
- Podemos pasarlas como argumento
- Podemos retornarlas desde otras funciones

##### Higher-order Functions

Son funciones que toman como parámetro otras funciones o las retorna o ambas.

```js
// Higher-order Functions
// map
let numbers = [1, 2, 3];
numbers.map((number) => number * 2);

// setTimeout
setTimeout(() => console.log("Hello"), 1000);
```

##### Function Composition

```js
// Composition
// sin functional programming
let input = "  JavaScript  ";
let output = "<div>" + input.trim() + "</div>";

// con functional programming
const trim = (str) => str.trim();
const wrapInDiv = (str) => `<div>${str}</div>`;
const toLowerCase = (str) => str.toLowerCase();

const result = wrapInDiv(toLowerCase(trim(input)));
```

Para evitar el anidado de funciones podemos importar lodash:

```js
// Composition
// sin functional programming
import { compose, pipe } from "lodash/fp";

let input = "  JavaScript  ";

// con functional programming
const trim = (str) => str.trim();
const wrapInDiv = (str) => `<div>${str}</div>`;
const toLowerCase = (str) => str.toLowerCase();

// higher-order function
// retorna una nueva funcion que es la composicion de todas las funciones que se pasan por parametro
// el orden es de derecha a izquierda para saber el orden en el que se aplican
const transform = compose(wrapInDiv, toLowerCase, trim);
transform(input);

// para evitar eso, se usa pipe
// ahora se lee de izquierda a derecha
pipe(trim, toLowerCase, wrapInDiv);
```

##### Currying

Técnica que nos permite convertir una funcion de n parámetros a una función de un (1) parametro. En vez de separar los parametros con coma se separan con paréntesis.

```js
// Currying
function add(a) {
  return function (b) {
    return a + b;
  };
}

const add2 = (a) => (b) => a + b;

add(1)(5);

// Otro ejemplo
import { compose, pipe } from "lodash/fp";

let input = "  JavaScript  ";

// con functional programming
const trim = (str) => str.trim();
const wrap = (type) => (str) => `<${type}>${str}</${type}>`;
const toLowerCase = (str) => str.toLowerCase();

pipe(trim, toLowerCase, wrap("div"));
```

##### Pure Functions

Decimos que una funcion es pura cuando le pasamos los mismo parámetros y retorna siempre los mismos resultados.

```js
// funcion NO pura
function myFunction(number) {
  return number * Math.random();
}
// funcion pura
function myFunction2(number) {
  return number * 2;
}
```

- No se utilizan valores random
- No se utilizan los tiempos o fechas actuales
- No podemos leer o cambiar estados globales (DOM, files, db, etc)
- No se pueden mutar los parámetros

```js
// funcion NO pura
const minAge = 18;
// si cambiamos la variable global, esta funcion va a retornar algo distinto
function isEligible(age) {
  return age > minAge;
}

// funcion pura
// todo lo que la funcion necesita se debe especificar en la lista de parametros
function isEligible2(age, minAge1) {
  return age > minAge1;
}
```

Beneficios:

- Self-documenting: todo lo que necesita la funcion esta especificado en los parametros
- Easily testable: no tenemos que setear un estado global prior a testear la funcion
- Concurrency: podemos ejecutar estas funciones en paralelo porque no utilizan un estado global ni lo cambian
- Cacheable: al tener siempre los mismos resultados podemos almacenar los resultados en un caché y utilizarlo en un futuro. Esto es más que nada para funciones que tienen intensive computations

##### Immutability

Una vez creado un objeto, no puede ser cambiado. Si queremos cambiarlo, debemos crear una copia y cambiar esa copia.

Cuando creamos una const, no estamos creando un objeto inmutable. Lo que previene es que se le reasigne otro valor a la constante.

**¿Por qué usarlo?**

- Predictability: si llamamos a una funcion y le pasamos un objeto, sabremos que ese objeto no va a ser cambiado
- Podemos detectar cambios más rápido
- Concurrency: si sabemos que una funcion no muta los datos, sabremos que podemos ejecutar esta funcion en paralelo con seguridad. Esto es porque no va a cambiar algo en memoria que va a alterar el estado del sistema

**Cons**

- Performance: cada vez que cambiamos un objeto todos sus valores tienen que ser copiados. Esto es un problema si estamos lidiando con una cantidad larga de objetos.
- Memory overhead: causado por copiar objetos. Tenemos immutability libraries que reducen esto lo mayor posible.

En definitiva, con Redux no deberías mutar los datos. Fuera de Redux se puede hacer lo que se quiera.

```js
const person = { name: "john" };
// la propiedad name se sobreescribe
const updated = { ...person, name: "bob" };
```

Se debe tener cuidado con las propiedades anidadas:

```js
const person = {
  name: "john",
  address: { country: "USA", city: "San Francisco" },
};
// la propiedad name se sobreescribe
const updated = { ...person, name: "bob" };
updated.address.city = "New York";
console.log(person); // city: "New York"
```

Esto es porque el spread operator hace una copia superficial. En este caso la propiedad address está seteada en un objeto. El problema acá es que person y updated tienen el mismo address, el mismo objeto address en memoria. Para solucionarlo tenemos que hacer una deep copy.

```js
const person = {
  name: "john",
  address: { country: "USA", city: "San Francisco" },
};
// la propiedad name se sobreescribe
const updated = {
  ...person,
  address: { ...person.address, city: "New York" },
  name: "bob",
};

console.log(person); // city: "San Francisco"
```

Se empieza a notar que haciendo esto es más tedioso, por eso tenemos librerias que se encargan de immutability.

Para arrays:

```js
const numbers = [1, 2, 3];

// Adding
const index = numbers.indexOf(2);
const added = [...numbers.slice(0, index), 4, ...numbers.slice(index)]; // utilizamos el spread operator porque slice devuelve un array y no queremos un array de arrays

// Removing
const removed = numbers.filter((n) => n !== 2);

// Updating
const updated = numbers.map((n) => (n === 2 ? 20 : n));
```

###### Enforcing Immutability

JavaScript no previene a los objetos de mutar porque no es puramente un lenguaje functional programming. Para eso utilizamos librerias que ofrecen esta posibilidad.

- Immutable: provee algunas estructuras inmutables
- Immer
- Mori
