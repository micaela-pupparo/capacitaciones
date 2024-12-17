console.log("Hello World!");

// Composition
// sin functional programming
import { compose, pipe } from "lodash/fp";

let input = "  JavaScript  ";

// con functional programming
const trim = (str) => str.trim();
const wrap = (type) => (str) => `<${type}>${str}</${type}>`;
const toLowerCase = (str) => str.toLowerCase();

// higher-order function
// retorna una nueva funcion que es la composicion de todas las funciones que se pasan por parametro
// el orden es de derecha a izquierda para saber el orden en el que se aplican
const transform = compose(wrapInDiv, toLowerCase, trim);
transform(input);

// para evitar eso, se usa pipe
// ahora se lee de izquierda a derecha
pipe(trim, toLowerCase, wrap("div"));

// Currying
function add(a) {
  return function (b) {
    return a + b;
  };
}

const add2 = (a) => (b) => a + b;

add(1)(5);

// Pure Functions
// funcion NO pura
function myFunction(number) {
  return number * Math.random();
}
// funcion pura
function myFunction2(number) {
  return number * 2;
}

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

// Immutability
const person = {
  name: "john",
  address: { country: "USA", city: "San Francisco" },
};
// la propiedad name se sobreescribe
const updated1 = {
  ...person,
  address: { ...person.address, city: "New York" },
  name: "bob",
};

console.log(person); // city: "San Francisco"

const numbers = [1, 2, 3];

// Adding
const index = numbers.indexOf(2);
const added = [...numbers.slice(0, index), 4, ...numbers.slice(index)]; // utilizamos el spread operator porque slice devuelve un array y no queremos un array de arrays

// Removing
const removed = numbers.filter((n) => n !== 2);

// Updating
const updated = numbers.map((n) => (n === 2 ? 20 : n));

// Immutable
import { Map } from "immutable";

let book = Map({ title: "Harry Potter" });
