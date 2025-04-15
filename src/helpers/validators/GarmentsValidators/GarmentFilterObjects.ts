
const
const validateKeys = (array: unknown[]) =>
  array.every(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      "garment" in item &&
      typeof item.garment === "string" &&
      "id" in item &&
      typeof item.id === "number" &&
      "name" in item &&
      typeof item.name === "string" &&
      "image" in item &&
      typeof item.image === "string" &&
      "style" in item &&
      Array.isArray((item as any).style) &&
      (item as any).style.every((s: unknown) => typeof s === "string")
  );
