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

const REQUIRED_KEYS = [
  {
    field: "id",
    type: "number",
    validateField: (field: unknown, object: Record<string, unknown>): boolean =>
      isObjectWithRequiredKeys(field, object, RequiredKeys) ,
    validateKey: (
      object: Record<GarmentKeyType, unknown>,
      field: GarmentKeyType
    ) => typeof object[field] === "number",
  },
  {
    field: "garment",
    type: "string",
    validateField: (value: unknown, object: Record<string, unknown>) =>
      isOneOf(value, object, RequiredKeys),
    validateKey: (
      object: Record<GarmentKeyType, unknown>,
      field: GarmentKeyType
    ) =>
      typeof object[field] === "string"  && garmentsKeys.includes(object[field])
     
  },

  {
    field: "name",
    type: "string",
    validate: (value: unknown, object: Record<string, unknown>) =>
      isOneOf(value, object, RequiredKeys) && object[value] === "string",
  },
  {
    field: "image",
    type: "string",
    validate: (value: unknown, object: Record<string, unknown>) =>
      typeof value === "string" && value in object,
  },
  {
    field: "style",
    type: "array",
    validate: (value: unknown) =>
      Array.isArray(value) &&
      value.every((item) => typeof item === "string") &&
      isOneOf(value, styleKeys),
  },
  {
    field: "weather",
    type: "array",
    validate: (value: unknown) =>
      Array.isArray(value) &&
      value.every((item) => typeof item === "string") &&
      isOneOf(value, weatherKeys),
  },
  {
    field: "colors",
    type: "array",
    validate: (value: unknown) =>
      Array.isArray(value) &&
      value.every((item) => typeof item === "object" && item !== null),
  },
] as const;

export const validateClothesItems = (
  item: unknown,
  index: number,
  issues: ValidationIssue[]
): boolean => {
  if (!isPlainObject(item)) {
    issues.push(createIssue("object", ERROR_MESSAGE.INVALID_OBJECT, index));
    return false;
  }

  const lala = REQUIRED_KEYS.forEach((element) => {});
  return true;
};

/** */

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  value !== null &&
  typeof value === "object" &&
  Object.getPrototypeOf(value) === Object.prototype;

export const isOneOf = <T extends readonly string[]>(
  field: unknown,
  object: Record<string, unknown>,
  allowedValues: T
): field is T[number] =>
  && allowedValues.includes(field);


export const isObjectWithRequiredKeys = <const K extends ReadonlyArray<string>>(
   field: unknown,
  objectData: Record<string, unknown>,
  requiredKeys: K
): objectData is Record<K[number], unknown> =>
   typeof field === "string" && field in objectData &&
  requiredKeys.every((key) =>
    Object.prototype.hasOwnProperty.call(objectData, key)
  );