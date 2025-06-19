//TYPES
import { CombineColorsType } from "../../../../types/clothes/combineColors.types";
import {
  ValidationIssue,
  ValidationResult,
} from "../../../../types/validationApi.types";
//MESSAGES
import {
  ERROR_MESSAGE,
  ERROR_MESSAGE_API,
} from "../../../../constants/messageErrors";
//FUNCTIONS
import { isNonEmptyArray } from "../../../../utils/validators/isNonEmplyArray";
import {
  createIssue,
  dataValidationResult,
} from "../../../validators/utils_validations/validationUtils";
import { combineColorsItemValidator } from "./combineColorsItemValidator";

/**
 * Validates the raw data from the clothing API and returns either a typed result or the errors found.
 *
 * Validation steps:
 *   1. Verifies that `data` is a non-empty array (isNonEmptyArray).
 *   2. For each element, invokes `clothesItemValidator` to validate the structure against `CombineColorsType`.
 *   3. If validation succeeds, wraps the result in an array and returns it in a `ValidationResult` with `valid: true`.
 *   4. If validation fails, collects any `ValidationIssue`s and returns them using `dataValidationResult`.
 *
 * @param data - Raw API data (expected: an array of objects), of type `unknown`.
 * @returns ValidationResult<CombineColorsType[]>:
 *   - If `valid` is `true`, returns `{ valid: true; value: CombineColorsType[] }`,
 *     where `value` is the array of items that passed validation.
 *   - If `valid` is `false`, returns `{ valid: false; errors: ValidationIssue[] }`
 *     (or the shape defined by `dataValidationResult`), where `errors` contains
 *     all accumulated `ValidationIssue` entries, including field names, messages, and index paths.
 */

export const combineColorsApiValidator = (
  data: unknown
): ValidationResult<CombineColorsType[]> => {
  const issues: ValidationIssue[] = [];
  if (!isNonEmptyArray(data)) {
    issues.push(
      createIssue(ERROR_MESSAGE_API.COMBINE_COLORS, ERROR_MESSAGE.INVALID_ROOT)
    );
    return dataValidationResult(data, issues);
  }
  // Filter valid items based on `combineColorsItemValidator`
  const validItems = data.filter((item, index) =>
    combineColorsItemValidator(item, index, issues)
  );
  // If there are issues, return result with errors; otherwise, return validated array
  return issues.length > 0
    ? dataValidationResult(data, issues)
    : { valid: true, value: validItems };
};
