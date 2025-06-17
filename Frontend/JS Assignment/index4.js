function getEvenNumbers(arr) {
  return arr.filter(num => num % 2 === 0);
}
console.log(getEvenNumbers([1, 2, 3, 4, 5, 6])); //returns a new array with only the items that matches the condition
