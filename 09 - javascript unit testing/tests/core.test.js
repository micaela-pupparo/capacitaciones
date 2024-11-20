import {
  calculateDiscount,
  canDrive,
  getCoupons,
  isPriceInRange,
  isValidUsername,
  validateUserInput,
} from "../src/core";
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

  it("should return an array with valid discounts", () => {
    const coupons = getCoupons();

    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("discount");
      expect(typeof coupon.discount).toBe("number");
      expect(coupon.discount).toBeGreaterThan(0);
      expect(coupon.discount).toBeLessThan(1);
    });
  });
  // todas estas cases de prueba apuntan a un solo comportamiento cada una
  // pueden haber varias afirmaciones siempre y cuando esten relacionadas
});

// ----------------POSITIVE AND NEGATIVE TESTING--------------------------
describe("calculateDiscount", () => {
  //positive
  it("should return discounted price if given valid code", () => {
    expect(calculateDiscount(10, "SAVE10")).toBe(9);
    // esta assertion la agregamos despues cuando vimos por coverage que no estaba siendo testeada
    expect(calculateDiscount(10, "SAVE20")).toBe(8);
  });

  //negative
  it("should handle non-numeric price", () => {
    // con typescript no va a ser necesario
    expect(calculateDiscount("10", "SAVE10")).toMatch(/invalid/i);
  });

  it("should handle negative price", () => {
    expect(calculateDiscount(-10, "SAVE10")).toMatch(/invalid/i);
  });

  it("should handle non-string discount code", () => {
    expect(calculateDiscount(10, 10)).toMatch(/invalid/i);
  });

  it("should handle invalid discount code", () => {
    expect(calculateDiscount(10, "INVALID")).toBe(10);
  });
});

// Exercise
describe("validateUserInput", () => {
  it("should return success message if given valid username and age", () => {
    expect(validateUserInput("micaela", 21)).toMatch(/success/i);
  });

  it("should return error message if given a non-string username", () => {
    expect(validateUserInput(10, 20)).toMatch(/invalid/i);
  });

  it("should return error message if given a username of length shorter than 3", () => {
    expect(validateUserInput("a", 20)).toMatch(/invalid/i);
  });

  //esta la agregó mosh
  it("should return error message if username is longer than 255 characters", () => {
    expect(validateUserInput("a".repeat(256), 20)).toMatch(/invalid/i);
  });

  it("should return error message if given a non-number age", () => {
    expect(validateUserInput("micaela", "20")).toMatch(/invalid/i);
  });

  it("should return error message if given an age under 18", () => {
    expect(validateUserInput("micaela", 15)).toMatch(/invalid/i);
  });

  // estas dos la agregó mosh
  it("should return an error if age is greater than 100", () => {
    expect(validateUserInput("micaela", 101)).toMatch(/invalid/i);
  });
  it("should return an error if both username and age are invalid", () => {
    expect(validateUserInput("", 0)).toMatch(/invalid username/i);
    expect(validateUserInput("", 0)).toMatch(/invalid age/i);
  });
});

//----------------------BOUNDARY TESTING-----------------------------------
describe("isPriceInRange", () => {
  it("should return false when the price is outside the range", () => {
    expect(isPriceInRange(-10, 0, 100)).toBe(false);
    expect(isPriceInRange(200, 0, 100)).toBe(false);
  });

  it("should return true when the price is equal to the min or the max", () => {
    expect(isPriceInRange(0, 0, 100)).toBe(true);
    expect(isPriceInRange(100, 0, 100)).toBe(true);
  });

  it("should return true when the price is within the range", () => {
    expect(isPriceInRange(50, 0, 100)).toBe(true);
  });
});

// Exercise
describe("isValidUsername", () => {
  const minLength = 5;
  const maxLength = 15;

  it("should return false if username is too short", () => {
    expect(isValidUsername("a".repeat(minLength - 1))).toBe(false);
  });

  it("should return false if username is too long", () => {
    expect(isValidUsername("a".repeat(maxLength + 1))).toBe(false);
  });

  it("should return true if username is at the min or max length", () => {
    expect(isValidUsername("a".repeat(maxLength))).toBe(true);
    expect(isValidUsername("a".repeat(minLength))).toBe(true);
  });

  it("should return true if username is within the length constraint", () => {
    expect(isValidUsername("a".repeat(maxLength - 1))).toBe(true);
    expect(isValidUsername("a".repeat(minLength + 1))).toBe(true);
  });

  it("should return false for invalid input types", () => {
    expect(isValidUsername(null)).toBe(false);
    expect(isValidUsername(undefined)).toBe(false);
    expect(isValidUsername(1)).toBe(false);
  });
});

// Exercise
describe("canDrive", () => {
  it("should return error for invalid country code", () => {
    expect(canDrive(20, "FR")).toMatch(/invalid/i);
  });

  it("should return false for underage in the US", () => {
    expect(canDrive(15, "US")).toBe(false);
  });

  it("should return true for min age in the US", () => {
    expect(canDrive(16, "US")).toBe(true);
  });

  it("should return true for eligible in the US", () => {
    expect(canDrive(17, "US")).toBe(true);
  });

  it("should return false for underage in the UK", () => {
    expect(canDrive(16, "UK")).toBe(false);
  });

  it("should return true for min age in the UK", () => {
    expect(canDrive(17, "UK")).toBe(true);
  });

  it("should return true for eligible in the UK", () => {
    expect(canDrive(18, "UK")).toBe(true);
  });
});
