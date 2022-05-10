// https://www.hackerrank.com/challenges/minimum-swaps-2

function minimumSwaps(arr) {
  const newArr = [...arr];      // Get new, modifiable copy of array
  let swaps = 0;                // Initialize swaps

  // For every position in the array, if it is not in the expected val (i + 1), swap it with the correct one.
  newArr.forEach((el, i) => {
    const expected = i + 1;
    if(el !== expected) {
      const index = newArr.findIndex((e) => e === expected);
      newArr[index] = el;
      newArr[i] = (expected);
      swaps ++;
    }
  });

  console.log(swaps);
}


minimumSwaps([7, 1, 3, 2, 4, 5, 6]); // 5

// Steps
// [7, 1, 3, 2, 4, 5, 6] // 0
// [1, 7, 3, 2, 4, 5, 6] // 1
// [1, 2, 3, 7, 4, 5, 6] // 2
// [1, 2, 3, 4, 7, 5, 6] // 3
// [1, 2, 3, 4, 5, 7, 6] // 4
// [1, 2, 3, 4, 5, 5, 7] // 5