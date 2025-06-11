//TYPES
import { CombineColorsType } from "../../../../shared/types/clothes/combineColors.types";
import {
  ValidationIssue,
  ValidationResult,
} from "../../../../shared/types/validationApi.types";
//MESSAGES
import {
  ERROR_MESSAGE,
  ERROR_MESSAGE_API,
} from "../../../../shared/messages/estructureMessage";
//FUNCTIONS
import { isNonEmptyArray } from "../../../../shared/validators/isNonEmplyArray";
import {
  createIssue,
  dataValidationResult,
} from "../../../validators/utils_validations/validationUtils";
import { combineColorsItemValidator } from "./combineColorsItemValidator";

export const combineColorsApiValidator = (
  data: unknown
): ValidationResult<CombineColorsType[]> => {
  const issues: ValidationIssue[] = [];
  if (!isNonEmptyArray(data)) {
    issues.push(
      createIssue(ERROR_MESSAGE_API.COMBINE_COLORS, ERROR_MESSAGE.INVALID_ARRAY)
    );
    return dataValidationResult(data, issues);
  }

  const validItems = data.filter((item, index) =>
    combineColorsItemValidator(item, index, issues)
  );

  return issues.length > 0
    ? dataValidationResult(data, issues)
    : { valid: true, value: validItems };
};
