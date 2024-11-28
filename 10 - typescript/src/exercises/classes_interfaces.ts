// 1.
class Longer {
  constructor(public file: string) {}
  write(message: string) {}
}

// 2.
class Person3 {
  constructor(public firstName: string, public lastName: string) {}
  get fullName(): string {
    return this.firstName + " " + this.lastName;
  }
}

// 3.
class Employee extends Person3 {
  constructor(firstName: string, lastName: string, public salary: number) {
    super(firstName, lastName);
  }
}

// 4.

interface Address {
  street: string;
  city: string;
  zipCode: number;
}

interface Employee {
  name: string;
  salary: number;
  address: Address;
}
