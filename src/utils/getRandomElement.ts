import { isNonEmptyArray } from "./validators/isNonEmplyArray";
/**
 * @param array - The array to select a random element from.
 * @template T - The type of elements in the array.
 * @returns A random element from the array or undefined if the array is empty.
 */
export const getRandomElement = <T>(array: T[]): T | undefined => {
  if (!isNonEmptyArray(array)) return;
  return array[Math.floor(Math.random() * array.length)];
};
