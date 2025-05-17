import { ERROR_MESSAGE } from "../../data/types/ValidatorResultType";

import {
  ClothesType,
  ColorClothesType,
  colorNameKeys,
  garmentsKeys,
  hexColorKeys,
  RequiredKeys,
  styleKeys,
  titleColorKeys,
  weatherKeys,
} from "../../data/types/ClothesTypes";
import { isNonEmptyArray } from "../genericValidators/isNonEmptyArray";
/************************************************************* * **************************************************************/
export type ValidationIssue = {
  index: number;
  field: keyof ClothesType | keyof ColorClothesType | "root" | "object";
  message: string;
};
export type ValidationResult<T> =
  | { valid: true; value: T }
  | { valid: false; issues: ValidationIssue[]; raw: unknown };

type arrayValidatorType<T> = {
  field: keyof T;
  validate: (value: unknown) => boolean;
};

const arrayObject: arrayValidatorType<ClothesType>[] = [
  {
    field: "id" as const,
    validate: (value: unknown) => validatePrimitive(value, "number"),
  },
  {
    field: "garment" as const,
    validate: (value: unknown) => isOneOf(value, garmentsKeys),
  },
  {
    field: "name" as const,
    validate: (value: unknown) => validatePrimitive(value, "string"),
  },
  {
    field: "image" as const,
    validate: (value: unknown) => validatePrimitive(value, "string"),
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

const arrayObjectColorValidate: arrayValidatorType<ColorClothesType>[] = [
  {
    field: "colorName",
    validate: (value: unknown) => isOneOf(value, colorNameKeys),
  },
  {
    field: "hex",
    validate: (value: unknown) => isOneOf(value, hexColorKeys),
  },
  {
    field: "title",
    validate: (value: unknown) => isOneOf(value, titleColorKeys),
  },
  {
    field: "imageColor",
    validate: (value: unknown) => validatePrimitive(value, "string"),
  },
];

export const validateClothesApiResponse = (
  data: unknown
): ValidationResult<ClothesType[]> => {
  const issues: ValidationIssue[] = [];

  if (!isNonEmptyArray(data)) {
    issues.push(createIssue("root", ERROR_MESSAGE.INVALID_ARRAY));
    return dataValidationResult(data, issues);
  }

  const validItems = data.filter((item, index) =>
    validateCLothesItem(item, index, issues)
  );

  return issues.length > 0
    ? dataValidationResult(data, issues)
    : { valid: true, value: validItems };
};

const validateCLothesItem = (
  itemObject: unknown,
  index: number,
  issues: ValidationIssue[]
): itemObject is ClothesType => {
  if (isPlainObject(itemObject)) {
    issues.push(createIssue("object", ERROR_MESSAGE.INVALID_OBJECT, index));
    return false;
  }
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

const validatePrimitive = (value: unknown, primitive: PropertyKey) =>
  typeof value === primitive;

export const createIssue = (
  field: ValidationIssue["field"],
  message: string,
  index?: number
): ValidationIssue => ({
  field,
  message,
  index: index ?? -1,
});

export const dataValidationResult = (
  raw: unknown,
  issues: ValidationIssue[]
): ValidationResult<never> => ({
  valid: false,
  issues,
  raw,
});
