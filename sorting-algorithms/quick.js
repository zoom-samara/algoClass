/*
QUICK SORT

*** Description

Like merge sort, quick sort employs a divide and conquer strategy.

It has a partitioning step, in which you pick an element (called a pivot) and partition the array so that all smaller elements come before pivot and all larger elements come after. The pivot will be in its final position. Recursively apply this to the subarray of smaller elements and the subarray of larger elements.

*** Exercises

- Write a partition helper function. For choice of pivot, for a basic implementation, we recommend choosing either the first or last element in the subarray. If you need hints, look up the Lumoto partiton scheme. Test this out before moving forward!
- Implement quicksort
- Identify time complexity

- Consider implications for choice of pivot (https://en.wikipedia.org/wiki/Quicksort#Choice_of_pivot)

*** Extra Credit

Variants:
- Implement a multi-pivot quicksort (ex: partition into 3 subarrays using 2 pivots)

*/

function quickSorting (input) {
  const start = window.performance.now();
  const result = quickSort(input.slice(0));

  function swap (arr, a1, a2) {
    if (arr[a1] === arr[a2]) return;

    const temp = arr[a1];
    arr[a1] = arr[a2];
    arr[a2] = temp;

    return arr;
  }

  function partition (arr, lo, hi) {
    let pivotLoc = lo;
    let pivot = arr[hi]; // marker

    for (let i = lo; i < hi; i++) {
      if (arr[i] <= pivot) {
        swap(arr, pivotLoc++, i);
      }
    }

    swap(arr, pivotLoc, hi);
    return pivotLoc;
  }

  function quickSort(arr, lo = 0, hi = arr.length - 1) {
    if (lo < hi) {
      const p = partition(arr, lo, hi);
      quickSort(arr, lo, p-1);
      quickSort(arr, p+1, hi);
    }

    if (hi - lo === arr.length - 1) return arr;
  }

  const finish = window.performance.now();

  return {
    time: `${finish - start} ms`,
    result: result
  }
}
