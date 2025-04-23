const HasValidKey = (
  key: string,
  primitive: "string" | "boolean" | "number",
  obj: Record<string, unknown>
) => {
  return key in obj && typeof obj[key] === primitive;
};

export default HasValidKey;
