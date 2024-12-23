// linkedListMod.js

// ====================================== init ====================================== //

// ====================================== Major Functions ====================================== //

//factory function for nodes
//move this to own Mod? nah...
function Node(value = null, nextNode = null) {
  return {
    value,
    nextNode,
  };
}

//Issue: project asks for functions with one parameter (ex: "at(index) returns the node at the given index")
//  but without a way to pass the node into the function, recursion won't work?

//Solution: pass node as the second parameter with the default set to this.listHead as needed
//  This allows to only "at(index)" to be called

//Idea: could wrap at(index) around another function that passes an additional node parameter, but that seems redundant and dumb, but maybe that's a standard practice?
//Idea: could solve all iteratively *barf*

//linked list maker
export class LinkedList {
  //init list with null listHead
  //"this.head" is taken by the head() method
  constructor() {
    this.listHead = null;
  }

  //create new node and make last in list
  append(value) {
    const newNode = Node(value);

    //if empty list, newNode becomes the head
    if (this.listHead === null) this.listHead = newNode;
    // else current tail now points to newNode (appended to list)
    else this.tail().nextNode = newNode;
  }

  //create new node and make first
  prepend(value) {
    //newNode points to current listHead and update newNode to listHead (prepend to list)
    //if empty list, new head just points to "null" like it should
    const newNode = Node(value, this.listHead);
    this.listHead = newNode;
  }

  //returns number of nodes in linked list
  size(node = this.listHead) {
    //base case: no list
    if (node === null) return 0;
    //base case: if last node
    if (node.nextNode === null) return 1;
    //else add 1 and run again
    return 1 + this.size(node.nextNode);
  }

  head() {
    return this.listHead;
  }

  tail() {
    //if empty list, return head (null)
    if (this.listHead === null) return this.listHead;
    //tail is the node at index of (size() - 1)
    //could also search for which node points to null
    return this.at(this.size() - 1);
  }

  //first index is zero
  at(index, node = this.listHead) {
    //error handling
    const maxIndex = this.size() - 1;
    if (index > maxIndex || index < 0 || !Number.isInteger(index)) {
      return `Must input number between 0 and ${maxIndex}`;
    }
    //base case
    if (index === 0) return node;

    //search starts at head (default) and uses the user index-input as the number of moves to make, landing on desired node
    return this.at(index - 1, node.nextNode);
  }

  //removes tail
  pop() {
    //newTail is the node at index of (size() - 2)
    const newTail = this.at(this.size() - 2);
    //tail is whatever points to null
    newTail.nextNode = null;
  }

  //only checks if value is in list
  contains(searchValue) {
    //DRY it up a bit
    if (this.find(searchValue) === "Value not found") return false;
    else return true;
  }

  //return index of value if found
  find(searchValue, index = 0) {
    //base case: reach the end of list
    const maxIndex = this.size() - 1;
    if (index > maxIndex) return "Value not found";
    //base case: found it
    if (this.at(index).value === searchValue) return index;
    //else search again
    return this.find(searchValue, ++index);
  }

  //list out all formatted values
  toString(node = this.listHead) {
    if (node.nextNode === null) {
      return `( ${node.value} ) -> null`;
    }
    return `( ${node.value} )`.concat(` -> ${this.toString(node.nextNode)}`);
  }

  //node at index is shifted right, update leftNode pointer and newNode pointer
  insertAt(value, index) {
    const newNode = Node(value);
    const leftNode = this.at(index - 1);
    const newRightNode = this.at(index);

    leftNode.nextNode = newNode;
    newNode.nextNode = newRightNode;
  }

  //node at index is unlinked, update leftNode pointer
  removeAt(index) {
    const leftNode = this.at(index - 1);
    const rightNode = this.at(index + 1);

    leftNode.nextNode = rightNode;
  }
}
