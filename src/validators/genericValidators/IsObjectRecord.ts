const IsObjectRecord = (obj: unknown): obj is object => {
  return typeof obj === "object" && obj !== null && !Array.isArray(obj);
};

export default IsObjectRecord;
