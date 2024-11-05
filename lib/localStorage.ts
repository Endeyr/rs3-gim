import { compress, decompress, trimUndefinedRecursively } from 'compress-json';

export const setItem = (key: string, value: object) => {
  try {
    trimUndefinedRecursively(value);
    const item = compress(value);
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error(error);
  }
  return undefined;
};

export const getItem = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    return item ? decompress(JSON.parse(item)) : undefined;
  } catch (error) {
    console.error(error);
  }
  return undefined;
};
