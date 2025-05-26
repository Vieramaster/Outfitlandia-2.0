//TYPES
import { ArraySChemaType } from "../../../../shared/types/validationApi.types";
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

export const CLOTHES_SCHEMA: ArraySChemaType[] = [
  { field: "id", validate: (v) => typeof v === "number" },
  { field: "garment", validate: (v) => isOneOf(v, garmentsKeys) },
  { field: "name", validate: (v) => typeof v === "string" },
  { field: "image", validate: (v) => typeof v === "string" },
  { field: "style", validate: (v) => validateStringArray(v, styleKeys) },
  { field: "weather", validate: (v) => validateStringArray(v, weatherKeys) },
  { field: "colors", validate: (v) => isNonEmptyArray(v) },
];

export const CLOTHES_COLOR_SCHEMA: ArraySChemaType[] = [
  { field: "colorName", validate: (v) => isOneOf(v, colorNameKeys) },
  { field: "hex", validate: (v) => isOneOf(v, hexColorKeys) },
  { field: "title", validate: (v) => isOneOf(v, titleColorKeys) },
  { field: "imageColor", validate: (v) => typeof v === "string" },
];
