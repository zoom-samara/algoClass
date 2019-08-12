/*

QUEUE

Abstract data type
FIFO - First in, first out
Collection of elements with enqueue and dequeue operations.
Note that there is a natural order. Elements are removed in the reverse order of their addition.

DO NOT use an array and the native push/shift method in your implementation. Use an object as the underlying data structure.


*** Operations:

myQueue.enqueue(value)
=> count of queue
add value to collection

myQueue.dequeue()
=> oldest element added collection
Remove item so that it is no longer in collection

myQueue.peek()
=> oldest element added collection
Similiar to dequeue, but do not remove element from collection

myQueue.count()
=> number of elements in queue


*** Additional Exercises:

Modify your queue to take a max capacity and return a string if you try to add an element when there's no more room:
myQueue.enqueue(value)
=> "Max capacity already reached. Remove element before adding a new one."

Create a contains method to check if a value is in the queue:
myQueue.contains('findme')
=> true/false
What's the time complexity?

Create an until method to get the number of dequeues until you get to a certain value:
queue values - (first)2-5-7-3-6-9(last)
myQueue.until(7)
=> 3
What's the time complexity?
*/

function Queue(capacity) {
  this.capacity = capacity || Infinity;
  this.collection = {};
  this._count = 0;
}

Queue.prototype.enqueue = function(value) {
  if (this._count >= this.capacity)
    return "Max capacity already reached. Remove element before adding a new one.";

  this.collection[this._count++] = value;

  return this.collection;
};

Queue.prototype.dequeue = function() {
  let first = this.collection[0];
  delete this.collection[0];
  this._count--;

  for (let i in this.collection) {
    this.collection[i - 1] = this.collection[i];
    delete this.collection[i];
  }

  return first;
};

Queue.prototype.contains = function(value) {
  let result = false;
  for (let i in this.collection) {
    if (this.collection[i] === value) {
      result = true;
      break;
    }
  }

  return result;
};

Queue.prototype.peek = function() {
  return this.collection[this._count - 1];
};

Queue.prototype.count = function() {
  return this._count;
};

const myQueue = new Queue(3);

console.log(myQueue.enqueue("Hello1"));
console.log(myQueue.contains("Hello1"));
console.log(myQueue.enqueue("Hello2"));
console.log(myQueue.contains("Hello3"));
console.log(myQueue.enqueue("Hello3"));
console.log(myQueue.dequeue());
console.log(myQueue.enqueue("Hello4"));
console.log(myQueue.dequeue());
console.log(myQueue);
console.log(myQueue.count());
console.log(myQueue.peek());



/*
*** Exercises:

1. Implement a queue using two stacks.

2. Implement a double-ended queue, with the following methods: enqueueLeft, dequeueLeft, enqueueRight, dequeueRight.

3. Given a tree, print out the value of each node in breadth-first order using a queue data structure.


 */
