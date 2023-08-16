// link: https://leetcode.com/problems/memoize

type Fn = (...params: any) => any;

function memoize(fn: Fn): Fn {
  const cache = new Map();

  return function (...args: number[]) {
    const argsString = args.toString();

    const result = cache.get(argsString) ?? fn(...args);

    if (!cache.has(argsString)) cache.set(argsString, result);

    return result;
  };
}

/**
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1
 */
