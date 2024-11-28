// ------------------------ TIPOS INTEGRADOS ------------------------
// NUMBER
let sales: number = 1_000;

// STRING
let course = "TypeScript";

// ANY
let any;

// ARRAY
let arrayNumbers: number[] = [1, 2, 5, 6, 7];

// TUPLES
let user: [number, string] = [1, "Mica"];

// ENUM
const enum Size {
  Small,
  Medium,
  Large,
}
let mySize: Size = Size.Medium;

// FUNCTION
function example(age: number, name = "mica"): string {
  return "Hola " + name + " de edad " + age;
}
example(19); //hola mica de edad 19

// OBJECTS
let employee: {
  readonly id: number; // para no poder modificar esto en un futuro
  name: string;
  retire: (date: Date) => void;
} = {
  id: 1,
  name: "Mosh",
  retire: (date: Date) => {
    console.log(date);
  },
};

// ----------------------------

// CUSTOM TYPES
type User = {
  name: string;
  age: number;
};

const user1: User = {
  name: "mica",
  age: 22,
};

// UNION TYPES
function kgToLbs(weight: number | string): number {
  if (typeof weight === "number") return weight * 2.2;
  else return parseInt(weight) * 2.2;
}

// INTERSECTION TYPES
type Draggable = {
  drag: () => void;
};

type Resizable = {
  resize: () => void;
};

type UIWidget = Draggable & Resizable;

let textBox: UIWidget = {
  drag: () => {},
  resize: () => {},
};

// LITERAL TYPES
let login: "y" | "n" = "y";
// otra forma
type Quantity = 50 | 100;
let quantity: Quantity = 100;

// NULLABLE TYPES
function greet(name: string | null | undefined) {
  if (name) console.log(name.toUpperCase());
  else console.log("Hola!");
}

greet(null);
greet(undefined);

// OPTIONAL CHAINING
type Customer = {
  birthday?: Date;
};

function getCustomer(id: number): Customer | null {
  return id === 0 ? null : { birthday: new Date() };
}

let customer = getCustomer(0);

console.log(customer?.birthday?.getFullYear());

// OPTIONAL CALL
let log: any = null;
log?.("a");

// NULLISH COALESCING OPERATOR
let speed: number | null = null;
let ride = {
  speed: speed ?? 30,
};

// TYPE ASSERTIONS
let $phone = document.getElementById("phone") as HTMLInputElement;
$phone.value;
// let $phone = <HTMLInputElement> document.getElementById("phone");

// THE UNKNOWN TYPE & NARROWING
function render(document: unknown) {
  if (typeof document === "string") document.toUpperCase();
}

// THE NEVER TYPE
function processEvents(): never {
  // para indicar que nunca retorna
  while (true) {
    //dkasdklaklsd
  }
}
// ------------------------------------------------------------------

// ----------------------- OBJECT-ORIENTED PROGRAMMING -----------------------

// CLASSES
class Account {
  readonly id: number; // READONLY
  owner: string;
  private _balance: number;
  nickname?: string; //OPTIONAL

  constructor(id: number, owner: string, balance: number) {
    this.id = id;
    this.owner = owner;
    this._balance = balance;
  }

  deposit(amount: number): void {
    if (amount <= 0) throw new Error("invalid amount");
    this._balance += amount;
  }

  geetBalance(): number {
    return this._balance;
  }
}

class Account2 {
  constructor(
    public readonly id: number,
    public owner: string,
    private _balance: number,
    public nickname?: string
  ) {}

  // Getters y Setters
  get balance(): number {
    return this._balance;
  }

  set balance(value: number) {
    if (value < 0) throw new Error("invalid value");
    this._balance = value;
  }
}

let account = new Account2(1, "Mosh", 0, "moshi");

// INDEX SIGNATURES
class SeatAssigment {
  // A1: "Mosh"
  // A2: "Moshi"
  [seatNumber: string]: string;
}

let seats = new SeatAssigment();
seats.A1 = "Mosh";
seats.A2 = "Moshi";
seats["A3"] = "John";

// STATIC MEMBERS
class Ride {
  private static _activeRides: number = 0;

  start() {
    Ride._activeRides++;
  }
  stop() {
    Ride._activeRides--;
  }

  static get activeRides() {
    return Ride._activeRides;
  }
}

let ride1 = new Ride();
ride1.start();

let ride2 = new Ride();
ride2.start();

console.log(Ride.activeRides); //2

// INHERITANCE
class Person {
  constructor(public firstName: string, public lastName: string) {}

