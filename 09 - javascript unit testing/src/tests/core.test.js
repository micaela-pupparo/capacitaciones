import { getCoupons } from "../src/core";
import { it, expect, describe } from "vitest";
// si ponemos iv el vitest snippet nos importa automaticamente todo

// ------------------------WRITING GOOD ASSERTIONS-----------------------
/*
describe("test suite", () => {
    it("test case", () => {
        const result = "The requested file was not found.";

        // Loose Assertion (too general)
        expect(result).toBeDefined();

        // Tight Assertion (too specific)
        expect(result).toBe("The requested file was not found.");

        // Better Assertion
        expect(result).toMatch(/not found/i); //i hace que sea case insensitive
    })

    it("test case 2", () => {
        const result = [1, 2, 3];

        // loose
        expect(result).toBeDefined();

        // tight
        expect(result).toEqual([1, 2, 3]);

        // better, no depende del orden
        expect(result).toEqual(expect.arrayContaining([1, 2, 3]));
        // better
        expect(result.length).toBeGreaterThan(0);
    })

    it("test case 3", () => {
        const result = {name: "Mosh"};

        // tight, si agregamos una propiedad falla
        expect(result).toEqual({name: "Mosh"});

        // better
        expect(result).toMatchObject({name: "Mosh"});
        expect(result).toHaveProperty("name"); // puede tener como segundo parametro un valor
        expect(typeof result.name).toBe("string");
    })
})
*/

// Exercise
describe("getCoupons", () => {
  it("should return an array of coupons", () => {
    const coupons = getCoupons();

    // es mejor incluir la primera por si te sale un error, es mas
    // facil entender qué falló
    //cuando usemos typescript esto no va a hacer falta
    expect(Array.isArray(coupons)).toBe(true);
    expect(coupons.length).toBeGreaterThan(0);
  });

  it("should return an array with valid coupon codes", () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("code");
      expect(typeof coupon.code).toBe("string");
      expect(coupon.code).toBeTruthy(); // strings vacios no son truthy
    });
  });
});
