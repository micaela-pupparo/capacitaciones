import { trackPageView } from '../src/libs/analytics';
import { getExchangeRate } from '../src/libs/currency';
import { sendEmail } from '../src/libs/email';
import { charge } from '../src/libs/payment';
import { getShippingQuote } from '../src/libs/shipping';
import {
  getDiscount,
  getPriceInCurrency,
  getShippingInfo,
  isOnline,
  login,
  renderPage,
  signUp,
  submitOrder,
} from '../src/mocking';
import { vi, it, expect, describe, beforeEach } from 'vitest';
// SYPING ON FUNCTIONS--------------------------
import security from '../src/libs/security';
// ---------------------------------------------

// TODO: INFO IMPORTANTE------------------------------------
// la propiedad mock es global, acumula informacion entre
// distintos casos de prueba. Como buena practica se debe
// siempre limpiar nuestras mockfunctions antes o despues
// de cada caso de prueba
// mockClear() --> limpia toda la informacion de tods las llamadas
// mockReset() --> hace lo mismo pero le agrega a la implementacion
// una funcion vacia. por lo que si hacemos que la mock function
// tenga una logica, una implementacion, lo va a eliminar
// mockRestore() --> hace lo mismo que clear pero en vez de vaciar
// la implementacion, devuelve la implementacion original. esto solo
// tiene sentido en spies
// EJEMPLO EN SIGNUP TEST
// se puede configurar para que vitest siempre te limpie los mocks
// EJEMPLO EN VITEST.CONFIG.JS
// ---------------------------------------------------------

// vi tiene un metodo para crear mock functions

vi.mock('../src/libs/currency');
vi.mock('../src/libs/shipping');
vi.mock('../src/libs/analytics');
vi.mock('../src/libs/payment');

//-------------------PARTIAL MOCKING-----------------------------------
// hay situaciones donde queremos mantener alguna de las funciones en el modulo
// en vez de reemplazar todas con mock functions
// por ejemplo, en el modulo email, sendEmail simula enviar un email verdadero
// que claramente vamos a querer reemplazar por una mock function porque
// cuando testeamos el código no vamos a querer enviar emails
// pero para isValidEmail lo unico que hace es chequear que esté bien
// no queremos reemplazarla por una mock function
vi.mock('../src/libs/email', async (importOriginal) => {
  const originalModule = await importOriginal(); //devuelve una promesa
  return {
    ...originalModule, //copiamos todas las propiedades del modulo
    sendEmail: vi.fn(), //sobreescribimos la funcion
  };
});
//---------------------------------------------------------------------

describe('test suite', () => {
  it('test case', () => {
    const greet = vi.fn(); // retorna una mock function. por default no tiene
    // ningun comportamiento, retorna undefined

    //para deolver un valor
    // greet.mockReturnValue("Hello");
    // const result = greet();
    // console.log(result);

    //para devolver una promesa
    // greet.mockResolvedValue("Hello")
    // greet().then(result => console.log(result));

    //para pasarle logica
    greet.mockImplementation((name) => 'Hello' + name);
    const result = greet('Mosh');
    console.log(result);

    //assertions de las mock functions
    //que haya sido llamada la funcion
    expect(greet).toHaveBeenCalled();
    //que haya sido llamada con un parametro en especifico
    expect(greet).toHaveBeenCalledWith('Mosh');
    //que haya sido llamada solo una vez
    expect(greet).toHaveBeenCalledOnce();
  });
});

// Exercise
describe('test suite 2', () => {
  it('test case 2', () => {
    const sendText = vi.fn();
    sendText.mockReturnValue('ok');

    const result = sendText('message');

    expect(sendText).toHaveBeenCalledWith('message');
    expect(result).toBe('ok');
  });
});

//-----------------------------MOCKING MODULES---------------------------
//para poder testear getPriceInCurrency debemos hacer una mock function
//para getExchangeRate
//para hacerlo vamos arriba de todo para mockear un modulo
//vi.mock("../src/libs/currency");
//cuando lo llamamos devuelve todas las funciones que se exportan del módulo
//esa linea de codigo es hoisteada al principio de todo, antes que las importaciones
describe('getPriceInCurrency', () => {
  it('should return price in target currency', () => {
    vi.mocked(getExchangeRate).mockReturnValue(1.5);

    const price = getPriceInCurrency(10, 'AUD');

    expect(price).toBe(15);
  });
});

