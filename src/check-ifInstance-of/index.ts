// link https://leetcode.com/problems/check-if-object-instance-of-class/
var checkIfInstanceOf = function (obj: any, classFunction: any) {
  if (obj === null || obj === undefined || typeof classFunction !== "function") return false;
  return Object(obj) instanceof classFunction;
};

/**
 * checkIfInstanceOf(new Date(), Date); // true
 */
