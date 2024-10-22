//                  EXERCISE -- ARRAY FROM RANGE
function arrayFromRange(min, max) {
    let result = [];
    let index = min;

    while (index >= min && index <=max) {
        result.push(index);
        index++;
    }

    return result
}

const numbers = arrayFromRange(-10, -4);
console.log(numbers);