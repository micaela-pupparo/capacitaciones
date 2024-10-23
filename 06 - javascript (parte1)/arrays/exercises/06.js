//                      EXERCISES -- GET MAX
function getMax(array) {
  if (array.length === 0) return undefined;
  return array.reduce((max, current) => {
    if (current > max) return (max = current);
    return max;
  });
}

const numbers = [10000, 2, 3, 4, 5, 233];
const max = getMax(numbers);
console.log(max);

//ejercicio Mosh
function getMaxMosh(array) {
  if (array.length === 0) return undefined;
  return array.reduce((a, b) => (a > b ? a : b));
}
