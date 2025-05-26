//TYPES && MESSAGE
import {
  ValidationIssue,
  ValidationResult,
} from "../../../../shared/types/validationApi.types";
import { ERROR_MESSAGE } from "../../../../shared/messages/estructureMessage";
//VALIDATION UTILS
import { createIssue } from "../../../validators/utils_validations/validationUtils";
import { dataValidationResult } from "../../../validators/utils_validations/validationUtils";
//FUNCTIONS
import { isNonEmptyArray } from "../../../../shared/validators/isNonEmplyArray";
import { ClothesType } from "../../../../shared/types/clothes/clothes.types";
import { clothesItemValidator } from "./clothesItemValidator";

export const clothesApiValidator = (
  data: unknown
): ValidationResult<ClothesType[]> => {
  const issues: ValidationIssue[] = [];

  if (!isNonEmptyArray(data)) {
    issues.push(createIssue("root", ERROR_MESSAGE.INVALID_ARRAY));
    return dataValidationResult(data, issues);
  }

  const validItems = data.filter((item, index) =>
    clothesItemValidator(item, index, issues)
  );

  return issues.length > 0
    ? dataValidationResult(data, issues)
    : { valid: true, value: validItems };
};
