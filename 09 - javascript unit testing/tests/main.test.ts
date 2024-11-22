import { it, expect, describe } from 'vitest';
import { calculateDiscount } from '../src/main';

describe('calculateDiscount', () => {
    //positive
    it('should return discounted price if given valid code', () => {
      expect(calculateDiscount(10, 'SAVE10')).toBe(9);
      // esta assertion la agregamos despues cuando vimos por coverage que no estaba siendo testeada
      expect(calculateDiscount(10, 'SAVE20')).toBe(8);
    });
  
    //negative
    // it('should handle non-numeric price', () => {
    //   // con typescript no va a ser necesario
    //   expect(calculateDiscount('10', 'SAVE10')).toMatch(/invalid/i);
    // });
  
    it('should handle negative price', () => {
      expect(calculateDiscount(-10, 'SAVE10')).toMatch(/invalid/i);
    });
  
    // it('should handle non-string discount code', () => {
    //   expect(calculateDiscount(10, 10)).toMatch(/invalid/i);
    // });
  
    it('should handle invalid discount code', () => {
      expect(calculateDiscount(10, 'INVALID')).toBe(10);
    });
  });