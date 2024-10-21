//                      EXERCISE -- MAX OF 2 NUMBERS
function max(x, y) {
    if (x > y) 
        return x;           //el else no importa que este porque el return 'y' solo se ejecuta si el resto es falso y si es verdadero el return funciona como un break
    return y;
}

console.log(max(2,1));

// cleaner implementation
function maxMosh(a, b) {
    return (a > b) ? a : b;
}