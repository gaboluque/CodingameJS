// https://www.hackerrank.com/challenges/frequency-queries/


/* We will be using 3 data structures - 
 * - 1 hash to store the frequencies of each number that has appeared
 * - 1 array to store the frequencies of each frequency (E.j 2 numbers have frequency of 2)
 * - 1 array to store the actual answer we are going to return
 * 
 * Using the extra array for frequencies, we can prevent the iteration of the complete hash array 
 * each time to look for the desired frequency.
 * Sometimes storing data can be faster than computing it each time.
**/

// Complete the freqQuery function below.
function freqQuery(queries) {
  const hash = {};
  const freq = [];
  const ans = [];
  
  queries.forEach(([action, val]) => {
    if(action === 1) {
      // Add to hash
      hash[val] = hash[val] ? hash[val] + 1 : 1;
      
      // Update freq table
      freq[hash[val]] = freq[hash[val]] ? freq[hash[val]] + 1 : 1;
      freq[hash[val] - 1] = freq[hash[val] - 1] ? freq[hash[val] - 1] - 1 : 0;
    }
    if(action === 2 && hash[val] > 0) {
      // Remove from hash
      hash[val] = hash[val] - 1;
      
      // Update frequency table
      freq[hash[val]] = freq[hash[val]] ? freq[hash[val]] + 1 : 1;
      freq[hash[val] + 1] = freq[hash[val] + 1] ? freq[hash[val] + 1] - 1 : 0;
    }
    if(action === 3) {
      ans.push(freq[val] > 0 ? 1 : 0);
    }
    
    // console.error({ action, val, hash, freq, ans });

  });
  
  return ans;
}