// Exercise
describe('getShippingInfo', () => {
  it('should return shipping unavailable if quote cannot be fetched', () => {
    vi.mocked(getShippingQuote).mockReturnValue(null);

    const result = getShippingInfo('London');

    expect(result).toMatch(/unavailable/i);
  });

  it('should return shipping info if quote can be fetched', () => {
    vi.mocked(getShippingQuote).mockReturnValue({ cost: 10, estimatedDays: 2 });

    const result = getShippingInfo('London');

    expect(result).toMatch('$10');
    expect(result).toMatch(/2 days/i);
    //otra forma, mismo resultado
    expect(result).toMatch(/shipping cost: \$10 \(2 days\)/i);
  });
});

//--------------------TESTING INTERACTIONS-----------------------------
describe('renderPage', () => {
  it('should return correct content', async () => {
    const result = await renderPage();

    expect(result).toMatch(/content/i);
  });

  it('should call analytics', async () => {
    await renderPage();

    expect(trackPageView).toHaveBeenCalledWith('/home');
  });
});

// Exercise
describe('submitOrder', () => {
  const order = { totalAmount: 10 };
  const creditCard = { creditCardNumber: '1234' };

  it('should charge the customer', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'success' });

    await submitOrder(order, creditCard);

    expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
  });

  it('should return success when payment is successful', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'success' });

    const result = await submitOrder(order, creditCard);

    expect(result).toEqual({ success: true });
  });

  it('should not return success when payment is successful', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'failed' });

    const result = await submitOrder(order, creditCard);

    expect(result).toEqual({ success: false, error: 'payment_error' });
  });
});

//-------------------------PARTIAL MOCKING-------------------------------
describe('signUp', () => {
  const email = 'name@domain.com';

  // CLEARING MOCKS
  beforeEach(() => {
    vi.mocked(sendEmail).mockClear();
    // FORMA DE LIMPIAR TODOS LOS MOCKS
    vi.clearAllMocks();
  });

  it('should return false if email is not valid', async () => {
    const result = await signUp('a');

    expect(result).toBe(false);
  });

  it('should return true if email is valid', async () => {
    const result = await signUp(email);

    expect(result).toBe(true);
  });

  it('should return the welcome email if email is valid', async () => {
    const result = await signUp(email);

    expect(sendEmail).toHaveBeenCalled();
    const args = vi.mocked(sendEmail).mock.calls[0];
    expect(args[0]).toBe(email);
    expect(args[1]).toMatch(/welcome/i);
  });
});

//---------------------------SPYING ON FUNCTIONS------------------------
// para el caso de la funcion login, sendEmail queremos reemplazarlo
// claramente a una mock function, porque no queremos que se manden
// mails durante las pruebas, pero para generateCode() no queremos
// reemplazarlo porque tenemos una logica valiosa para testear
// pero para poder testear login y poder crear una mock function
// para sendEmail, se necesita saber qué código le estamos pasando
// porque lo tiene de parametro. Para esto necesitamos un espía
// en la funcion generateCode para saber el código que genera

// importamos primero el modulo (se ve arriba de todo)
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

// -------------------------MOCKING DATES------------------------------
// para isOnline, dependemos del tiempo actual. el new Date() va a
// cambiar siempre que ejecutemos la prueba
// para eso debemos mockear la funcion date y simular distintos escenarios
describe('isOnline', () => {
  it('should return false if current hour is outside opening hours', () => {
    vi.setSystemTime('2024-01-01 07:59');
    expect(isOnline()).toBe(false);

    vi.setSystemTime('2024-01-01 20:01');
    expect(isOnline()).toBe(false);
  });

  it('should return true if current hour is within opening hours', () => {
    vi.setSystemTime('2024-01-01 8:00');
    expect(isOnline()).toBe(true);

    vi.setSystemTime('2024-01-01 19:59');
    expect(isOnline()).toBe(true);
  });
});

// Exercise
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
