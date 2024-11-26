import { calculateTax1 } from "./tax"
// el import me lo hizo automatico pero mosh no lo puso, ojo

// otra forma de describir las funciones
export declare function calculateTax1(income: number): number;

// cuando se usa este approach en vez del /** */ se debe declarar
// todas las funciones del modulo que seleccionaste
// porque si no las que no declaraste no van a aparecer para importar