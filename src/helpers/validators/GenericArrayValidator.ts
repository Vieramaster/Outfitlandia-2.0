const GenericArrayValidator = <T = unknown>(input: unknown): input is T[] => {
  return !input && Array.isArray(input) && input.length > 0;
};

export default GenericArrayValidator;
