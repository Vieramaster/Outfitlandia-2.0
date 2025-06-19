//TYPES
import { ArraySchemaType } from "../../../../types/validationApi.types";
//ARRAY_KEYS
import { colorNameKeys } from "../../../../constants/clothesConstants";
//VALIDATORS
import { isNonEmptyArray } from "../../../../utils/validators/isNonEmplyArray";
import { isPlainObject } from "../../../../utils/validators/isPlainObject";
import { isOneOf } from "../../../validators/object_validations/isOneOf";
import { validateStringArray } from "../../../validators/object_validations/validateStringArray";

/**
 * Schema definition for validating top-level properties of a color combination object.
 *
 * Each entry specifies:
 *   - field: the key expected on the object
 *   - validate: a function to verify the runtime type and constraints for that field
 *
 * Intended usage:
 *   This schema is meant to be passed to a generic object validator (e.g. `validateSchemaKeys`),
 *   which ensures:
 *     1. The object contains all expected keys
 *     2. Each value passes its associated validation rule
 *
 * Fields and expected constraints:
 *   - clothes:    must be a plain object (to be validated with COMBINE_COLORS_CLOTHES_SCHEMA)
 *   - shoes:      must be a non-empty array of strings, each included in `colorNameKeys`
 *   - id:         must be a number
 */
export const COMBINE_COLOR_SCHEMA: ArraySchemaType[] = [
  { field: "clothes", validate: (v: unknown) => isPlainObject(v) },
  {
    field: "shoes",
    validate: (v: unknown) =>
      isNonEmptyArray(v) && validateStringArray(v, colorNameKeys),
  },
  { field: "id", validate: (v: unknown) => typeof v === "number" },
];

/**
 * Schema definition for validating the nested `clothes` object
 * inside a color combination.
 *
 * Fields and expected constraints:
 *   - top:      must be a string present in `colorNameKeys`
 *   - coat:     must be a string present in `colorNameKeys`
 *   - pants:    must be a string present in `colorNameKeys`
 */
export const COMBINE_COLORS_CLOTHES_SCHEMA: ArraySchemaType[] = [
  { field: "top", validate: (v: unknown) => isOneOf(v, colorNameKeys) },
  { field: "coat", validate: (v: unknown) => isOneOf(v, colorNameKeys) },
  { field: "pants", validate: (v: unknown) => isOneOf(v, colorNameKeys) },
];
