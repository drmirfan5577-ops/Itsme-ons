import { useState, useCallback, useEffect } from 'react';

function readValue<T>(key: string, initialValue: T): T {
  try {
    const item = window.localStorage.getItem(key);
    if (!item) return initialValue;
    const parsed = JSON.parse(item);
    // Discard stored data whose shape no longer matches (e.g. from an older version)
    if (Array.isArray(initialValue) !== Array.isArray(parsed) || typeof parsed !== typeof initialValue || parsed === null) {
      window.localStorage.removeItem(key);
      return initialValue;
    }
    return parsed as T;
  } catch {
    return initialValue;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => readValue(key, initialValue));

  // Functional updates always see the latest state, so back-to-back updates aren't lost
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    setStoredValue((prev) => (value instanceof Function ? value(prev) : value));
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('localStorage error:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
}
