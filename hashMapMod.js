// hashMapMod.js

import * as linkedListMod from "./linkedListMod.js";

// =================================================== init =================================================== //

console.clear();

// =================================================== Major Functions =================================================== //

export class HashMap {
  //need haspMap array?
  hashMap = [];
  loadFactor = 0.75;
  //do i rebuild if need grow? as in:
  // "on each set() call, if loadFactor * size > capacity, make copy of hashMap, clear hashMap, update capacity, loop through and run all again"
  capacity = 16;

  //from TOP
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      //use % on each iternation to avoid too large hashCode on long strings
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  //do i rebuild if need grow? as in:
  // "on each set() call, if loadFactor * size > capacity, make copy of hashMap, clear hashMap, update capacity, loop through and run all again"
  set(key, value) {
    const hashCode = this.hash(key);

    //need check for grow buckets!!!!!!!

    let bucket = this.hashMap[hashCode];

    if (!this.hashMap[hashCode]) {
      this.hashMap[hashCode] = new linkedListMod.LinkedList();
    }

    //need check for if value exists then overwrite!!!!!!!!!!

    this.hashMap[hashCode].append({ key, value });

    //test
    return this.hashMap;
  }
}

// =================================================== testing =================================================== //

const test = new HashMap(); // or HashMap() if using a factory

console.log("===================== hash =====================");
console.log("banana");
console.log(test.hash("banana"));
console.log(
  "banananananananananananananananananananananananananananananananana"
);
console.log(
  test.hash(
    "banananananananananananananananananananananananananananananananana"
  )
);
console.log("===================== set =====================");
console.log("apple", "red");
console.log(test.set("apple", "red"));

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
console.log(test.set("lion", "golden"));

console.log("===================== hashMap =====================");
const x = test.hashMap;
console.log(x);
