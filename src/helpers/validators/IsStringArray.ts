export const IsStringArray = (input: unknown): input is string[] => {
  return Array.isArray(input) && input.every((el) => typeof el === "string");
};
