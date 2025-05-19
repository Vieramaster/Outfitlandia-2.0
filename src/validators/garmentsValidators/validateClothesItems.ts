import { ERROR_MESSAGE } from "../../data/types/ValidatorResultType";

import {
  ClothesType,
  ColorClothesType,
  colorNameKeys,
  garmentsKeys,
  hexColorKeys,
  RequiredMainKeys,
  styleKeys,
  titleColorKeys,
  weatherKeys,
} from "../../data/types/ClothesTypes";
import { isNonEmptyArray } from "../genericValidators/isNonEmptyArray";

//VALIDATORS

export type ValidationResult<T> =
  | { valid: true; value: T }
  | { valid: false; issues: ValidationIssue[]; raw: unknown };

export type ValidationIssue = {
  index: number;
  field: keyof ClothesType | keyof ColorClothesType | "root" | "object";
  message: string;
};

type ArraySChemaType<T> = {
  field: keyof T;
  validate: (value: unknown) => boolean;
};

/************************************************************** MAIN **************************************************************/
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

export const validateCLothesItem = (
  objectItem: unknown,
  index: number,
  issues: ValidationIssue[]
): objectItem is ClothesType => {
  if (!isPlainObject(objectItem)) {
    issues.push(createIssue("object", ERROR_MESSAGE.INVALID_OBJECT, index));
    return false;
  }

  const validKeys = validateAgainstSchema<ClothesType>(
    objectItem,
    RequiredMainKeys,
    CLOTHES_SCHEMA,
    issues,
    index
  );

  if (!validKeys) return false;

  const allColorsValid = objectItem.colors.every((item, index) => {
    validateAgainstSchema<ColorClothesType>(
      item,
      colorNameKeys,
      COLOR_SCHEMA,
      issues,
      index
    );
  });

  if (!allColorsValid) return false;

  return true;
};

/************************************************************** HELPERS **************************************************************/
const validateAgainstSchema = <T extends ClothesType | ColorClothesType>(
  objectItem: Record<string, unknown>,
  arrayKeys: readonly string[],
  schema: ArraySChemaType<T>[],
  issues: ValidationIssue[],
  itemIndex: number
): objectItem is T =>
  schema.every(({ field, validate }): boolean => {
    if (
      !isObjectWithRequiredKeys<T, typeof arrayKeys>(
        objectItem,
        field,
        arrayKeys
      )
    ) {
      issues.push(createIssue(field, ERROR_MESSAGE.INVALID_KEYS, itemIndex));
      return false;
    }

    return true;
  });

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  value !== null &&
  typeof value === "object" &&
  Object.getPrototypeOf(value) === Object.prototype;

export const isOneOf = <T extends readonly string[]>(
  value: unknown,
  allowedValues: T
): value is T[number] =>
  typeof value === "string" && allowedValues.includes(value);

export const isObjectWithRequiredKeys = <
  F extends string,
  const K extends ReadonlyArray<string>
>(
  objectData: Record<string, unknown>,
  field: string,
  requiredKeys: K
): objectData is Record<F, unknown> =>
  typeof field === "string" &&
  Object.prototype.hasOwnProperty.call(objectData, field) &&
  requiredKeys.includes(field);

export const validateStringArray = <T extends readonly string[]>(
  value: unknown,
  allowedValues: T
): value is T[number][] => {
  return (
    Array.isArray(value) && value.every((item) => isOneOf(item, allowedValues))
  );
};

/************************************************************** SCHEMA **************************************************************/
const CLOTHES_SCHEMA: ArraySChemaType<ClothesType>[] = [
  { field: "id", validate: (v) => typeof v === "number" },
  { field: "garment", validate: (v) => isOneOf(v, garmentsKeys) },
  { field: "name", validate: (v) => typeof v === "string" },
  { field: "image", validate: (v) => typeof v === "string" },
  { field: "style", validate: (v) => validateStringArray(v, styleKeys) },
  { field: "weather", validate: (v) => validateStringArray(v, weatherKeys) },
  { field: "colors", validate: (v) => isNonEmptyArray(v) },
];

const COLOR_SCHEMA: ArraySChemaType<ColorClothesType>[] = [
  { field: "colorName", validate: (v) => isOneOf(v, colorNameKeys) },
  { field: "hex", validate: (v) => isOneOf(v, hexColorKeys) },
  { field: "title", validate: (v) => isOneOf(v, titleColorKeys) },
  { field: "imageColor", validate: (v) => typeof v === "string" },
];
/************************************************************** OBJECT ERRORS **************************************************************/
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

