const IsValidKeys = (arrayKeys: string[], item: Record<string, unknown>): boolean => {
    return arrayKeys.every((key) => key in item);
  };
  export default IsValidKeys;
  