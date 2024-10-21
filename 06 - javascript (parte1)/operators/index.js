// /*         VARIABLES                */ 
// let name; // declara una variable pero no la define/inicializa
// console.log(name); //undefined

// const interestRate = 0.3;
// interestRate = 1; // esto va a hacer que tire error la consola 
// // por querer cambiar una constante.

// /*          PRIMITIVE TYPES             */
// let name = 'Mosh'; //String Literal
// let age = 30; //Number Literal
// let isApproved = true; //Boolean Literal
// let firstName; //undefined
// let lastName = null; //lo usamos cuando queremos explicitamente que 
// // se limpie el valor de una variable

// //          DYNAMIC TYPING
// typeof name; //string
// name = 1;
// typeof name; //number
// typeof age; //number
// age = 30.2;
// typeof age; //number, no separa los enteros de los flotantes
// typeof isApproved; //boolean
// typeof firstName; //undefined
// typeof lasName; //object

// //          OBJECT
// let person = {
//     name: 'Mosh',
//     age: 30
// };

// person.name = 'John'; //dot notation
// console.log(person.name); //dot notation
// person['name'] = 'Mary'; //bracket notation
// console.log(person['name']); //bracket notation
// let selection = 'name';
// console.log(person[selection]); //bracket notation

// //              ARRAYS
// let selectedColors = ['red', 'blue'];
// selectedColors[2] = 1; //los arrays pueden tener varios tipos dentro
// typeof selectedColors; //object
// selectedColors.length; //3

// //              FUNCTIONS
// //performing a task
// function greet(name) { //name es un parametro
//     //body del function
//     console.log('Hello ' + name);
// }

// greet('John'); //John es un argumento

// //calculating a value
// function square(number) {
//     return number * number;
// }

// let number = square(2);
// console.log(number); //4
// console.log(square(3)); //aca hay dos llamados a funciones
// //function log y function square

// //                  OPERADORES
// //                  ARITMETICOS
// let x = 10;
// let y = 3;

// //increment ++
// console.log(++x); //11 porque aplicamos el incremento primero y despues el console
// console.log(x++); //10 porque apicamos primero el console y despues el incremento
// console.log(x); //11

// //decrement --
// console.log(--x); //9

// //                  COMPARISON
// let points = 110;

// //operador ternario, operador condicional
// let type = points > 100 ? 'gold' : 'silver';

// //                  LOGICAL
// false || true; //true
// false || 'Mosh'; //'Mosh'
// false || 1; //1
// false || 1 || 2 //1 --> short-circuiting

// //                  BITWISE
// // 1 = 00000001
// // 2 = 00000010

// 1 | 2; // 00000011 --> 3 (3 es lo que muestra el console)
// //el operador mira cada uno verticalmente y si encuentra algun 1 devuelve 1

// 1 & 2; // 00000000  --> 0 (0 es lo que muestra el console)
// //el operador mira cada uno verticalmente y si comparten en la misma casilla un 1 lo devuelve

// const readPermission = 4;
// const writePermission = 2;
// const executePermission = 1;

// let myPermission = 0;
// //con bitwise or agregamos permisos
// myPermission = myPermission | readPermission | writePermission;
// console.log(myPermission); //6

// // con bitwise and chequeamos si tiene los permisos
// let message = (myPermission & readPermission) ? 'yes' : 'no';
// console.log(message) //yes


//                  EXERCISE -- SWAPPING VARIABLES
let a = 'red';
let b = 'blue';

let c = a;
a = b;
b = c;

console.log(a); //blue
console.log(b); //red