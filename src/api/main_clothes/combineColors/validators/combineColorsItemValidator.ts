//TYPES
import {
  CombineColorsShallow,
  CombineColorsType,
} from "../../../../shared/types/clothes/combineColors.types";
import { ValidationIssue } from "../../../../shared/types/validationApi.types";
//SCHEMAS
import {
  COMBINE_COLOR_SCHEMA,
  COMBINE_COLORS_CLOTHES_SCHEMA,
} from "../schema/combineColors.schema";
//MESSAGES
import {
  ERROR_MESSAGE,
  ERROR_MESSAGE_API,
} from "../../../../shared/messages/estructureMessage";

//FUNCTIONS
import { validateSchemaKeys } from "../../../validators/object_validations/validateSchemaKeys";

import { isPlainObject } from "../../../../shared/validators/isPlainObject";
import { createIssue } from "../../../validators/utils_validations/validationUtils";

/**
 * Validates a single raw entry from the color combination API and narrows it to `CombineColorsType`.
 *
 * Validation steps:
 *  1. Ensure that `objectItem` is a plain object.
 *  2. Validate top-level properties (e.g. `id`, `shoes`, `clothes`) using `COMBINE_COLOR_SCHEMA`,
 *     narrowing the type to `CombineColorsShallow` (where `clothes` is still an object).
 *  3. Validate the nested `clothes` object using `COMBINE_COLORS_CLOTHES_SCHEMA`,
 *     narrowing it to the full `CombineColorsType`.
 *
 * Any validation failure will result in a `ValidationIssue` being pushed into the `issues` array.
 * If all checks pass, TypeScript can safely treat `objectItem` as a `CombineColorsType`.
 *
 * @param objectItem - Raw input item to validate (expected to be an object from the API)
 * @param mainIndex - Index of this item in the parent array; used to build issue paths.
 * @param issues - Array to accumulate `ValidationIssue` entries when a validation fails.
 * @returns Returns `true` (type guard) if `objectItem` passes all validations and can be treated as `CombineColorsType`.
 *          Returns `false` if any validation fails (and in that case, corresponding issues have been added).
 */
export const combineColorsItemValidator = (
  objectItem: unknown,
  mainIndex: number,
  issues: ValidationIssue[]
): objectItem is CombineColorsType => {
  // 1. Validate that it's a plain object
  if (!isPlainObject(objectItem)) {
    issues.push(
      createIssue(
        ERROR_MESSAGE_API.COMBINE_COLORS,
        ERROR_MESSAGE.INVALID_OBJECT,
        [mainIndex]
      )
    );
    return false;
  }
  // 2. Validate top-level keys and superficial types (clothes as plain object)
  if (
    !validateSchemaKeys<CombineColorsShallow>(
      objectItem,
      COMBINE_COLOR_SCHEMA,
      issues,
      [mainIndex],
      ERROR_MESSAGE_API.COMBINE_COLORS
    )
  )
    return false;

  // 3. Now that objectItem.clothes is inferred as plain object, validate keys and values
  if (
    !validateSchemaKeys<CombineColorsType>(
      objectItem.clothes,
      COMBINE_COLORS_CLOTHES_SCHEMA,
      issues,
      [mainIndex],
      ERROR_MESSAGE_API.COMBINE_COLORS
    )
  )
    return false;

  // All checks passed: TS can treat objectItem as CombineColorsType
  return true;
};
