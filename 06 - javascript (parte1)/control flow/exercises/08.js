//                      EXERCISE -- SUM OF MULTIPLES OF 3 AND 5
//devuelve todos los multiplos de 3 y 5 hasta el limite que establezcamos

function sum(limit) {
    let sum = 0;

    for (let i = 0; i <= limit; i++)
        if ((i % 3 === 0) || (i % 5 === 0))
            sum+=i;

    return sum;
}

console.log(sum(10));