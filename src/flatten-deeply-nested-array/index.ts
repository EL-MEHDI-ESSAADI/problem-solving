// link: https://leetcode.com/problems/flatten-deeply-nested-array

type MultiDimensionalArray = (number | MultiDimensionalArray)[];

let flat = function (arr: MultiDimensionalArray, n: number): MultiDimensionalArray {
  if (n === 0) return arr;

  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === "number") result.push(arr[i]);
    else result.push(...flat(arr[i] as MultiDimensionalArray, n - 1));
  }

  return result;
};
