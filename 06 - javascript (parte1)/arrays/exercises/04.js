//                      EXERCISES -- MOVING AN ELEMENT
//slice te hace una copia
const numbers = [1, 2, 3, 4];

function move(array, index, offset) {
  let copy = array.slice();
  let element = array[index];

  if (offset < 0) offset += index;
  if (offset < 0 || offset >= copy.length)
    return console.error("Invalid offset");

  copy.splice(index, 1);
  copy.splice(offset, 0, element);

  return copy;
}

console.log(move(numbers, 1, 3));
