//TYPES && MESSAGE
import { ValidationIssue,ValidationResult } from "../../shared/types/validationApi.types";
import { ERROR_MESSAGE } from "../../shared/messages/estructureMessage";
//VALIDATION UTILS
import { createIssue } from "./utils_validations/validationUtils"; 
import { dataValidationResult } from "./utils_validations/validationUtils";
//FUNCTIONS
import { isNonEmptyArray } from "../../shared/validators/isNonEmplyArray";


export const apiResponseValidator =<T> (
  data: unknown,
  objectValidator: (item: unknown, index: number, issues:ValidationIssue[]) => item is T
): ValidationResult<T[]> => {

  const issues: ValidationIssue[] = [];

  if (!isNonEmptyArray(data)) {
    issues.push(createIssue("root", ERROR_MESSAGE.INVALID_ARRAY));
    return dataValidationResult(data, issues);
  }

  const validItems = data.filter((item, index) =>
    objectValidator(item, index, issues)
  );

  return issues.length > 0
    ? dataValidationResult(data, issues)
    : { valid: true, value: validItems };
};
