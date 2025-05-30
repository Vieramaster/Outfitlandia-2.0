import { ERROR_MESSAGE } from "../../../../shared/messages/estructureMessage";
import { CombineColorsType } from "../../../../shared/types/clothes/combineColors.types";
import {
  ValidationIssue,
  ValidationResult,
} from "../../../../shared/types/validationApi.types";
import { isNonEmptyArray } from "../../../../shared/validators/isNonEmplyArray";
import { isPlainObject } from "../../../../shared/validators/isPlainObject";
import { validateSchemaKeys } from "../../../validators/object_validations/validateSchemaKeys";
import {
  createIssue,
  dataValidationResult,
} from "../../../validators/utils_validations/validationUtils";

export const combineColorsApiValidator = (
  data: unknown
): ValidationResult<CombineColorsType[]> => {
  const issues: ValidationIssue[] = [];
  if (!isNonEmptyArray(data)) {
    issues.push(
      createIssue("combine colors root", ERROR_MESSAGE.INVALID_ARRAY)
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

