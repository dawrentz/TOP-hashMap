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
    //can't declare bucket because updates only affect the local variable, need update array directly
    // let bucket = this.hashMap[hashCode];
    const hashCode = this.hash(key);

    //need check for grow buckets!!!!!!!

    if (!this.hashMap[hashCode]) {
      this.hashMap[hashCode] = new linkedListMod.LinkedList();
    }

    //need check for if value exists then overwrite!!!!!!!!!!

    this.hashMap[hashCode].append({ key, value });
  }

  get(key) {
    const bucket = this.hashMap[this.hash(key)];

    if (!bucket) return null;
    return this.searchLLforValue(bucket, key);
  }

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
console.log("===================== set =====================");
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
const x = test.hashMap;
console.table(x);
// console.log(x[12].at(0));

console.log("===================== clear =====================");
test.clear();
console.log("length: " + test.length());
console.log(test.hashMap);
