// console.log("hello world");

// let age: number = 20;
// if (age < 50)
//     age += 10;


// BUILT-IN TYPES---------------------------------------------------------
let sales: number = 123_456_789;  // podemos separar los digitos cuando son muy grandes
// no hace falta especificar siempre el tipo porque ya cuando le asignamos
// un valor, ts sabe que tipo es

let couse = "TypeScript";
// si pasamos el mouse por esta variable course se puede ver que yua lo toma
// como un string

let level; //considera el tipo como any
// representa todos los valores posibles. el tema es que de esta forma
// podemos asignarle y reasignarle cualquier valor
// por lo que pierde el uso que tiene ts.
// es una mala practica usar esto. se debe evitar de todas formas
// el uso de any.



// Arrays
let numbers: number[] = [1, 2, 4];
// si no le especificamos el array tiene el tipo any.
// un beneficio de especificar esto es que te aparecen todos los metodos
// disponibles para ese tipo si es que los queres usar

// Tuples
// son un array donde cada elemento tiene un tipo distinto
// son utilizados usualmente cuando trabajamos con un par de valores
let user: [number, string] = [1, "Mosh"];
// no se puede agregar más de dos elementos porque solo especificamos
// el tipo de los dos primeros
// por ahora existe un problema con el metodo push porque no te tira
// error
// TODO: chequear si lo del push sigue vigente



// Enums
// representa una lista de constantes relacionadas

// PascalCase
const enum Size { Small, Medium, Large };
// por defecto setea los valores en 0, 1 y 2
// pero si queremos que empiece por 1, 2 y 3 solo le asignamos el valor
// al primer elemento (small) y se ira sumando uno para los siguientes
// elementos
// podemos tener tambien strings de valores. pero de ser asi, debemos
// asignarle un valor a todos los miembros
// importante: el const fue agregado despues, esto es para que cuando
// se compile y se genere el archivo js no aparezca tanto codigo 
// o sea, genere un codigo mas optimizado.
// probar si es que no se entiende sacando el const y ejecutando tsc
let mySize: Size = Size.Medium;
console.log(mySize); //2



// Funciones
// debemos definir qué tipo de valor devuelve la funcion. si no retorna
// nada se le pone void. el beneficio de esto es que si nos olvidamos
// de retornar un valor o el valor retornado es de otro tipo
// esto nos va a tirar un error
// si el parametro no es usado, podemos setear en configuracion de ts
// que nos salte un error para esto. se llama noUnusedParameters
// tambien hay una configuracion para cuando nos olvidamos de 
// retornar un valor noImplicitReturns
function calculateTax(income: number, taxYear?: number): number {
    if ((taxYear || 2022) < 2022)
        return income * 1.2;
    return income * 1.3;
}
// con noUnusedLocals tambien podemos ver si hay variables que no se usan
// hay que tener en cuenta que ahora sí importa que le pasemos exactamente
// un parametro a la funcion.

// si queremos un parametro opcional podemos ver el segundo parametro 
// de la funcion
// o darle un valor opcional
function ejemplo(edad: number, nombre = "mica"): string {
    return "Hola " + nombre + " de edad " + edad;
}
ejemplo(19);



// Objetos
// ya no se pueden crear propiedades o metodos de la forma
// objeto.propiedad = "hola"
// let employee: {
//     readonly id: number, // para no poder modificar esto en un futuro
//     name: string,
//     retire: (date: Date) => void
// } = { 
//     id: 1, 
//     name: "Mosh",
//     retire: (date: Date) => {
//         console.log(date)
//     }
// };
// -----------------------------------------------------------------------


// ADVANCED TYPES--------------------------------------------------------

// Type aliases
// podemos definir un tipo custom. esto es mas que nada porque el objeto
// creado antes es muy dificil de leer.
type Employee = {
    readonly id: number,
    name: string,
    retire: (date: Date) => void
}

let employee: Employee = {
    id: 1, 
    name: "Mosh",
    retire: (date: Date) => {
        console.log(date)
    }
}


// Union Types
// para que un parametro/variable pueda tener mas de un tipo
// function kgToLbs(weight: number | string): number {

// }

// Narrowing se usa para ser mas especificos con los tipos
// y poder acceder a los metodos de ese tipo. de la funcion de
// arriba, solo weight puede acceder a los metodos que comparten
// los numeros y los strings
function kgToLbs(weight: number | string): number {
    if (typeof weight === "number")
        return weight * 2.2;
    else 
        return parseInt(weight) * 2.2;
}


// Intersection Types
// una variable puede ser dos tipos al mismo tiempo
type Draggable = {
    drag: () => void
};

type Resizable = {
    resize: () => void
};

type UIWidget = Draggable & Resizable;

let textBox: UIWidget = {
    drag: () => {},
    resize: () => {}
}


// Literal Types
// a veces queremos limitar los valores que le queremos asignar a una variable
let login: "y" | "n" = "y";

// otra forma
type Quantity = 50 | 100;
let quantity: Quantity = 100;


// Nullable Types
// para poder pasar un valor null en una funcion sin que nos tire error
// podemos usar el operador de union types
function greet(name: string | null | undefined) {
    if(name)
        console.log(name.toUpperCase());
    else
        console.log("Hola!");
}

greet(null);
greet(undefined);


// Optional Chaining
// type Customer = {
//     birthday: Date
// };

function getCustomer(id: number): Customer | null {
    return id === 0 ? null : { birthday: new Date() }
}

let customer = getCustomer(0);
// optional property access operator
console.log(customer?.birthday); // solo se ejecuta si existe la propiedad

type Customer = {
    birthday?: Date
};
console.log(customer?.birthday?.getFullYear());

// Optional element access operator
// util para los arrays
// customers?.[0]

// Optional call (funciones)
let log: any = null;
log?.("a"); //solo se ejecuta si log hace referencia a una funcion


// Nullish Coaelscing Operator
// chequea que el valor sea null o undefined
// sirve para casos donde queres cheqeuar los falsy pero hay un valor
// falsy valid, como el 0
let speed: number | null = null;
let ride = {
    speed: speed ?? 30
}


// Type Assertions
// a veces sabemos mas del tipo de un objeto que ts
let $phone = document.getElementById("phone") as HTMLInputElement;
$phone.value;
// esto no convierne a phone en un inputelement, es solo para darle info
// al compilador. en caso de ser otra cosa en vez de inputelement
// el programa se va a romper cuando querramos ejecutar
// phone.value

// hay otra sintax para lograr lo mismo
// let $phone = <HTMLInputElement> document.getElementById("phone");


// The unknown type 
// si queremos tener valores de tipo any pero no queremos que el 
// programa crashee si es que accede a metodos que no existen
// podemos utilizar el tipo unknown y narrowing
function render(document: unknown) {
    if (typeof document === "string")
        document.toUpperCase();
}


// The never type
// representa valores que nunca ocurren
function processEvents(): never { // para indicar que nunca retorna
    while (true){
        //dkasdklaklsd
    }
}
// processEvents();

// console.log("hola"); tira error porque nunca se va a ejecutar
// luego del loop infinito
// si no ponemos never, la funcion aparece como void y no aparece el
// error de que no se puede ejecutar el codigo de abajo

function reject(): never {
    throw new Error("error");
}

// reject();
// console.log("hola") tira error
