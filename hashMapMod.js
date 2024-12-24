// hashMapMod.js

import * as linkedListMod from "./linkedListMod.js";

// =================================================== init =================================================== //

console.clear();

// =================================================== Major Functions =================================================== //

export class HashMap {
  //need haspMap array?
  hashMap = [];
  loadFactor = 0.75;
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
    //can't use "bucket" when updating the hashMap because updates only affect the local variable, need update array directly
    //but bucket is usefull in a few spots
    const bucket = this.hashMap[hashCode];

    //test
    console.log("length");
    console.log(this.length());

    //need make bucket a linked list if empty
    if (!this.hashMap[hashCode]) {
      this.hashMap[hashCode] = new linkedListMod.LinkedList();
    }

    // check if key exists, then overwrite
    if (this.has(key)) {
      const indexToChange = this.searchLLforIndex(bucket, key);
      //can't use "bucket", must use this.hashMap[hashCode] to update array
      //use at() with found index because the "bucket" is a linked list
      //first .value is from "value/nextNode", second .value is from "key/value", last "value" ( = value ) is from the set() method arguments
      this.hashMap[hashCode].at(indexToChange).value.value = value;
    }

    //else just append to linkedList in bucket
    else {
      this.hashMap[hashCode].append({ key, value });
    }

    //check for need grow
    if (this.length() > this.loadFactor * this.capacity) {
      const allEntries = this.entries();
      this.clear();
      this.capacity = this.capacity * 2;

      allEntries.forEach((entry) => {
        this.set(entry[0], entry[1]);
      });
    }
  }

  //gets value pair from key input
  get(key) {
    const bucket = this.hashMap[this.hash(key)];

    if (!bucket) return null;
    return this.searchLLforValue(bucket, key);
  }

  //boolean hashmap has key input
  has(key) {
    if (this.get(key) === null) return false;
    return true;
  }

  remove(key) {
    if (!this.has(key)) return false;

    const hashCode = this.hash(key);
    const bucket = this.hashMap[hashCode];
    const indexToDel = this.searchLLforIndex(bucket, key);

    this.hashMap[hashCode].removeAt(indexToDel);
    return true;
  }

  //number of keys in hashMap
  length() {
    let totalLength = 0;

    this.hashMap.forEach((bucket) => {
      totalLength += bucket.size();
    });

    return totalLength;
  }

  clear() {
    this.hashMap = [];
  }

  keys() {
    let allArr = [];

    this.hashMap.forEach((bucket) => {
      const tempArr = this.returnInputInLL(bucket, "key");
      allArr = allArr.concat(tempArr);
    });

    return allArr;
  }

  values() {
    let allArr = [];

    this.hashMap.forEach((bucket) => {
      const tempArr = this.returnInputInLL(bucket, "value");
      allArr = allArr.concat(tempArr);
    });

    return allArr;
  }

  entries() {
    let allArr = [];
    const allKeys = this.keys();
    const allValues = this.values();

    let count = 0;

    //each array comes in the same order
    allKeys.forEach((key) => {
      let tempArr = [key].concat(allValues[count++]);
      allArr.push(tempArr);
    });

    return allArr;
  }

  searchLLforValue(LL, searchValue, index = 0) {
    const bucketSize = LL.size();

    if (index > bucketSize - 1) return null;
    if (LL.at(index).value.key === searchValue) return LL.at(index).value.value;
    return this.searchLLforValue(LL, searchValue, ++index);
  }

  searchLLforIndex(LL, searchValue, index = 0) {
    if (LL.at(index).value.key === searchValue) return index;
    return this.searchLLforIndex(LL, searchValue, ++index);
  }

  returnInputInLL(LL, inputVal, index = 0) {
    const bucketSize = LL.size();

    if (index > bucketSize - 1) return [];
    // if (LL.at(index).value.key === searchValue) return LL.at(index).value.value;
    // return this.searchLLforValue(LL, searchValue, ++index);

    return [LL.at(index).value[inputVal]].concat(
      this.returnInputInLL(LL, inputVal, ++index)
    );
  }
}

// =================================================== testing =================================================== //

const test = new HashMap(); // or HashMap() if using a factory

console.log(
  "========================================== NEW =========================================="
);
//placed at top to ensure empty bucket test
console.log("===================== get =====================");
console.log("waffles");
console.log(test.get("waffles"));
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
test.set("lion", "golden");
test.set("kite", "purple");
test.set("kite", "maroon");

console.log("===================== get =====================");
console.log("lion");
console.log(test.get("lion"));
console.log("lions");
console.log(test.get("lions"));

console.log("===================== has =====================");
console.log("hat");
console.log(test.has("hat"));
console.log("hats");
console.log(test.has("hats"));

console.log("===================== remove =====================");
console.log("lion");
console.log(test.remove("lion"));
console.log(test.hashMap);

console.log("===================== length =====================");
console.log(test.length());

console.log("===================== keys =====================");
console.log(test.keys());

console.log("===================== values =====================");
console.log(test.values());

console.log("===================== entries =====================");
console.table(test.entries());

console.log("===================== hashMap =====================");
console.log(test.hashMap);

// console.log("===================== clear =====================");
// test.clear();
// console.log("length: " + test.length());
// console.log(test.hashMap);

console.log("===================== add =====================");
console.log("lion");
test.set("lion", "golden");
console.table(test.entries());

console.log("moon");
test.set("moon", "silver");

test.set("moon1", "silver");
test.set("moon2", "silver");
test.set("moon3", "silver");
test.set("moon4", "silver");
test.set("moon5", "silver");
test.set("moon6", "silver");
test.set("moon7", "silver");
test.set("moon8", "silver");
test.set("moon9", "silver");
test.set("moon10", "silver");
test.set("moon11", "silver");
// test.set("moon12", "silver");
// test.set("moon13", "silver");
// test.set("moon14", "silver");
// test.set("moon15", "silver");
// test.set("moon16", "silver");
// test.set("moon17", "silver");
// test.set("moon18", "silver");
// test.set("moon19", "silver");
// test.set("moon20", "silver");
// test.set("moon21", "silver");
// test.set("moon22", "silver");

console.table(test.entries());
console.log(test.hashMap);
