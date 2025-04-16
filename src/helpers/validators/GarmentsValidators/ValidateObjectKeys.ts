import { ClothesProps } from "../../../data/types/ClothesTypes";
import GenericArrayValidator from "../GenericArrayValidator";

/**
 * Verifica si un objeto tiene una propiedad (key) que es un array de strings.
 *
 * @param item - El objeto a validar.
 * @param key - La clave que se espera sea un array de strings.
 * @returns `true` si la clave existe y su valor es un array de strings, de lo contrario `false`.
 */
const isValidStringArrayKey = (
  item: unknown,
  key: keyof Pick<ClothesProps, "style" | "weather">
): boolean => {
  if (typeof item !== "object" || item === null) return false;

  const value = (item as ClothesProps)[key];

  return (
    GenericArrayValidator(value) &&
    value.every((val) => typeof val === "string")
  );
};

const ValidateObjectKeys = (array: unknown[]): boolean => {
  if (!GenericArrayValidator(array)) return false;
  return array.every(
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
      isValidStringArrayKey(item, "style") &&
      isValidStringArrayKey(item, "weather")
  );
};

export default ValidateObjectKeys;
