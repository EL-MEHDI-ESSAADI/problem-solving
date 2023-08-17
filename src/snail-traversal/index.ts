// link: https://leetcode.com/problems/snail-traversal

declare global {
  interface Array<T> {
    snail(rowsCount: number, colsCount: number): number[][];
  }
}

Array.prototype.snail = function (rowsCount: number, colsCount: number): number[][] {
  if (rowsCount * colsCount !== this.length) return [];

  const snailArray = [];

  for (let currentRow = 0; currentRow < rowsCount; currentRow++) snailArray.push([]);

  for (let currentCol = 1; currentCol <= colsCount; currentCol++) {
    const indexOfEndValue = currentCol * rowsCount;
    const indexOfStartValue = indexOfEndValue - rowsCount;
    const isPairCol = currentCol % 2 === 0;
    let targetRow = isPairCol ? rowsCount - 1 : 0;

    for (let indexOfCurrentValue = indexOfStartValue; indexOfCurrentValue < indexOfEndValue; indexOfCurrentValue++) {
      snailArray[targetRow].push(this[indexOfCurrentValue]);
      if (isPairCol) targetRow--;
      else targetRow++;
    }
  }

  return snailArray;
};

export {};

/**
 * const arr = [1,2,3,4];
 * arr.snail(1,4); // [[1,2,3,4]]
 */
