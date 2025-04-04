const getRandomElement = <T>(array: T[]): T | undefined => {
  if (array.length === 0) return;
  return array[Math.floor(Math.random() * array.length)];
};

export default getRandomElement;

