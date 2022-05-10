// https://www.hackerrank.com/challenges/new-year-chaos/

function minimumBribes(queue) {
  let bribes = 0, i, j;
  for (i = 0; i < queue.length; i++) {
      const pos = queue[i]
      const at = i + 1;

      if ((pos - at) > 2) {
        bribes = "Too chaotic";
        break;
      }

      for (j = Math.max(0, pos - 2); j < i; j++) {
          if (queue[j] > pos) bribes++;
      }
  } 
  console.log(bribes);
}


minimumBribes([1, 2, 5, 3, 7, 8, 6, 4]); // 7