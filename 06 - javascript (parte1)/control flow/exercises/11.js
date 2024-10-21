//                      EXERCISE -- PRIME NUMBERS
//numero primo es cuando sus factores son 1 y el mismo

function showPrimes(limit) {
    for (let i = 2; i <= limit; i++)
        if (isPrime(i))
            console.log(i);
}

function isPrime(number) {
    for (let factor = 2; factor < number; factor++)
        if (number % factor === 0) 
            return false

    return true;
}

showPrimes(20)