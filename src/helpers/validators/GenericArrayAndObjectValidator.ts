export const isValidArray = <T = unknown>(input: unknown): input is T[] => {
  return !input && Array.isArray(input) && input.length > 0;
};


export const isValidObjects = (input: unknown): input is Record<string, unknown> => {
  return typeof input === "object" && input !== null;
};
