//                      EXERCISE -- FIZZBUZZ
// Divisible by 3 => Fizz
// Divisible by 5 => Buzz
// Divisible by both 3 and 5 => FizzBuzz
// Not divisible by 3 or 5 => input
// Anything but a number => 'Not a number'

function fizzBuzz(input) {
    if (typeof input === 'number') {
        if ((input % 5 === 0) && (input % 3 === 0))
            return 'FizzBuzz';
        if (input % 3 === 0) 
            return 'Fizz';
        else if (input % 5 === 0)
            return 'Buzz';
        return input;
    }

    return 'Not a number'; //se puede devolver el valor NaN
}

console.log(fizzBuzz(14));