// lib/favoriteRateLimiter.ts
const MAX_API_CALLS_PER_MINUTE = 10;
const DEBOUNCE_DELAY = 300; // ms

let apiCallCount = 0;
let lastResetTime = Date.now();

// Store timeouts per item ID for debouncing
const debounceTimeouts = new Map<string, NodeJS.Timeout>();

// --- Rate Limiting ---
export const canMakeApiCall = (): boolean => {
  const now = Date.now();
  if (now - lastResetTime >= 60_000) {
    // Reset counter after 1 minute
    apiCallCount = 0;
    lastResetTime = now;
  }
  return apiCallCount < MAX_API_CALLS_PER_MINUTE;
};

export const incrementApiCallCount = () => {
  apiCallCount += 1;
};

export const decrementApiCallCount = () => {
  apiCallCount = Math.max(0, apiCallCount - 1);
};

// --- Debouncing ---
export const setDebounceTimeout = (id: string, callback: () => void) => {
  if (debounceTimeouts.has(id)) {
    clearTimeout(debounceTimeouts.get(id)!);
  }
  const timeout = setTimeout(() => {
    debounceTimeouts.delete(id);
    callback();
  }, DEBOUNCE_DELAY);
  debounceTimeouts.set(id, timeout);
};

export const clearDebounceTimeout = (id: string) => {
  if (debounceTimeouts.has(id)) {
    clearTimeout(debounceTimeouts.get(id)!);
    debounceTimeouts.delete(id);
  }
};

// Optional: call this on logout or app reset
export const resetAll = () => {
  apiCallCount = 0;
  lastResetTime = Date.now();
  debounceTimeouts.forEach(clearTimeout);
  debounceTimeouts.clear();
};