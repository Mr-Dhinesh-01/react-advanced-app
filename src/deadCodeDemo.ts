// src/deadCodeDemo.ts — exported but never imported anywhere
export function expensiveUnusedThing() {
  const big = new Array(10000).fill('x').join('-');
  return big.length;
}