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
// ------------------------------------------------------------------------


// OBJECT-ORIENTED PROGRAMMING--------------------------------------------
// Classes
// class Account {
//     readonly id: number;
//     owner: string;
//     private _balance: number;
//     nickname?: string;

//     constructor(id: number, owner: string, balance: number) {
//         this.id = id;
//         this.owner = owner;
//         this._balance = balance;
//     }

//     deposit(amount: number): void {
//         if (amount <= 0)
//             throw new Error("invalid amount")
//         this._balance += amount;
//     }

//     geetBalance(): number {
//         return this._balance;
//     }
// }

// let account = new Account(1, "Mosh", 0);
// console.log(account instanceof Account); //true


// Read only and optional properties
// readonly id: number; readonly
// nickname?: string; optional property

// Access Control Keywords
// existen 3 access modifiers
// - public -> por default
// - private -> private balance: number;
// solo se puede acceder dentro de la clase, o sea, por los metodos
// pero no se puede cambiar el valor fuera de ella
// - protected
// console.log(account.geetBalance())

// Parameter properties
class Account {
    nickname?: string;

    constructor(
        public readonly id: number, 
        public owner: string, 
        private _balance: number) {
    }

    // Getters y Setters
    get balance(): number {
        return this._balance;
    }

    set balance(value: number) {
        if (value < 0)
            throw new Error("invalid value")
        this._balance = value;
    }
}

let account = new Account(1, "Mosh", 0);
console.log(account.balance);


// Index Signatures
// para agregar propiedades dinamicamente a un objeto
class SeatAssigment {
    // A1: "Mosh"
    // A2: "Moshi"
    [seatNumber: string]: string;
}

let seats = new SeatAssigment();
seats.A1 = "Mosh";
seats.A2 = "Moshi";
seats["A3"] = "John";


// Static Members
// propiedad que es de una clase y no de un objeto
class Ride {
    private static /* (*) */ _activeRides: number = 0;

    start() {Ride._activeRides++;}
    stop() {Ride._activeRides--;}

    static get activeRides() {return Ride._activeRides}
}

let ride1 = new Ride();
ride1.start();

let ride2 = new Ride();
ride2.start();

// console.log(ride1.activeRides); //1
// console.log(ride2.activeRides); //1

// pero deberia haber 2...
// necesitamos un lugar global para llevar registro de los active rides
// (*) SE HACE PRIVATE TAMBIEN
// para ue no se pueda Ride.activeRides = 2324435;
console.log(Ride.activeRides) //2


// Inheritance
class Person {
    constructor(public firstName: string, public lastName: string) {
    }
        
    get fullName() : string {
        return this.firstName + " " + this.lastName
    }
    
    walk() {
        console.log("walking");
    }
}

class Student extends Person {
    constructor(public studentId: number, firstName: string, lastName: string) {
        super(firstName, lastName);
    }

    takeTest() {
        console.log("taking a test");
    }
}


// Method overriding
class Teacher extends Person {
    // se puede no usar el override pero puede traer problemas
    // lo configuramos para que salte error si no lo ponemos
    override get fullName() : string {
        return "Professor" + super.fullName;
    }
}

let teacher = new Teacher("John", "Smith");


// Polymorphism
printNames([
    new Student(1, "John", "Smith"),
    new Teacher("Mosh", "Moshi")
])

function printNames(people: Person[]) {
    for (let person of people)
        console.log(person.fullName);
}


// Private vs Protected Members
// las propiedades protegidas tienen en comun con las privadas que se pueden acceder
// dentro de la clase pero no por fuera
// la diferencia es que las protegidas son heredadas y las privadas no
// no suelen ser usadas. 



// Abstract CLasses and Methods
abstract class Shape {
    constructor(public color: string) {}

    // render() {}; //es ilogico pensar que si hacemos una instancia
    // de shape, se pueda renderear.
    // una clase abstracta necesita si o si de otra que la extienda

    // tambien se puede crear un metodo abstracto
    abstract render(): void;
    // los metodos abstractos solo pueden existir dentro de una clase
    // abstracta
}

class Circle extends Shape {
    constructor(public radius: number, color: string) {
        super(color);
    }

    override render(): void {
        console.log("rendering a circle")
    }
}

// let shape = new Shape("red"); tira error



// Interfaces
// classes --> blueprints for creating objects
// interfaces --> to define the shape of objects

// abstract class Calendar {
//     constructor(public name: string) {}

//     // debemos abstraer los metodos porque cada calendario puede 
//     // tener una implementacion distinta
//     abstract addEvent(): void;
//     abstract removeEvent(): void;
// }

// esto a la hora de crear el archivo js no aparece porque las 
// interfaces no existen en js. esto es algo bueno porque estariamos
// optimizando el codigo
interface Calendar {
    name: string;
    addEvent(): void;
    removeEvent(): void;
}

// inheritance
interface CloudCalendar extends Calendar {
    sync(): void;
}

// implementacion
class GoogleCalendar implements Calendar {
    constructor(public name: string) {}

    addEvent(): void {
        throw new Error("Method not implemented.");
    }
    removeEvent(): void {
        throw new Error("Method not implemented.");
    }
}
// -----------------------------------------------------------------------



// GENERICS---------------------------------------------------------------
// en vez de usar el tipo any podemos usar una clase generica
class KeyValuePair<K, V> {
    constructor(public key: K, public value: V) {}
}

let pair = new KeyValuePair<string, string>("1", "a");

// Funciones Genericas
class ArrayUtils {
    static wrapInArray<T>(value: T) {
        return [value];
    }
}

let numbers1 = ArrayUtils.wrapInArray(1);


// Interfaces Genericas
// http://website.com/users
// http://website.com/products

interface Result<T> {
    data: T | null,
    error: string | null
}

function fetch<T>(url: string): Result<T> {
    return { data: null, error: null };
}

interface User {
    username: string;
}

interface Product {
    title: string;
}

let result = fetch<Product>("url");
result.data?.title;


// Generic Constraints
// solo permite usar o numeros o strings

// function echo<T extends number | string>(value: T): T {
//     return value;
// }
// echo(1)

// objetos:
// function echo<T extends {name: string}>(value: T): T {
//     return value;
// }
// echo({name: "a"});

// interfaces:
// interface Person {
//     name: string
// }

// function echo<T extends Person>(value: T): T {
//     return value;
// }

// clases
class Person1 {
    constructor(public name: string) {}
}

function echo<T extends Person1>(value: T): T {
    return value;
}
echo(new Person1("a"));


// Generic Classes and Inheritance
interface Product2 {
    name: string,
    price: number
}

class Store<T> {
    private _objects: T[] = [];

    add(obj: T): void {
        this._objects.push(obj);
    }
}