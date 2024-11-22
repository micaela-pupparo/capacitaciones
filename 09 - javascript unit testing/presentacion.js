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

// Hacer una buena afirmación--------------------------------------------
export function getCoupons() {
  return [
    { code: 'SAVE20NOW', discount: 0.2 },
    { code: 'DISCOUNT50OFF', discount: 0.5 },
  ];
}

describe('getCoupons', () => {
  it('should return an array of coupons', () => {
    const coupons = getCoupons();

    // es mejor incluir la primera por si te sale un error, es mas
    // facil entender qué falló
    //cuando usemos typescript esto no va a hacer falta
    expect(Array.isArray(coupons)).toBe(true);
    expect(coupons.length).toBeGreaterThan(0);
  });

  it('should return an array with valid coupon codes', () => {
    const coupons = getCoupons();

    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty('code');
      expect(typeof coupon.code).toBe('string');
      expect(coupon.code).toBeTruthy(); // strings vacios no son truthy
    });
  });

  it('should return an array with valid discounts', () => {
    const coupons = getCoupons();

    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty('discount');
      expect(typeof coupon.discount).toBe('number');
      expect(coupon.discount).toBeGreaterThan(0);
      expect(coupon.discount).toBeLessThan(1);
    });
  });
  // todas estas cases de prueba apuntan a un solo comportamiento cada una
  // pueden haber varias afirmaciones siempre y cuando esten relacionadas
});
// ----------------------------------------------------------------------

// Pruebas positivas y negativas-----------------------------------------
export function validateUserInput(username, age) {
  let errors = [];

  // la ultima condicion fue agregada por mosh
  if (
    typeof username !== 'string' ||
    username.length < 3 ||
    username.length > 255
  ) {
    errors.push('Invalid username');
  }

  // la ultima condicion fue agregada por mosh
  if (typeof age !== 'number' || age < 18 || age > 100) {
    errors.push('Invalid age');
  }

  return errors.length === 0 ? 'Validation successful' : errors.join(', ');
}

describe('validateUserInput', () => {
  it('should return success message if given valid username and age', () => {
    expect(validateUserInput('micaela', 21)).toMatch(/success/i);
  });

  it('should return error message if given a non-string username', () => {
    expect(validateUserInput(10, 20)).toMatch(/invalid/i);
  });

  it('should return error message if given a username of length shorter than 3', () => {
    expect(validateUserInput('a', 20)).toMatch(/invalid/i);
  });

  //esta la agregó mosh
  it('should return error message if username is longer than 255 characters', () => {
    expect(validateUserInput('a'.repeat(256), 20)).toMatch(/invalid/i);
  });

  it('should return error message if given a non-number age', () => {
    expect(validateUserInput('micaela', '20')).toMatch(/invalid/i);
  });

  it('should return error message if given an age under 18', () => {
    expect(validateUserInput('micaela', 15)).toMatch(/invalid/i);
  });

  // estas dos la agregó mosh
  it('should return an error if age is greater than 100', () => {
    expect(validateUserInput('micaela', 101)).toMatch(/invalid/i);
  });
  it('should return an error if both username and age are invalid', () => {
    expect(validateUserInput('', 0)).toMatch(/invalid username/i);
    expect(validateUserInput('', 0)).toMatch(/invalid age/i);
  });
});
// ----------------------------------------------------------------------

// Pruebas de límite-----------------------------------------------------
export function isPriceInRange(price, min, max) {
  return price >= min && price <= max;
}

describe('isPriceInRange', () => {
  it('should return false when the price is outside the range', () => {
    expect(isPriceInRange(-10, 0, 100)).toBe(false);
    expect(isPriceInRange(200, 0, 100)).toBe(false);
  });

  it('should return true when the price is equal to the min or the max', () => {
    expect(isPriceInRange(0, 0, 100)).toBe(true);
    expect(isPriceInRange(100, 0, 100)).toBe(true);
  });

  it('should return true when the price is within the range', () => {
    expect(isPriceInRange(50, 0, 100)).toBe(true);
  });

  // Pruebas parametrizadas----------------------------------------------
  it.each([
    { scenario: 'price < min', price: -10, result: false },
    { scenario: 'price = min', price: 0, result: true },
    { scenario: 'price between min and max', price: 50, result: true },
    { scenario: 'price = max', price: 100, result: true },
    { scenario: 'price > max', price: 200, result: false },
  ])('should return $result when $scenario', ({ price, result }) => {
    expect(isPriceInRange(price, 0, 100)).toBe(result);
  });
});
// ----------------------------------------------------------------------

