// https://www.hackerrank.com/challenges/count-triplets-1/

/*
* We will use 2 hashes:
* - 1 hash to store the prequencies of each number appearance
* - 1 hash to store the possible pairs and their frequencies
*
* We will traverse the array back to fron, storing each frequency occurrance.
* For each value (x), we want to know if a triplet pair (xr, xrr) has already been stored
* If so, we will add to the count
*
* Then we will add to the pairs hash the current pair (x, xr);
*/
function countTriplets(arr, r) {
  let count = 0;
  const freq = {};      // Store te frequency of each value
  const pairs = {};     // Store the possible r pairs


  arr.reverse().forEach((x) => {
    // Get triplets values
    const xr = x * r;
    const xrr = xr * r;
    const pairWeWant = [xr, xrr];

    // Look for the pair we want in the pairs hash and add to the count
    count += pairs[pairWeWant] || 0;

    // Add to the pairs hash current pair freq
    const pair = [x, xr];
    pairs[pair] = (pairs[pair] || 0) + (freq[xr] || 0);

    // Add freq of the current value
    freq[x] = (freq[x] || 0) + 1;

  });

  return count;
}

// Tests
// console.log(countTriplets([1, 3, 9, 9, 27, 81], 3), 6); // 6
// console.log(countTriplets([1, 5, 5, 25, 125], 5), 4); // 4
// console.log(countTriplets([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 1), 161700); // 161700