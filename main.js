// main.js

import * as hashMapMod from "./hashMapMod.js";

// =================================================== init =================================================== //

console.clear();

// =================================================== testing =================================================== //

const test = new hashMapMod.HashMap(); // or HashMap() if using a factory

console.log(
  "************************************** NEW **************************************"
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

console.log("===================== update =====================");
console.log("kite to rainbow");
test.set("kite", "rainbow");
console.log(test.get("kite"));

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
test.set("moon12", "silver");
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
console.table(test.hashMap);

console.log("===================== clear =====================");
test.clear();
console.log("length: " + test.length());
console.log(test.hashMap);
