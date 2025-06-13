// TYPES
import { ArraySchemaType } from "../../../../shared/types/validationApi.types";

// ARRAY_VALIDATORS
import {
  garmentsKeys,
  styleKeys,
  weatherKeys,
  colorNameKeys,
  titleColorKeys,
  hexColorKeys,
} from "../../../../shared/types/clothes/arrayTypes";

// FUNCTIONS
import { isOneOf } from "../../../validators/object_validations/isOneOf";
import { isNonEmptyArray } from "../../../../shared/validators/isNonEmplyArray";
import { validateStringArray } from "../../../validators/object_validations/validateStringArray";

/**
 * Schema definition for validating top-level properties of a Clothing item.
 * Each entry specifies:
 *   - field: the key name expected on the object
 *   - validate: a function that checks at runtime if the value at that key
 *               meets the required shape or constraints.
 *
 * Intended use:
 *   Pass this array into a generic validation function (e.g., validateSchemaKeys)
 *   which will:
 *     1. Check that each field exists on the object
 *     2. Run the corresponding validate(...) function and push a ValidationIssue if it returns false
 *
 * Fields and their expected types/constraints:
 *   - id:       must be a number
 *   - garment:  must be a string present in `garmentKeys`
 *   - name:     must be a string
 *   - image:    must be a string (e.g. URL or filename)
 *   - style:    must be an array of strings, each matching one of styleKeys
 *   - weather:  must be an array of strings, each matching one of weatherKeys
 *   - colors:    Must be a non-empty array (individual elements validated separately using `CLOTHES_COLOR_SCHEMA`)
 */
export const CLOTHES_SCHEMA: ArraySchemaType[] = [
  {
    field: "id",
    validate: (v: unknown) => typeof v === "number",
  },
  {
    field: "garment",
    validate: (v: unknown) => isOneOf(v, garmentsKeys),
  },
  {
    field: "name",
    validate: (v: unknown) => typeof v === "string",
  },
  {
    field: "image",
    validate: (v: unknown) => typeof v === "string",
  },
  {
    field: "style",
    validate: (v: unknown) => validateStringArray(v, styleKeys),
  },
  {
    field: "weather",
    validate: (v: unknown) => validateStringArray(v, weatherKeys),
  },
  {
    field: "colors",
    validate: (v: unknown) => isNonEmptyArray(v),
  },
] as const;

/**
 * Schema definition for validating properties of a single color entry
 * within a Clothing item’s colors array.
 *
 * Each entry here corresponds to a key in the ColorClothesType object.
 *
 * Fields and their expected constraints:
 *   - colorName: must be one of colorNameKeys
 *   - hex:       must be one of hexColorKeys
 *   - title:     must be one of titleColorKeys
 *   - imageColor: must be a string (e.g., URL or filename representing that color)
 */
export const CLOTHES_COLOR_SCHEMA: ArraySchemaType[] = [
  {
    field: "colorName",
    validate: (v: unknown): v is string => isOneOf(v, colorNameKeys),
  },
  {
    field: "hex",
    validate: (v: unknown): v is string => isOneOf(v, hexColorKeys),
  },
  {
    field: "title",
    validate: (v: unknown): v is string => isOneOf(v, titleColorKeys),
  },
  {
    field: "imageColor",
    validate: (v: unknown): v is string => typeof v === "string",
  },
] as const;
