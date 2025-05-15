import { ValidationIssue } from "../../data/types/ValidatorResultType";
import { ERROR_MESSAGE } from "../../data/types/ValidatorResultType";
import { createIssue } from "../errorManagment";

import {
  StyleType,
  garmentsKeys,
  RequiredKeys,
  styleKeys,
  weatherKeys,
  GarmentType,
  ClothesType,
  GarmentKeyType,
} from "../../data/types/ClothesTypes";

const lala = [
  {
    field: "id" as const,
    validate: (value: unknown) => typeof value === "number",
  },
  {
    field: "garment" as const,
    validate: (value: unknown) => isOneOf(value, garmentsKeys),
  },
  {
    field: "name" as const,
    validate: (value: unknown) => typeof value === "string",
  },
  {
    field: "image" as const,
    validate: (value: unknown) => typeof value === "string",
  },
  {
    field: "style" as const,
    validate: (value: unknown) => validateStringArray(value, styleKeys),
  },
  {
    field: "weather" as const,
    validate: (value: unknown) => validateStringArray(value, weatherKeys),
  },
  {
    field: "colors" as const,
    validate: (value: unknown) => Array.isArray(value) && value.length > 0,
  },
];
export const validateClothesItems = (
  objectItem: unknown,
  index: number,
  issues: ValidationIssue[]
): boolean => {
  if (!isPlainObject(objectItem)) {
    issues.push(createIssue("object", ERROR_MESSAGE.INVALID_OBJECT, index));
    return false;
  }

  const isValidKeys = lala.forEach(({ field, validate }, index): boolean => {
    if (!isObjectWithRequiredKeys(objectItem, field, RequiredKeys)) {
      issues.push(createIssue(field, ERROR_MESSAGE.INVALID_KEYS_VALUE, index));
      return false;
    }
    if (!validate) {
      issues.push(createIssue(field, ERROR_MESSAGE.INVALID_KEYS_VALUE, index));
      return false;
    }
    return true;
  });

  if (!isValidKeys) return false;

  return true;
};

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  value !== null &&
  typeof value === "object" &&
  Object.getPrototypeOf(value) === Object.prototype;

export const isOneOf = <T extends readonly string[]>(
  value: unknown,
  allowedValues: T
): value is T[number] =>
  typeof value === "string" && allowedValues.includes(value);

export const isObjectWithRequiredKeys = <const K extends ReadonlyArray<string>>(
  objectData: Record<string, unknown>,
  field: unknown,
  requiredKeys: K
): objectData is Record<K[number], unknown> =>
  typeof field === "string" &&
  field in objectData &&
  requiredKeys.every((key) =>
    Object.prototype.hasOwnProperty.call(objectData, key)
  );
export const validateStringArray = <T extends readonly string[]>(
  value: unknown,
  allowedValues: T
): value is T[number][] => {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "string" && allowedValues.includes(item as T[number])
    )
  );
};
