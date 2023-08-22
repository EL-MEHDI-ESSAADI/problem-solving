// link:https://leetcode.com/problems/memoize-ii

type Fn = (...params: any[]) => any;

function memoize(fn: Fn): Fn {
  // The symbol used for unique memoized results.
  const RES = Symbol();

  const globalCache = new Map<any, Map<any, any>>();

  return (...params: any[]) => {
    let currentCache = globalCache;

    // Traverse the cache hierarchy based on the provided parameters.
    for (const param of params) {
      if (!currentCache.has(param)) {
        currentCache.set(param, new Map<any, any>());
      }
      currentCache = currentCache.get(param)!;
    }

    if (currentCache.has(RES)) return currentCache.get(RES);

    const result = fn(...params);

    currentCache.set(RES, result);
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
