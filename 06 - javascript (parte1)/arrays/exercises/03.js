//                  EXERCISE -- EXCEPT
const numbers = [1, 2, 3, 4, 1];

function except(array, excluded) {
    let output = [];

    for (let element of array)
        if (!excluded.includes(element))
            output.push(element);
    
    return output;
}