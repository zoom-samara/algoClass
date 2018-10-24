/*
BINARY SEARCH TREES

Abstract data type
A binary search tree is a tree with the additional constraints:
- each node has only two child nodes (node.left and node.right)
- all the values in the left subtree of a node are less than or equal to the value of the node
- all the values in the right subtree of a node are greater than the value of the node

*** Operations:

bsTree.insert(value)
=> bsTree (return for chaining purposes)
Insert value into correct position within tree

bsTree.contains(value)
=> true/false
Return true if value is in tree, false if not

bsTree.traverseDepthFirst_inOrder(callback)
=> undefined
Invoke the callback for every node in a depth-first in-order (visit left branch, then current node, than right branch)
Note: In-Order traversal is most common type for binary trees. For binary search tree, this visits the nodes in ascending order (hence the name).

bsTree.traverseDepthFirst_preOrder(callback)
=> undefined
Invoke the callback for every node in a depth-first pre-order (visits current node before its child nodes)

bsTree.traverseDepthFirst_postOrder(callback)
=> undefined
Invoke the callback for every node in a depth-first post-order (visit the current node after its child nodes)

bsTree.isValid()
=> returns true if BST is a valid BST otherwise returns false. This method is useful for checking your other methods.

bsTree.removeNode(value)
=> node
Remove node from tree.

bsTree.checkIfFull()
=> true/false
A binary tree is full if every node has either zero or two children (no nodes have only one child)

bsTree.checkIfBalanced()
=> true/false
For this exercise, let's say that a tree is balanced if the minimum height and the maximum height differ by no more than 1. The height for a branch is the number of levels below the root.


*** Additional Exercises:
A binary search tree was created by iterating over an array and inserting each element into the tree. Given a binary search tree with no duplicates, how many different arrays would result in the creation of this tree.

*/

function BinarySearchTree(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

BinarySearchTree.prototype.insert = function(value) {
  if (value < this.value) {
    if (!!this.left) {
      this.left.insert(value);
    } else {
      this.left = new BinarySearchTree(value);
    }
  } else if (value > this.value) {
    if (!!this.right) {
      this.right.insert(value);
    } else {
      this.right = new BinarySearchTree(value);
    }
  }

  return this;
};
// Time complexity: O(n)

BinarySearchTree.prototype.contains = function(value) {
  let contains = false;

  if (!!this.left && value < this.value) {
    return this.left.contains(value);
  } else if (!!this.right && value > this.value) {
    return this.right.contains(value);
  } else if (value === this.value) {
    contains = true;
  }
  return contains;
};
// Time complexity: O(n)

BinarySearchTree.prototype.traverseDepthFirst_inOrder = function(fn) {
  // Left, SELF, Right

  if (!!this.left) {
    this.left.traverseDepthFirst_inOrder(fn);
  }

  fn(this.value);

  if (!!this.right) {
    this.right.traverseDepthFirst_inOrder(fn);
  }
};
// Time complexity: O(n)

BinarySearchTree.prototype.traverseDepthFirst_preOrder = function(fn) {
  // SELF, Left, Right

  fn(this.value);

  if (!!this.left) {
    this.left.traverseDepthFirst_preOrder(fn);
  }

  if (!!this.right) {
    this.right.traverseDepthFirst_preOrder(fn);
  }
};
// Time complexity: O(n)

BinarySearchTree.prototype.traverseDepthFirst_postOrder = function(fn) {
  // Left, Right, SELF

  if (!!this.left) {
    this.left.traverseDepthFirst_postOrder(fn);
  }

  if (!!this.right) {
    this.right.traverseDepthFirst_postOrder(fn);
  }

  fn(this.value);
};
// Time complexity: O(n)

BinarySearchTree.prototype.checkIfFull = function() {
  if (!!this.left && !!this.right) {
    return this.left.checkIfFull() && this.right.checkIfFull();
  }

  return !this.left && !this.right;
};
// Time complexity: O(n)

BinarySearchTree.prototype.checkIfBalanced = function() {
  const heights = [];

  var calcDeep = function(node, height) {
    if (!node.left && !node.right) return heights.push(height);

    if (!!node.left) calcDeep(node.left, height + 1);
    if (!!node.right) calcDeep(node.right, height + 1);
  };

  calcDeep(this, 1);
  var min = Math.min(...heights);
  var max = Math.max(...heights);

  return max - min <= 1;
};
// Time complexity: O(n)

BinarySearchTree.prototype.removeNode = function(removeNode) {
  const removedNode = (value, node) => {
    if (value === node.value) return node;

    if (!!node.left && value < node.value) return removedNode(value, node.left);
    if (!!node.right && value > node.value)
      return removedNode(value, node.right);
  };

  const current = removedNode(removeNode, this);

  return current;
};
// Time complexity: O(n)
