//TYPES
import { ArraySChemaType } from "../../../../shared/types/validationApi.types";
//ARRAY_KEYS
import { colorNameKeys } from "../../../../shared/types/clothes/arrayTypes";
//VALIDATORS
import { isNonEmptyArray } from "../../../../shared/validators/isNonEmplyArray";
import { isPlainObject } from "../../../../shared/validators/isPlainObject";
import { isOneOf } from "../../../validators/object_validations/isOneOf";

export const COMBINE_COLOR_SCHEMA: ArraySChemaType[] = [
  { field: "clothes", validate: (v) => isPlainObject(v) },
  {
    field: "shoes",
    validate: (v) => isNonEmptyArray(v),
  },
  { field: "id", validate: (v) => typeof v === "number" },
];

export const COMBINE_COLORS_CLOTHES_SCHEMA: ArraySChemaType[] = [
  { field: "top", validate: (v) => typeof v === "string" },
  { field: "coat", validate: (v) => isOneOf(v, colorNameKeys) },
  { field: "pants", validate: (v) => isOneOf(v, colorNameKeys) },
];
