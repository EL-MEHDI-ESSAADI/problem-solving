// link: https://leetcode.com/problems/cache-with-time-limit

class TimeLimitedCache {
  store: Map<number, { pairValue: number; timeoutId: NodeJS.Timeout }>;
  constructor() {
    this.store = new Map();
  }

  set(key: number, value: number, duration: number): boolean {
    const storedKeyValue = this.store.get(key);

    // store

    this.store.set(key, {
      pairValue: value,
      timeoutId: setTimeout(() => {
        this.store.delete(key);
      }, duration),
    });

    // timer to clean store after duration
    if (storedKeyValue) clearTimeout(storedKeyValue.timeoutId);

    return !!storedKeyValue;
  }

  get(key: number): number {
    return this.store.get(key)?.pairValue ?? -1;
  }

  count(): number {
    return this.store.size;
  }
}

/**
 * Your TimeLimitedCache object will be instantiated and called as such:
 * var obj = new TimeLimitedCache()
 * obj.set(1, 42, 1000); // false
 * obj.get(1) // 42
 * obj.count() // 1
 */
