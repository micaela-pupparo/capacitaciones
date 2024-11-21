import { calculateAverage, factorial, fizzBuzz, max } from '../src/intro';
import { describe, test, it, expect } from 'vitest';
// describe: para crear un grupo de pruebas relacionadas (test suite)
//      es una funcion que se le pasa de parametro un string, que es el nombre
//      del grupo y despues es una funcion que sera llamada por el Test Runner
// test: para crear un caso de prueba, it funciona igual
//      el primer parametro es un string para nombrar la prueba

// ------------------- DENTRO DEL IT --------------------------------------
// se estructura con el siguiente patrÃ³n
// AAA
// Arrange: seteamos el ambiente de la prueba, incluyendo todos los
//      datos necesarios y configuraciones.
// Act: performamos la accion que queremos probar
// Assert: chequeamos que el resultado de la prueba coincida
//      con nuestras expectativas.

// EJEMPLO: queremos probar que una tv pueda ser apagada:
// Arrange: Turn on the TV
// Act: press the power button
// Assert: verify TV is off

describe('max', () => {
  it('should return the first argument if it is greater', () => {
    // Arrange
    // esto se puede obviar y poner directamente los valores en
    // el max(2, 1)
    const a = 2;
    const b = 1;

    // Act
    const result = max(a, b);

    // Assert
    // expect retorna un expectation object
    expect(result).toBe(2);

    // otra forma de resolverlo en menos lineas de codigo
    // expect(max(2, 1)).toBe(2);
  });
  it('should return the second argument if it is greater', () => {
    expect(max(1, 2)).toBe(2);
  });
  it('should return the first argument if arguments are equal', () => {
    expect(max(1, 1)).toBe(1);
  });
});

describe('fizzBuzz', () => {
  it('should return FizzBuzz if arg is divisible by 3 and 5', () => {
    expect(fizzBuzz(15)).toBe('FizzBuzz');
  });
  it('should return Fizz if arg is only divisible by 3', () => {
    expect(fizzBuzz(6)).toBe('Fizz');
  });
  it('should return Buzz if arg is only divisible by 5', () => {
    expect(fizzBuzz(10)).toBe('Buzz');
  });
  it('should return arg as a string if it is not divisible by 3 or 5', () => {
    expect(fizzBuzz(1)).toBe('1');
  });
});

// ------------------- TEST-DRIVEN DEVELOPMENT --------------------------
describe('calculateAverage', () => {
  // 1. escribimos la prueba fallida
  it('should return NaN if given an empty array', () => {
    expect(calculateAverage([])).toBe(NaN);
  });
  // 3. escribimos la prueba fallida
  it('should calculate the average of an array with a single element', () => {
    expect(calculateAverage([1])).toBe(1);
  });
  // 6. escribimos la prueba fallida
  it('should calculate the average of an array with two elements', () => {
    expect(calculateAverage([1, 2])).toBe(1.5);
  });
  // 8. escribimos la prueba fallida
  it('should calculate the average of an array with three elements', () => {
    expect(calculateAverage([1, 2, 3])).toBe(2);
  });
});

// Exercise
describe('factorial', () => {
  it('should return 1 if given 0', () => {
    expect(factorial(0)).toBe(1);
  });

  it('should return 1 if given 1', () => {
    expect(factorial(1)).toBe(1);
  });

  it('should return 2 if given 2', () => {
    expect(factorial(2)).toBe(2);
  });

  it('should return 6 if given 3', () => {
    expect(factorial(3)).toBe(6);
  });

  it('should return 24 if given 4', () => {
    expect(factorial(4)).toBe(24);
  });

  it('should return undefined if given a negative number', () => {
    expect(factorial(-1)).toBeUndefined();
  });
});
