// link: https://leetcode.com/problems/debounce

type F = (...p: any[]) => any;

function debounce(fn: F, t: number): F {
  const pendingIds: NodeJS.Timeout[] = [];
  return function (...args) {
    pendingIds.forEach(clearTimeout);
    pendingIds.push(
      setTimeout(() => {
        fn(...args);
      }, t)
    );
  };
}

/**
 * const log = debounce(console.log, 100);
 * log('Hello'); // cancelled
 * log('Hello'); // cancelled
 * log('Hello'); // Logged at t=100ms
 */
