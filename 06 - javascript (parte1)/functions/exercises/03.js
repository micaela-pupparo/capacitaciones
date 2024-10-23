//                  EXERCISE -- ERROR HANDLING

function countOccurrencesMosh(array, searchElement) {
  if (!Array.isArray(array)) throw new Error("Value is not an array");
  return array.reduce((accumulator, current) => {
    const occurrence = current === searchElement ? 1 : 0;
    return accumulator + occurrence;
  }, 0);
}

try {
  const numbers = [1, 2, 3, 4, 1];
  const count = countOccurrencesMosh(1, 0);
  console.log(count);
} catch (e) {
  console.log(e.message);
}
