// LINK: https://leetcode.com/problems/group-by

declare global {
  interface Array<T> {
    groupBy(fn: (item: T) => string): Record<string, T[]>;
  }
}

Array.prototype.groupBy = function (fn: (arg: any) => string) {
  const result = {};
  this.forEach((value: any) => {
    const key = fn(value);
    result[key] ? result[key].push(value) : (result[key] = [value]);
  });

  return result;
};

export {};

/**
 * [1,2,3].groupBy(String) // {"1":[1],"2":[2],"3":[3]}
 */
