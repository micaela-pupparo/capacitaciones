//                      EXERCISES -- COUNT OCCURRENCES
const numbers = [1, 2, 3, 4, 1];

const count = countOccurrences(numbers, 0);
console.log(count);

function countOccurrences(array, searchElement) {
  const filteredElementArray = array.filter((e) => e === searchElement);
  return filteredElementArray.length;
}

//ejercicio Mosh con reduce
function countOccurrencesMosh(array, searchElement) {
  return array.reduce((accumulator, current) => {
    const occurrence = current === searchElement ? 1 : 0;
    return accumulator + occurrence;
  }, 0);
}
