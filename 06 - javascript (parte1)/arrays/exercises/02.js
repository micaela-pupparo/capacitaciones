//                  EXERCISE -- INCLUDES
const numbers = [1, 2, 3, 4];

function includes(array, searchElement) {
    for (let element of array)
        if (element === searchElement)
            return true;
    return false;
}