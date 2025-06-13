//TYPES
import {
  ValidationIssue,
  ValidationResult,
} from "../../../../shared/types/validationApi.types";
import {
  ERROR_MESSAGE,
  ERROR_MESSAGE_API,
} from "../../../../shared/messages/estructureMessage";
//VALIDATION UTILS
import { createIssue } from "../../../validators/utils_validations/validationUtils";
import { dataValidationResult } from "../../../validators/utils_validations/validationUtils";
//FUNCTIONS
import { isNonEmptyArray } from "../../../../shared/validators/isNonEmplyArray";
import { ClothesType } from "../../../../shared/types/clothes/clothes.types";
import { clothesItemValidator } from "./clothesItemValidator";

/**
 * Validates the raw data from the clothing API and returns either a typed result or the errors found.
 *
 * Validation steps:
 *   1. Verifies that `data` is a non-empty array (isNonEmptyArray).
 *   2. For each element, invokes `clothesItemValidator` to validate the structure against `ClothesType`.
 *   3. If validation succeeds, wraps the result in an array and returns it in a `ValidationResult` with `valid: true`.
 *   4. If validation fails, collects any `ValidationIssue`s and returns them using `dataValidationResult`.
 *
 * @param data - Raw API data (expected: an array of objects), of type `unknown`.
 * @returns ValidationResult<ClothesType[]>:
 *   - If `valid` is `true`, returns `{ valid: true; value: ClothesType[] }`,
 *     where `value` is the array of items that passed validation.
 *   - If `valid` is `false`, returns `{ valid: false; errors: ValidationIssue[] }`
 *     (or the shape defined by `dataValidationResult`), where `errors` contains
 *     all accumulated `ValidationIssue` entries, including field names, messages, and index paths.
 */

export const clothesApiValidator = (
  data: unknown
): ValidationResult<ClothesType[]> => {
  const issues: ValidationIssue[] = [];

  if (!isNonEmptyArray(data)) {
    issues.push(
      createIssue(ERROR_MESSAGE_API.CLOTHES, ERROR_MESSAGE.INVALID_ROOT)
    );
    return dataValidationResult(data, issues);
  }
  // Filter valid items based on `clothesItemValidator`
  const validItems = data.filter((item, index) =>
    clothesItemValidator(item, index, issues)
  );
  // If there are issues, return result with errors; otherwise, return validated array
  return issues.length > 0
    ? dataValidationResult(data, issues)
    : { valid: true, value: validItems };
};
