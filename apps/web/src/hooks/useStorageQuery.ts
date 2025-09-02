import { useState } from 'react';
import { safeParse } from '../helpers/common';

const useSessionStorage = <T>(keyName: string, defaultValue?: T) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.sessionStorage.getItem(keyName);
      if (value) {
        const parsed = JSON.parse(value);
        return parsed;
      }
      if (defaultValue) {
        window.sessionStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      console.log('err', err);
      return defaultValue;
    }
  });

  const setValue = (newValue: T) => {
    try {
      const stringValue = JSON.stringify(newValue);
      window.sessionStorage.setItem(keyName, stringValue);
    } catch (err) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export default useSessionStorage;
