// 1.
type User3 = {
  name: string;
  age: number;
  occupation?: string;
};

let user01: User3 = {
  name: "John Smith",
  age: 30,
};

// 2.
type Bird = {
  fly: () => void;
};

type Fish = {
  swim: () => void;
};

type Pet = Bird | Fish;

// 3.
type Days =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";
