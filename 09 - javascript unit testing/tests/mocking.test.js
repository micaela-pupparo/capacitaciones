import { trackPageView } from "../src/libs/analytics";
import { getExchangeRate } from "../src/libs/currency";
import { sendEmail } from "../src/libs/email";
import { charge } from "../src/libs/payment";
import { getShippingQuote } from "../src/libs/shipping";
import {
  getPriceInCurrency,
  getShippingInfo,
  renderPage,
  signUp,
  submitOrder,
} from "../src/mocking";
import { vi, it, expect, describe } from "vitest";
// vi tiene un metodo para crear mock functions

vi.mock("../src/libs/currency");
vi.mock("../src/libs/shipping");
vi.mock("../src/libs/analytics");
vi.mock("../src/libs/payment");

//-------------------PARTIAL MOCKING-----------------------------------
// hay situaciones donde queremos mantener alguna de las funciones en el modulo
// en vez de reemplazar todas con mock functions
// por ejemplo, en el modulo email, sendEmail simula enviar un email verdadero
// que claramente vamos a querer reemplazar por una mock function porque
// cuando testeamos el código no vamos a querer enviar emails
// pero para isValidEmail lo unico que hace es chequear que esté bien
// no queremos reemplazarla por una mock function
vi.mock("../src/libs/email", async (importOriginal) => {
  const originalModule = await importOriginal(); //devuelve una promesa
  return {
    ...originalModule, //copiamos todas las propiedades del modulo
    sendEmail: vi.fn(), //sobreescribimos la funcion
  };
});
//---------------------------------------------------------------------

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

//--------------------TESTING INTERACTIONS-----------------------------
describe("renderPage", () => {
  it("should return correct content", async () => {
    const result = await renderPage();

    expect(result).toMatch(/content/i);
  });

  it("should call analytics", async () => {
    await renderPage();

    expect(trackPageView).toHaveBeenCalledWith("/home");
  });
});

// Exercise
describe("submitOrder", () => {
  const order = { totalAmount: 10 };
  const creditCard = { creditCardNumber: "1234" };

  it("should charge the customer", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "success" });

    await submitOrder(order, creditCard);

    expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
  });

  it("should return success when payment is successful", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "success" });

    const result = await submitOrder(order, creditCard);

    expect(result).toEqual({ success: true });
  });

  it("should not return success when payment is successful", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "failed" });

    const result = await submitOrder(order, creditCard);

    expect(result).toEqual({ success: false, error: "payment_error" });
  });
});

//-------------------------PARTIAL MOCKING-------------------------------
describe("signUp", () => {
  const email = "name@domain.com";
  it("should return false if email is not valid", async () => {
    const result = await signUp("a");

    expect(result).toBe(false);
  });

  it("should return true if email is valid", async () => {
    const result = await signUp(email);

    expect(result).toBe(true);
  });

  it("should return the welcome email if email is valid", async () => {
    const result = await signUp(email);

    expect(sendEmail).toHaveBeenCalled();
    const args = vi.mocked(sendEmail).mock.calls[0];
    expect(args[0]).toBe(email);
    expect(args[1]).toMatch(/welcome/i);
  });
});
