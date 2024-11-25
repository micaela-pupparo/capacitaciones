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
let employee: {
    readonly id: number, // para no poder modificar esto en un futuro
    name: string,
    retire: (date: Date) => void
} = { 
    id: 1, 
    name: "Mosh",
    retire: (date: Date) => {
        console.log(date)
    }
};