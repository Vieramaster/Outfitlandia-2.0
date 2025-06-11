//TYPES
import { ArraySchemaType } from "../../../../shared/types/validationApi.types";
//ARRAY_KEYS
import { colorNameKeys } from "../../../../shared/types/clothes/arrayTypes";
//VALIDATORS
import { isNonEmptyArray } from "../../../../shared/validators/isNonEmplyArray";
import { isPlainObject } from "../../../../shared/validators/isPlainObject";
import { isOneOf } from "../../../validators/object_validations/isOneOf";
import { validateStringArray } from "../../../validators/object_validations/validateStringArray";

export const COMBINE_COLOR_SCHEMA: ArraySchemaType[] = [
  { field: "clothes", validate: (v: unknown) => isPlainObject(v) },
  {
    field: "shoes",
    validate: (v: unknown) =>
      isNonEmptyArray(v) && validateStringArray(v, colorNameKeys),
  },
  { field: "id", validate: (v: unknown) => typeof v === "number" },
];

export const COMBINE_COLORS_CLOTHES_SCHEMA: ArraySchemaType[] = [
  { field: "top", validate: (v: unknown) => typeof v === "string" },
  { field: "coat", validate: (v: unknown) => isOneOf(v, colorNameKeys) },
  { field: "pants", validate: (v: unknown) => isOneOf(v, colorNameKeys) },
];