  get fullName(): string {
    return this.firstName + " " + this.lastName;
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
  override get fullName(): string {
    return "Professor" + super.fullName;
  }
}

let teacher = new Teacher("John", "Smith");

// POLYMORPHISM
printNames([new Student(1, "John", "Smith"), new Teacher("Mosh", "Moshi")]);

function printNames(people: Person[]) {
  for (let person of people) console.log(person.fullName);
  //John Smith
  //Professor Mosh Moshi
}

// INTERFACES
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

// ---------------------------------------------------------------------------

// --------------------------------- GENERICS --------------------------------
// GENERIC CLASSES
class KeyValuePair<K, V> {
  constructor(public key: K, public value: V) {}
}

let pair = new KeyValuePair<string, string>("1", "a");

// GENERIC FUNCTIONS (METHOD)
class ArrayUtils {
  static wrapInArray<T>(value: T) {
    return [value];
  }
}

let numbers1 = ArrayUtils.wrapInArray(1);

// GENERIC INTERFACES
interface Result<T> {
  data: T | null;
  error: string | null;
}

function fetch<T>(url: string): Result<T> {
  return { data: null, error: null };
}

interface User4 {
  username: string;
}

interface Product {
  title: string;
}

let result = fetch<Product>("url");
result.data?.title;

// GENERIC CONSTRAINTS
function echo1<T extends number | string>(value: T): T {
  return value;
}
echo1(1);

// TYPE MAPPING
type ReadOnlyProduct = {
  // iteramos las propiedades de product con el operador keyof
  readonly [Property in keyof Product]: Product[Property];
};

type ReadOnly<T> = {
  readonly [K in keyof T]: T[K];
};
type Optional<T> = {
  [K in keyof T]?: T[K];
};

type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

// EXTENDING GENERIC CLASSES
// PASS ON THE GENERIC TYPE
class Store<T> {
  protected _objects: T[] = [];

  add(obj: T): void {
    this._objects.push(obj);
  }
  find(property: keyof T, value: unknown): T | undefined {
    return this._objects.find((obj) => obj[property] === value);
  }
}

class CompressibleStore<T> extends Store<T> {
  compress() {}
}

// RESTRICT THE GENERIC TYPE
class SearchableStore<T extends { name: string }> extends Store<T> {}

// FIX THE GENERIC TYPE
class ProductStore extends Store<Product> {}
// ---------------------------------------------------------------------------

// -------------------------------- DECORATORS -------------------------------
// CLASS DECORATOR
function Component(constructor: Function) {
  console.log("compponent decorator called");
  constructor.prototype.uniqueID = Date.now();
  constructor.prototype.insertInDOM = () => {
    console.log("inserting the component in the DOM");
  };
}
@Component
class ProfileComponent {}

// PARAMETERIZED DECORATORS
function DecoratorFactory(value: number) {
  return (constructor: Function) => {
    console.log("compponent decorator called");
    constructor.prototype.options = value;
    constructor.prototype.uniqueID = Date.now();
    constructor.prototype.insertInDOM = () => {
      console.log("inserting the component in the DOM");
    };
  };
}

// METHOD DECORATORS
function Log(target: any, methodNaame: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value as Function; // metodo original
  // EXPLICAR POR QUE VA FUNCTION Y NO ARROW FUNCTION
  descriptor.value = function (...args: any) {
    console.log("before");
    original.call(this, args);
    console.log("after");
  };
}

class Person2 {
  @Log
  say(message: string) {
    console.log("Person says " + message);
  }
}

// ACCESSOR DECORATORS
function Capitalize(
  target: any,
  methodNaame: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.get;
  descriptor.get = function () {
    const result = original?.call(this);
    return typeof result === "string" ? result.toUpperCase() : result;
  };
}

class Person4 {
  constructor(public firstName: string, public lastName: string) {}

  @Capitalize
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

// PROPERTY DECORATORS
function MinLength(length: number) {
  return (target: any, propertyName: string) => {
    let value: string;

    const descriptor: PropertyDescriptor = {
      get() {
        return value;
      },

      set(newValue: string) {
        if (newValue.length < length)
          throw new Error(
            `${propertyName} should be at least ${length} characters long`
          );
        value = newValue;
      },
    };

    Object.defineProperty(target, propertyName, descriptor);
  };
}

class User4 {
  @MinLength(4)
  password: string;

  constructor(password: string) {
    this.password = password;
  }
}

// PARAMETER DECORATORS
type WatchedParameter = {
  methodName: string;
  parameterIndex: number;
};

const watchedParameters: WatchedParameter[] = [];

function Watch(target: any, methodName: string, parameterIndex: number) {
  watchedParameters.push({
    methodName,
    parameterIndex,
  });
}

class Vehicle {
  move(@Watch speed: number) {}
}
// ---------------------------------------------------------------------------
