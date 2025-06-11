//TYPES
import { ArraySchemaType } from "../../../../shared/types/validationApi.types";

//ARRAY_VALIDATORS
import {
  garmentsKeys,
  styleKeys,
  weatherKeys,
  colorNameKeys,
  titleColorKeys,
  hexColorKeys,
} from "../../../../shared/types/clothes/arrayTypes";

//FUNCTIONS
import { isOneOf } from "../../../validators/object_validations/isOneOf";
import { isNonEmptyArray } from "../../../../shared/validators/isNonEmplyArray";
import { validateStringArray } from "../../../validators/object_validations/validateStringArray";

export const CLOTHES_SCHEMA: ArraySchemaType[] = [
  { field: "id", validate: (v: unknown) => typeof v === "number" },
  {
    field: "garment",
    validate: (v: unknown) => isOneOf(v, garmentsKeys),
  },
  { field: "name", validate: (v: unknown) => typeof v === "string" },
  { field: "image", validate: (v: unknown) => typeof v === "string" },
  {
    field: "style",
    validate: (v: unknown) => validateStringArray(v, styleKeys),
  },
  {
    field: "weather",
    validate: (v: unknown) => validateStringArray(v, weatherKeys),
  },
  { field: "colors", validate: (v: unknown) => isNonEmptyArray(v) },
];

export const CLOTHES_COLOR_SCHEMA: ArraySchemaType[] = [
  { field: "colorName", validate: (v: unknown) => isOneOf(v, colorNameKeys) },
  { field: "hex", validate: (v: unknown) => isOneOf(v, hexColorKeys) },
  { field: "title", validate: (v: unknown) => isOneOf(v, titleColorKeys) },
  { field: "imageColor", validate: (v: unknown) => typeof v === "string" },
];
