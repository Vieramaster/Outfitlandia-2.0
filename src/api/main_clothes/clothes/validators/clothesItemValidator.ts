// TYPES
import {
  ClothesType,
  ClothesShallow,
  ColorClothesType,
} from "../../../../shared/types/clothes/clothes.types";

import { ValidationIssue } from "../../../../shared/types/validationApi.types";
// MESSAGES
import {
  ERROR_MESSAGE,
  ERROR_MESSAGE_API,
} from "../../../../shared/messages/estructureMessage";
// SCHEMAS
import {
  CLOTHES_SCHEMA,
  CLOTHES_COLOR_SCHEMA,
} from "../schemas/clothes.schema";
// FUNCTIONS
import { createIssue } from "../../../validators/utils_validations/validationUtils";
import { isPlainObject } from "../../../../shared/validators/isPlainObject";
import { validateSchemaKeys } from "../../../validators/object_validations/validateSchemaKeys";

/**
 * Validates a single raw item from the clothing API and narrows it to `ClothesType`.
 *
 * Validation steps:
 *   1. Check that `objectItem` is a plain object.
 *   2. Validate top-level keys and their superficial types against `CLOTHES_SCHEMA`,
 *      narrowing to `ClothesShallow` (where `colors` is `unknown[]`).
 *   3. For the `colors` array (now known to be `unknown[]`), ensure each element is a plain object.
 *      and validate each against `CLOTHES_COLOR_SCHEMA`, narrowing to `ColorClothesType`.
 *
 * If any check fails, a `ValidationIssue` is pushed into the `issues` array and the function returns `false`.
 * Only if all checks pass does it return `true`, allowing TypeScript to treat `objectItem` as `ClothesType`.
 *
 * @param objectItem - The raw value to validate (expected to be an object representing a clothing item).
 * @param mainIndex - Index of this item in the parent array; used to build issue paths.
 * @param issues - Array to accumulate `ValidationIssue` entries when a validation fails.
 * @returns Returns `true` (type guard) if `objectItem` passes all validations and can be treated as `ClothesType`.
 *          Returns `false` if any validation fails (and in that case, corresponding issues have been added).
 */
export const clothesItemValidator = (
  objectItem: unknown,
  mainIndex: number,
  issues: ValidationIssue[]
): objectItem is ClothesType => {
  // 1. Validate that it's a plain object
  if (!isPlainObject(objectItem)) {
    issues.push(
      createIssue(ERROR_MESSAGE_API.CLOTHES, ERROR_MESSAGE.INVALID_OBJECT, [
        mainIndex,
      ])
    );
    return false;
  }

  // 2. Validate top-level keys and superficial types (colors as unknown[])
  const isShallowValid = validateSchemaKeys<ClothesShallow>(
    objectItem,
    CLOTHES_SCHEMA,
    issues,
    [mainIndex],
    ERROR_MESSAGE_API.CLOTHES
  );
  if (!isShallowValid) {
    return false;
  }

  // 3. Now that objectItem.colors is inferred as unknown[], validate each element
  const allColorsValid = objectItem.colors.every((item, colorIndex) => {
    // 3a. Check each color entry is a plain object
    if (!isPlainObject(item)) {
      issues.push(
        createIssue(ERROR_MESSAGE_API.CLOTHES, ERROR_MESSAGE.INVALID_OBJECT, [
          mainIndex,
          colorIndex,
        ])
      );
      return false;
    }
    // 3b. Validate keys & values of this color object
    return validateSchemaKeys<ColorClothesType>(
      item,
      CLOTHES_COLOR_SCHEMA,
      issues,
      [mainIndex, colorIndex],
      ERROR_MESSAGE_API.CLOTHES + ERROR_MESSAGE_API.COMBINE_COLORS
    );
  });

  if (!allColorsValid) {
    return false;
  }

  // All checks passed: TS can treat objectItem as ClothesType
  return true;
};
