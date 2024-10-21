//                      EXERCISE -- COUNT TRUTHY
// debe devolver la cant de truthy que hay en un array

let listOfValues = [NaN, undefined, '', 4, 'Hello', null]

function countTruthy(array) {
    let count = 0
    for (let value of array)
        if (value)
            count++;
    return count;
}

console.log(countTruthy(listOfValues));
