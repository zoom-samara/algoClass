/*
MERGE SORT

*** Description

Merge sort employs a divide and conquer strategy - merge two sorted subarrays into one sorted array.

Recursive top-down approach:
Recursively break down array into two subarrays and sort them recursively. Subarrays are broken down until they have only 1 element (implying they are sorted).

Iterative bottom-up approach:
Split array into sublists of size 1, merge adjacent sublists into sorted lists, repeat until no more sublists.

*** Exercises

- Implement recursive merge sort (you might want to write a helper function to handle the merge step)
- Implement iterative merge sort
- Identify time complexity

- Modify function to take comparator function. specify default if not provided (check out native Array.sort comparator function for reference)
- Use your comparator function to verify that your sort is stable by taking input: [{value: 15}, {value: 10, order: 1}, {value: 10, order: 2}]

Optimization:
- Refactor your iterative solution to be a natural merge sort. This means that the initial subarrays are naturally occurring sorted sequences. How does this impact time complexity and adaptivity?
ex:
input array: [ 1 2 4 5 9 ]
subarrays for regular merge sort: [ [1], [2], [4], [5], [9] ]
subarrays for natural merge sort: [ [1,2], [4,5], [9] ]

*/

function mergeSorting (input) {
  const start = window.performance.now();
  const result = splitArray(input.slice(0));

  function splitArray(arr) {
    if (arr.length < 2) return arr;

    const leftPart = arr.slice(0, arr.length/2);
    const rightPart = arr.slice(arr.length/2);

    const leftArray = splitArray(leftPart);
    const rightArray = splitArray(rightPart);

    return mergeRoutine(leftArray, rightArray);
  }

  function mergeRoutine(left, right) {
    let arr = [];
    let lIdx = 0;
    let rIdx = 0;

    while (arr.length < (left.length + right.length)) {

      if (left.length === lIdx) {
        arr = arr.concat(right.splice(rIdx))
      } else if (right.length === rIdx) {
        arr = arr.concat(left.splice(lIdx))
      } else if (left[lIdx] > right[rIdx]) {
        arr.push(right[rIdx++])
      } else {
        arr.push(left[lIdx++])
      }

    }

    return arr;
  }


  const finish = window.performance.now();

  return {
    time: `${finish - start} ms`,
    result: result
  }
}
