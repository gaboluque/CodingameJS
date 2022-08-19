// https://www.hackerrank.com/challenges/ctci-merge-sort


/*
  We will use the merge sort algorithm to sort the array.
  The key element is to understand that we are not asked the minimum number of inversions,
  but the number of inversions that would result if the array was sorted.
 */
function countInversions(arr) {
  // Write your code here
  let count = 0;

  mergeSort(arr);

  function mergeSort(arr) {
    // If the array has one val, return it
    if (arr.length <= 1) return arr

    // We recursively get the mergeSort of each half of the array
    let midpoint = Math.floor(arr.length / 2)
    let left = mergeSort(arr.slice(0, midpoint));
    let right = mergeSort(arr.slice(midpoint));

    return mergeArray(left, right);
  }

  function mergeArray(arr1, arr2) {
    let res = [], i = 0, j = 0;

    // For each element in both arrays, check which is smaller to add to the
    // Resultant array
    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] > arr2[j]) {
        count += 1;

        // This is the key
        // We get the additional steps the element had to move
        // to get to the correct position
        count += (arr1.length - (i + 1));

        res.push(arr2[j]);
        j++;
      } else {
        res.push(arr1[i]);
        i++;
      }
    }

    // Add the remaining elements to the final array
    while (i < arr1.length) {
      res.push(arr1[i]);
      i++;
    }
    while (j < arr2.length) {
      res.push(arr2[j]);
      j++;
    }
    return res;
  }

  return count;
}