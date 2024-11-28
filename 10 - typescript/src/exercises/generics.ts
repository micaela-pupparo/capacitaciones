// 1.
function echo<T>(arg: T): T {
  return arg;
}

// 2.
function printName<T extends { name: string }>(obj: T) {
  console.log(obj.name);
}

// 3.
class Entity<T> {
  constructor(public id: T) {}
}

// 4.
// "userId" | "username"
