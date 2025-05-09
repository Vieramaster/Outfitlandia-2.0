// TYPES & MESSAGES
import {
  garmentsKeys,
  styleKeys,
  weatherKeys,
  ClothesType,
} from "../../data/types/ClothesTypes";
import {
  ValidationResult,
  ValidationIssue,
  ERROR_MESSAGE,
} from "../../data/types/ValidatorResultType";

// VALIDATORS
import { isNonEmptyArray } from "../genericValidators/isNonEmptyArray";
import { isObjectWithRequiredKeys } from "../genericValidators/isObjectWithRequiredKeys";
import { isOneOf } from "../genericValidators/isOneOf";



export const validateClothesApiResponse = (
  data: unknown
): ValidationResult<ClothesType[]> => {
  const issues: ValidationIssue[] = [];

  if (!isNonEmptyArray(data)) {
    issues.push(createIssue("root", ERROR_MESSAGE.INVALID_ARRAY));
    return validationResult(data, issues);
  }

  const validItems = data.filter((item, index) => {
    validateClothesItems(item, index, issues);
  });
  return issues.length > 0
    ? validationResult(data, issues)
    : { valid: true, value: validItems };
};

const requiredClothesKeys = [
  "id",
  "garment",
  "name",
  "image",
  "style",
  "weather",
  "colors",
] as const;

const validateClothesItems = (
  item: unknown,
  index: number,
  issues: ValidationIssue[]
): boolean => {
  if (!isObjectWithRequiredKeys(item, requiredClothesKeys)) {
    issues.push(createIssue("keys", ERROR_MESSAGE.INVALID_OBJECT, index));
    return false;
  }
  const { id, garment, name, image, style, weather, colors } = item;

  const hasValidPrimitives =
    typeof id === "number" &&
    typeof name === "string" &&
    typeof image === "string";

  const hasValidLiterals =
    isOneOf(garment, garmentsKeys) &&
    isOneOf(style, styleKeys) &&
    isOneOf(weather, weatherKeys);

  if (!hasValidPrimitives || !hasValidLiterals) {
    issues.push(createIssue(field, ERROR_MESSAGE.INVALID_KEYS_VALUE, index));
    return false;
  }

  return true;
};

/* ------------------------ Internal helpers ------------------------ */

const createIssue = (
  field: ValidationIssue["field"],
  message: string,
  index?: number
): ValidationIssue => ({
  field,
  message,
  index: index ?? -1,
});

const validationResult = (
  raw: unknown,
  issues: ValidationIssue[]
): ValidationResult<never> => ({
  valid: false,
  issues,
  raw,
});
type ClothesField = typeof ClothesType[number]
const validateField = (
  item: Record<string, unknown>,
  field: ClothesField,
  type: string,
  index: number,
  issues: ValidationIssue[]
): boolean => {
  if (typeof item[field] !== type) {
    issues.push(createIssue(
      field,
      `${ERROR_MESSAGE.INVALID_KEYS_VALUE}: ${field}`,
      index
    ));
    return false;
  }
  return true;
};

const validateEnumField = (
  item: Record<string, unknown>,
  field: ClothesField,
  validValues: readonly string[],
  index: number,
  issues: ValidationIssue[]
): boolean => {
  if (!validValues.includes(item[field] as string)) {
    issues.push(createIssue(
      field,
      `${ERROR_MESSAGE.INVALID_KEYS_VALUE}: ${field}`,
      index
    ));
    return false;
  }
  return true;
};