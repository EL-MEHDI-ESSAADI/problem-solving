/**
 * Accepts a generator object and returns an array of two values: a cancel function and a promise.
 * @param generator A generator object that yields promises.
 * @returns An array of two values: a cancel function and a promise.
 */
function cancellable<T>(
  generator: Generator<Promise<any>, T, unknown>
): [() => void, Promise<T>] {
  let cancel: () => void;
  const cancelPromise = new Promise(
    (_, reject) => (cancel = () => reject("Cancelled"))
  );

  cancelPromise.catch(() => {});

  const promise = (async () => {
    let next = generator.next();
    while (!next.done) {
      try {
        next = generator.next(
          await Promise.race([next.value, cancelPromise])
        );
      } catch (error) {
        next = generator.throw(error);
      }
    }

    return next.value;
  })();

  return [cancel, promise];
}

/**
 * function* tasks() {
 *   const val = yield new Promise(resolve => resolve(2 + 2));
 *   yield new Promise(resolve => setTimeout(resolve, 100));
 *   return val + 1;
 * }
 * const [cancel, promise] = cancellable(tasks());
 * setTimeout(cancel, 50);
 * promise.catch(console.log); // logs "Cancelled" at t=50ms
 */

/**
 * @param {Generator} generator
 * @return {[Function, Promise]}
 */
var cancellable2 = function (generator) {
  var cancel;
  const cancelPromise = new Promise((_, reject) => {
    cancel = () => reject("Cancelled");
  });
  // Every Promise rejection has to be caught.
  cancelPromise.catch(() => {});

  const promise = (async () => {
    let next = generator.next();
    while (!next.done) {
      try {
        next = generator.next(
          await Promise.race([next.value, cancelPromise])
        );
      } catch (e) {
        next = generator.throw(e);
      }
    }
    return next.value;
  })();

  return [cancel, promise];
};

/**
 * function* tasks() {
 *   const val = yield new Promise(resolve => resolve(2 + 2));
 *   yield new Promise(resolve => setTimeout(resolve, 100));
 *   return val + 1;
 * }
 * const [cancel, promise] = cancellable(tasks());
 * setTimeout(cancel, 50);
 * promise.catch(console.log); // logs "Cancelled" at t=50ms
 */
