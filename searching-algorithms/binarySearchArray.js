/*
BINARY SEARCH ARRAY

*** Description

Given a sorted array and a value, determine if the value is in the array using the binary search (divide and conquer) method.

*** Exercises

Write a function that takes a sorted array and a value and returns the index of the value in the array. Return null if the value is not found in the array. What is the time complexity?

Extra credit: Implement the function both iteratively and recursively.

*/

function binarySearchInteractive(list, item) {
  let min = 0;
  let max = list.length - 1;
  let mid;

  while (min <= max) {
    mid = Math.floor((min + max) / 2); // To separate array at the middle. => Index of array

    if (list[mid] === item) {
      return mid;
    } else {
      if (item > list[mid]) {
        min = mid + 1;
      } else {
        max = mid - 1;
      }
    }
  }

  return -1;
}

function binarySearchRecursive(list, item) {
  if (list.length <= 1) return -1;

  let pivot = Math.floor(list.length / 2);

  const leftPart = list.slice(0, pivot);
  const rightPart = list.slice(pivot);

  if (item === list[pivot]) return pivot;
  if (item > list[pivot]) {
    const result = binarySearchRecursive(rightPart, item);
    return result > 0 ? pivot + result : result;
  }
  if (item < list[pivot]) return binarySearchRecursive(leftPart, item);
}