// Testear funciones asíncronas------------------------------------------
describe('fetchData', () => {
  it('should return a promise that will resolve to an array of numbers', () => {
    fetchData().then((result) => {
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  // otra forma de escribir lo mismo
  it('should return a promise that will resolve to an array of numbers', async () => {
    const result = await fetchData();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  // para simular promesa rechazada
  it('should return a promise that will resolve to an array of numbers', async () => {
    try {
      await fetchData();
    } catch (error) {
      // el objeto con el resultado de la promesa es el error
      expect(error).toHaveProperty('reason');
      expect(error.reason).toMatch(/fail/i);
    }
  });
});
// ----------------------------------------------------------------------

// beforeAll, beforeEach, afterAll, afertEach----------------------------
describe('test suite', () => {
  beforeAll(() => {
    console.log('beforeAll called');
  });

  // la funcion callback se ejecuta antes de cada prueba
  beforeEach(() => {
    console.log('beforeEach called');
  });

  afterEach(() => {
    console.log('afterEach called');
  });

  afterAll(() => {
    console.log('afterAll called');
  });

  it('test case 1', () => {});

  it('test case 2', () => {});
});
// ----------------------------------------------------------------------

// Mock Functions--------------------------------------------------------

// mockClear()
// mockReset()
// mockRestore()

// vi.mock('/src/libs/currency');
// const greet = vi.fn();
// greet.mockReturnValue("Hello");
// greet.mockResolvedValue("Hello")
// greet.mockImplementation((name) => 'Hello' + name);
//assertions de las mock functions
// //que haya sido llamada la funcion
// expect(greet).toHaveBeenCalled();
// //que haya sido llamada con un parametro en especifico
// expect(greet).toHaveBeenCalledWith('Mosh');
// //que haya sido llamada solo una vez
// expect(greet).toHaveBeenCalledOnce();

// Partial Mocks
vi.mock('/src/libs/email', async (importOriginal) => {
  const originalModule = await importOriginal(); //devuelve una promesa
  return {
    ...originalModule, //copiamos todas las propiedades del modulo
    sendEmail: vi.fn(), //sobreescribimos la funcion
  };
});

// Mocking Modulos
export function getPriceInCurrency(price, currency) {
  const rate = getExchangeRate('USD', currency);
  return price * rate;
}
describe('getPriceInCurrency', () => {
  it('should return price in target currency', () => {
    vi.mocked(getExchangeRate).mockReturnValue(1.5);

    const price = getPriceInCurrency(10, 'AUD');

    expect(price).toBe(15);
  });
});

// Espiar en Funciones
export async function login(email) {
  const code = security.generateCode();

  await sendEmail(email, code.toString());
}

describe('login', () => {
  it('should email the one-time login code', async () => {
    const email = 'name@domain.com';
    // es muy parecido a mock
    const spy = vi.spyOn(security, 'generateCode');

    await login(email);

    const securityCode = spy.mock.results[0].value.toString();
    expect(sendEmail).toHaveBeenCalledWith(email, securityCode);
  });
});

// Mocking Dates
export function getDiscount() {
  const today = new Date();
  const isChristmasDay = today.getMonth() === 11 && today.getDate() === 25;
  return isChristmasDay ? 0.2 : 0;
}

describe('getDiscount', () => {
  it('should return .2 on Christmas day', () => {
    vi.setSystemTime('2024-12-25 00:01');
    expect(getDiscount()).toBe(0.2);

    vi.setSystemTime('2024-12-25 23:59');
    expect(getDiscount()).toBe(0.2);
  });

  it('should return 0 on any other day', () => {
    vi.setSystemTime('2024-12-24 00:01');
    expect(getDiscount()).toBe(0);

    vi.setSystemTime('2024-12-26 00:01');
    expect(getDiscount()).toBe(0);
  });
});
// ----------------------------------------------------------------------
