//                  EXERCISE -- SUM OF ARGUMENTS
function sum(...elements) {
  if (Array.isArray(elements[0]) && elements.length === 1)
    elements = [...elements[0]];

  return elements.reduce((a, b) => a + b);
}

console.log(sum([5, 5]));
