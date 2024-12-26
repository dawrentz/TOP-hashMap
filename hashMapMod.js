// hashMapMod.js

import * as linkedListMod from "./linkedListMod.js";

// =================================================== notes =================================================== //

//the hasSet extra credit seems easier than what's already been done. Pass.

// =================================================== init =================================================== //

// =================================================== Major Functions =================================================== //

export class HashMap {
  hashMap = [];
  loadFactor = 0.75;
  capacity = 16;

  //from TOP
  //encodes data for even distribution
  hash(key) {
    let hashCode = 0;

    //31 is prime and odd, which supposedly reduces collisions
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      //use % on each iternation to avoid too large hashCode on long strings
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const hashCode = this.hash(key);
    //can't use "bucket" when need to update the hashMap directly ("bucket is local variable only")
    //but bucket is useful in a few spots (like finding indices)
    const bucket = this.hashMap[hashCode];

    //need make bucket a linked list if empty
    if (!bucket) {
      //updating hashMap directly
      this.hashMap[hashCode] = new linkedListMod.LinkedList();
    }

    //check: if key exists, then overwrite
    if (this.has(key)) {
      const indexToChange = this.searchLLforIndex(bucket, key);
      //updating hashMap directly
      //at() comes from the bucket now being a linked list (see linkedListMod.js)
      //first .value is from "value/nextNode", second .value is from "key/value", last "value" ( = value ) is from the this.set() method arguments
      this.hashMap[hashCode].at(indexToChange).value.value = value;
    }

    //else just append new data to linkedList in bucket
    else {
      this.hashMap[hashCode].append({ key, value });
    }

    //check: if need grow, grow
    this.growBuckets();
  }

  //gets value pair from key input
  get(key) {
    const bucket = this.hashMap[this.hash(key)];

    if (!bucket) return null;
    return this.searchLLforValue(bucket, key);
  }

  //boolean: hashmap has key input
  has(key) {
    if (this.get(key) === null) return false;
    return true;
  }

  remove(key) {
    if (!this.has(key)) return false;

    const hashCode = this.hash(key);
    const bucket = this.hashMap[hashCode];
    const indexToDel = this.searchLLforIndex(bucket, key);

    //update hashMap directly
    this.hashMap[hashCode].removeAt(indexToDel);
    return true;
  }

  //number of keys in hashMap
  length() {
    let totalLength = 0;

    this.hashMap.forEach((bucket) => {
      //if bucket is not a LL yet, if empty
      if (!bucket) return;
      else totalLength += bucket.size();
    });

    return totalLength;
  }

  clear() {
    this.hashMap = [];
  }

  keys() {
    return this.returnInputFromAllLL("key");
  }

  values() {
    return this.returnInputFromAllLL("value");
  }

  entries() {
    let allArr = [];
    const allKeys = this.keys();
    const allValues = this.values();

    let index = 0;

    //each array comes in the same order
    allKeys.forEach((key) => {
      let tempArr = [key].concat(allValues[index++]);
      allArr.push(tempArr);
    });

    return allArr;
  }

  //could combine searchLLforValue() with searchLLforIndex() but would need to pass another parameter to choose what to return. Meh...
  searchLLforValue(LL, searchValue, index = 0) {
    const bucketSize = LL.size();

    //adjust bucketSize (index starts at zero)
    if (index > bucketSize - 1) return null;
    //first .value is from the LL's value/nextNode
    if (LL.at(index).value.key === searchValue) return LL.at(index).value.value;
    return this.searchLLforValue(LL, searchValue, ++index);
  }

  searchLLforIndex(LL, searchValue, index = 0) {
    //no need check if searchValue exists (outer functions call has() before this)
    if (LL.at(index).value.key === searchValue) return index;
    return this.searchLLforIndex(LL, searchValue, ++index);
  }

  returnInputInLL(LL, inputVal, index = 0) {
    const bucketSize = LL.size();

    if (index > bucketSize - 1) return [];

    return [LL.at(index).value[inputVal]].concat(
      this.returnInputInLL(LL, inputVal, ++index)
    );
  }

  returnInputFromAllLL(typeValue) {
    let allArr = [];

    this.hashMap.forEach((bucket) => {
      //if bucket is not a LL yet, if empty
      if (!bucket) return;
      else {
        const tempArr = this.returnInputInLL(bucket, typeValue);
        allArr = allArr.concat(tempArr);
      }
    });

    return allArr;
  }

  growBuckets() {
    //once # of intries exceeds limit, double the buckets
    if (this.length() > this.loadFactor * this.capacity) {
      //grab current entries, wipe hashMap, double the size, and rebuild all
      const allEntries = this.entries();
      this.clear();
      this.capacity = this.capacity * 2;

      allEntries.forEach((entry) => {
        this.set(entry[0], entry[1]);
      });
    }
  }
}

// =================================================== testing =================================================== //
