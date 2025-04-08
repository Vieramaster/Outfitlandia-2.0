
/**
 * @param array - The array to select a random element from.
 * @template T - The type of elements in the array.
 * @returns A random element from the array or undefined if the array is empty.
 */
const GetRandomElement = <T>(array: T[]): T | undefined => {
  if (array.length === 0) return;
  return array[Math.floor(Math.random() * array.length)];
};

export default GetRandomElement;

