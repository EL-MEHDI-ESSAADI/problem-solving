// link: https://leetcode.com/problems/nested-array-generator

type MultidimensionalArray = (MultidimensionalArray | number)[];

function* inorderTraversal(arr: MultidimensionalArray): Generator<number, void, unknown> {
  const stack: MultidimensionalArray = [arr];

  while (stack.length > 0) {
    const current = stack.pop();
    if (Array.isArray(current)) for (let i = current.length - 1; i >= 0; i--) stack.push(current[i]);
    else yield current;
  }
}

/**
 * const gen = inorderTraversal([1, [2, 3]]);
 * gen.next().value; // 1
 * gen.next().value; // 2
 * gen.next().value; // 3
 */
