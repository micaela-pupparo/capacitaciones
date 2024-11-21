import { it, expect, describe } from 'vitest';

// Arquitectura básica de una prueba ---------------------------------------
describe('test suite', () => {
  it('test case', () => {
    // Arrange

    // Act

    //Assert
    expect();
  });
});

// Ejemplo
export function max(a, b) {
  return a > b ? a : b;
}

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

// ------------------------------------------------------------------------