/**
 * /**************** 

type MainClothesKey = keyof ClothesType;
type ColorClothesKey = keyof ColorClothesType;
type ValidationField = MainClothesKey | ColorClothesKey | "root" | "object";

export type ValidationResult2<T> = {
  valid: boolean;
  value?: T;
  issues?: ValidationIssue[];
  raw?: unknown;
};

export type ValidationIssue2 = {
  index: number;
  field: ValidationField;
  message: string;
};

type Schema<T> = {
  field: keyof T;
  validate: (value: unknown) => boolean;
};


const MAIN_REQUIRED_KEYS: readonly MainClothesKey[] = [
  "id",
  "garment",
  "name",
  "image",
  "style",
  "weather",
  "colors",
] as const;

const COLOR_REQUIRED_KEYS: readonly ColorClothesKey[] = [
  "colorName",
  "hex",
  "title",
  "imageColor",
] as const;


export const validateClothesApiResponse2 = (
  data: unknown
): ValidationResult<ClothesType[]> => {
  const issues: ValidationIssue[] = [];

  if (!isNonEmptyArray(data)) {
    return validationFailure("root", ERROR_MESSAGE.INVALID_ARRAY, data);
  }

  const validItems = data.filter((item, index) =>
    validateClothesItem(item, index, issues)
  );

  return issues.length > 0
    ? { valid: false, issues, raw: data }
    : { valid: true, value: validItems };
};

const validateClothesItem = (
  item: unknown,
  index: number,
  issues: ValidationIssue[]
): item is ClothesType => {
  if (!isPlainObject(item)) {
    issues.push(
      createValidationIssue("object", ERROR_MESSAGE.INVALID_OBJECT, index)
    );
    return false;
  }

  return (
    validateAgainstSchema(
      item,
      MAIN_REQUIRED_KEYS,
      CLOTHES_SCHEMA,
      issues,
      index
    ) && validateColorArray(item, issues, index)
  );
};


const validateAgainstSchema = <T extends object>(
  obj: Record<string, unknown>,
  requiredKeys: readonly (keyof T)[],
  schema: Schema<T>[],
  issues: ValidationIssue[],
  index: number
): boolean => {
  return schema.every(({ field, validate }) => {
    if (!hasRequiredKeys(obj, requiredKeys)) {
      issues.push(
        createValidationIssue(field, ERROR_MESSAGE.INVALID_OBJECT, index)
      );
      return false;
    }

    const value = obj[field];
    if (!validate(value)) {
      issues.push(
        createValidationIssue(field, ERROR_MESSAGE.INVALID_VALUE, index)
      );
      return false;
    }
    return true;
  });
};

const validateColorArray = (
  colors: unknown,
  issues: ValidationIssue[],
  parentIndex: number
): boolean => {
  if (!isNonEmptyArray(colors)) {
    issues.push(
      createValidationIssue("colors", ERROR_MESSAGE.INVALID_ARRAY, parentIndex)
    );
    return false;
  }

  return colors.every((color, index) =>
    validateAgainstSchema(
      color,
      COLOR_REQUIRED_KEYS,
      COLOR_SCHEMA,
      issues,
      parentIndex
    )
  );
};


const CLOTHES_SCHEMA: Schema<ClothesType>[] = [
  { field: "id", validate: (v) => typeof v === "number" },
  { field: "garment", validate: (v) => isOneOf(v, garmentsKeys) },
  { field: "name", validate: (v) => typeof v === "string" },
  { field: "image", validate: (v) => typeof v === "string" },
  { field: "style", validate: (v) => validateStringArray(v, styleKeys) },
  { field: "weather", validate: (v) => validateStringArray(v, weatherKeys) },
  { field: "colors", validate: (v) => isNonEmptyArray(v) },
];

const COLOR_SCHEMA: Schema<ColorClothesType>[] = [
  { field: "colorName", validate: (v) => isOneOf(v, colorNameKeys) },
  { field: "hex", validate: (v) => isOneOf(v, hexColorKeys) },
  { field: "title", validate: (v) => isOneOf(v, titleColorKeys) },
  { field: "imageColor", validate: (v) => typeof v === "string" },
];


const createValidationIssue = (
  field: ValidationField,
  message: string,
  index: number = -1
): ValidationIssue => ({
  field,
  message,
  index,
});

const validationFailure = (
  field: ValidationField,
  message: string,
  raw: unknown
): ValidationResult<never> => ({
  valid: false,
  issues: [createValidationIssue(field, message)],
  raw,
});

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === "object" && !Array.isArray(value);

const hasRequiredKeys = <T>(obj: object, keys: readonly (keyof T)[]): boolean =>
  keys.every((key) => key in obj);

const isOneOf = <T extends readonly string[]>(
  value: unknown,
  allowedValues: T
): value is T[number] =>
  typeof value === "string" && allowedValues.includes(value);

const validateStringArray = <T extends readonly string[]>(
  value: unknown,
  allowedValues: T
): value is T[number][] =>
  Array.isArray(value) && value.every((item) => isOneOf(item, allowedValues));

 */
