import { useState, useEffect, useRef } from "react";

const getStoredValue = (key, initialValue) => {
  const storedValue = localStorage.getItem(key);
  return storedValue !== null ? JSON.parse(storedValue) : initialValue;
};

const useLocalStorage = (key, initialValue) => {
  const isInitialized = useRef(false);

  const [value, setValue] = useState(() => getStoredValue(key, initialValue));

  const setStoredValue = (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
    window.dispatchEvent(
      new CustomEvent("localStorageChange", { detail: { key, newValue } }),
    );
  };

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      return;
    }
    setValue(getStoredValue(key, initialValue));
  }, [key]);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedValue = localStorage.getItem(key);
      setValue(storedValue !== null ? JSON.parse(storedValue) : initialValue);
    };

    const handleCustomEvent = (event) => {
      if (event.detail.key === key) {
        setValue(event.detail.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("localStorageChange", handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localStorageChange", handleCustomEvent);
    };
  }, [key, initialValue]);

  return [value, setStoredValue];
};

export default useLocalStorage;
