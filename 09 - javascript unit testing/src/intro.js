// Lesson: Writing your first tests
export function max(a, b) {
  return a > b ? a : b;
}

// Exercise
export function fizzBuzz(n) {
  if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return n.toString();
}

//-------------------------TEST-DRIVEN DEVELOPMENT------------------------
export function calculateAverage(numbers) {
  // 4. refactorizamos el codigo
  if (numbers.length === 0) {
    // 2. escribimos lo justo para que la prueba sea pasada
    return NaN;
  }

  // 7. refactorizamos
  const sum = numbers.reduce((sum, current) => sum + current, 0);
  return sum / numbers.length;

  // 5. escribimos lo justo para que la prueba sea pasada
  //return numbers[0];
}

export function factorial(n) {
  if (n < 0) return undefined;
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}
