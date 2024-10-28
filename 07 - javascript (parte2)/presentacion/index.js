//implementacion procedimental
let baseSalary = 30000;
let overtime = 10;
let rate = 20;

function getWage(baseSalary, overtime, rate) {
  return baseSalary + overtime * rate;
}

console.log(getWage(baseSalary, overtime, rate));

//implementacion orientada a objetos
let employee = {
  baseSalary: 30000,
  overtime: 10,
  rate: 20,
  getWage: function () {
    return this.baseSalary + this.overtime * this.rate;
  },
};

console.log(employee.getWage());

//esconder una propiedad
function User() {
  let admin = false;

  Object.defineProperty(this, "admin", {
    get: function () {
      return admin;
    },
    set: function (access) {
      if (access) admin = access;
    },
  });
}

//crear herencia
function Animal(race) {
  this.race = race;
}

function Cat(race) {
  Animal.call(this, race);
}

//por default
Cat.prototype = Object.create(Cat.prototype);

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

//clases declaradas
class Cat {}
//clases expresadas
const Animal = class {};
