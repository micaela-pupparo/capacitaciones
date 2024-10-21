//                      EXERCISE -- EVEN AND ODD NUMBERS
//muestra de 0 al limite que dimos los numeros pares e impares

function showNumbers(limit) {
    for (let i = 0; i <= limit; i++) {
        if (i % 2 === 0)
            console.log(i, 'EVEN');
        else 
            console.log(i, 'ODD')
    }
}

//otra forma para no escribir dos veces el console.log
// const message = (i % 2 === 0) ? 'EVEN' : 'ODD';
// console.log(i, message);

function showNumbersMosh(limit) {
    for (let i = 0; i <= limit; i++) {
        const message = (i % 2 === 0) ? 'EVEN' : 'ODD';
        console.log(i, message);
    }
}

showNumbersMosh(5);