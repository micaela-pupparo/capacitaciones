import { getExchangeRate } from "../src/libs/currency";
import { getShippingQuote } from "../src/libs/shipping";
import { getPriceInCurrency, getShippingInfo } from "../src/mocking";
import { vi, it, expect, describe } from "vitest";
// vi tiene un metodo para crear mock functions

vi.mock("../src/libs/currency");
vi.mock("../src/libs/shipping");

describe("test suite", () => {
  it("test case", () => {
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
    greet.mockImplementation((name) => "Hello" + name);
    const result = greet("Mosh");
    console.log(result);

    //assertions de las mock functions
    //que haya sido llamada la funcion
    expect(greet).toHaveBeenCalled();
    //que haya sido llamada con un parametro en especifico
    expect(greet).toHaveBeenCalledWith("Mosh");
    //que haya sido llamada solo una vez
    expect(greet).toHaveBeenCalledOnce();
  });
});

// Exercise
describe("test suite 2", () => {
  it("test case 2", () => {
    const sendText = vi.fn();
    sendText.mockReturnValue("ok");

    const result = sendText("message");

    expect(sendText).toHaveBeenCalledWith("message");
    expect(result).toBe("ok");
  });
});

//-----------------------------MOCKING MODULES---------------------------
//para poder testear getPriceInCurrency debemos hacer una mock function
//para getExchangeRate
//para hacerlo vamos arriba de todo para mockear un modulo
//vi.mock("../src/libs/currency");
//cuando lo llamamos devuelve todas las funciones que se exportan del módulo
//esa linea de codigo es hoisteada al principio de todo, antes que las importaciones
describe("getPriceInCurrency", () => {
  it("should return price in target currency", () => {
    vi.mocked(getExchangeRate).mockReturnValue(1.5);

    const price = getPriceInCurrency(10, "AUD");

    expect(price).toBe(15);
  });
});

// Exercise
describe("getShippingInfo", () => {
  it("should return shipping unavailable if quote cannot be fetched", () => {
    vi.mocked(getShippingQuote).mockReturnValue(null);

    const result = getShippingInfo("London");

    expect(result).toMatch(/unavailable/i);
  });

  it("should return shipping info if quote can be fetched", () => {
    vi.mocked(getShippingQuote).mockReturnValue({ cost: 10, estimatedDays: 2 });

    const result = getShippingInfo("London");

    expect(result).toMatch("$10");
    expect(result).toMatch(/2 days/i);
    //otra forma, mismo resultado
    expect(result).toMatch(/shipping cost: \$10 \(2 days\)/i);
  });
});
