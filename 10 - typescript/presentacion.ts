// ------------------------ TIPOS INTEGRADOS ------------------------
// NUMBER
let sales: number = 1_000;

// STRING
let course = 'TypeScript';

// ANY
let any;

// ARRAY
let arrayNumbers: number[] = [1, 2, 5, 6, 7];

// TUPLES
let user: [number, string] = [1, 'Mica'];

// ENUM
const enum Size { Small, Medium, Large }
let mySize: Size = Size.Medium;

// FUNCTION
function example(age: number, name = "mica"): string {
    return "Hola " + name + " de edad " + age;
}
example(19); //hola mica de edad 19

// OBJECTS
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

// ----------------------------

// CUSTOM TYPES
type User = {
    name: string,
    age: number
}

const user1: User = { 
    name: 'mica',
    age: 22
}

// UNION TYPES
function kgToLbs(weight: number | string): number {
    if (typeof weight === "number")
        return weight * 2.2;
    else 
        return parseInt(weight) * 2.2;
}

// INTERSECTION TYPES
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

// LITERAL TYPES
let login: "y" | "n" = "y";
// otra forma
type Quantity = 50 | 100;
let quantity: Quantity = 100;

// NULLABLE TYPES
function greet(name: string | null | undefined) {
    if(name)
        console.log(name.toUpperCase());
    else
        console.log("Hola!");
}

greet(null);
greet(undefined);

// OPTIONAL CHAINING
type Customer = {
    birthday?: Date
};

function getCustomer(id: number): Customer | null {
    return id === 0 ? null : { birthday: new Date() }
}

let customer = getCustomer(0);

console.log(customer?.birthday?.getFullYear());

// OPTIONAL CALL
let log: any = null;
log?.("a");

// NULLISH COALESCING OPERATOR
let speed: number | null = null;
let ride = {
    speed: speed ?? 30
}

// TYPE ASSERTIONS
let $phone = document.getElementById("phone") as HTMLInputElement;
$phone.value;
// let $phone = <HTMLInputElement> document.getElementById("phone");

// THE UNKNOWN TYPE & NARROWING
function render(document: unknown) {
    if (typeof document === "string")
        document.toUpperCase();
}

// THE NEVER TYPE
function processEvents(): never { // para indicar que nunca retorna
    while (true){
        //dkasdklaklsd
    }
}
// ------------------------------------------------------------------

// ----------------------- OBJECT-ORIENTED PROGRAMMING -----------------------

// ---------------------------------------------------------------------------