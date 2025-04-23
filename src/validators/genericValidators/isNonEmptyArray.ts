 const isNonEmptyArray = (array: unknown): array is unknown[] => {
    return Array.isArray(array) && array.length > 0;
  }
  
  export default isNonEmptyArray