// https://www.hackerrank.com/challenges/crush/problem

// Explanation
// We add k to the index [a - 1], indicating that every number after it, is k(100) greater
// We subtract k to index [b], indicating that every number after it, is k(100) lower
// This way we just make 2 operations instead of iterating through the whole array
// We are tracking the increment in each interval, instead of the increment in every position
//
// queries: [1, 2, 100], [2, 5, 100], [3, 4, 100]
// [0, 0, 0, 0, 0]              
// [100, 0, -100, 0, 0]
// [100, 100, -100, 0, -100]
// [100, 100, 0, -100, -100]
//
// Then we iterate through the array and getting the sum of each position, comparing with the previous greater

function arrayManipulation(n, queries) {
  // Write your code here
  const arr = [];
  
  queries.forEach(([a, b, k]) => {
      arr[a - 1] = (arr[a - 1] || 0) + k;
      arr[b] = (arr[b] || 0) - k;
  });

  console.log({arr})

  let count = 0, max = 0;
  arr.forEach((el) => {
    count += el;
    if(count > max) max = count;
  })

  return max;
}

console.time('arrayManipulation');
console.log(arrayManipulation(4, [[2, 3, 603], [1, 1, 286], [4, 4, 882]])); // 882    
console.timeEnd('arrayManipulation');


console.time('arrayManipulation2');
console.log(arrayManipulation(5, [[1, 2, 100], [2, 5, 100], [3, 4, 100]])); // 200    
console.timeEnd('arrayManipulation2');
