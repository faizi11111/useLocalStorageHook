import { useEffect, useState } from "react";

export const useLocalStorage = (key, isJson = true) => {
  if (typeof key !== "string" || key.trim() === "") {
    throw new Error("useLocalStorage: Key must be a non-empty string.");
  }
  const [value, setValue] = useState(() => {
    const storedValue = window.localStorage.getItem(key);
    return storedValue !== null
      ? isJson
        ? JSON.parse(storedValue)
        : storedValue
      : null;
  });

  useEffect(() => {
    window.addEventListener("storage", () => {
      setValue(localStorage.getItem(key));
    });
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [value]);

  const updateLocalStorage = (newValue) => {
    setValue(newValue);
    window.localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, updateLocalStorage];
};
