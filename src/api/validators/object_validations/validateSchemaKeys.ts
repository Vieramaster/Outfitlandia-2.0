//TYPES
import { ArraySchemaType } from "../../../types/validationApi.types";
import { ValidationIssue } from "../../../types/validationApi.types";
//MESSAGE
import { ERROR_MESSAGE } from "../../../constants/messageErrors";
//FUNCTIONS
import { isObjectWithRequiredKeys } from "./isObjectWithRequiredKeys";
import { createIssue } from "../utils_validations/validationUtils";
import { isPlainObject } from "../../../utils/validators/isPlainObject";

// VALIDADOR PRINCIPAL
export const validateSchemaKeys = <T>(
  objectItem: unknown,
  schema: ArraySchemaType[],
  issues: ValidationIssue[],
  totalIndex: number[],
  errorMessage?: string
): objectItem is T => {
  if (!isPlainObject(objectItem)) return false;

  return schema.every(({ field, validate }) => {
    if (!isObjectWithRequiredKeys(objectItem, field)) {
      issues.push(
        createIssue(
          field,
          errorMessage + ERROR_MESSAGE.INVALID_KEYS,
          totalIndex
        )
      );
      return false;
    }

    if (!validate(objectItem[field])) {
      issues.push(
        createIssue(
          field,
          errorMessage + ERROR_MESSAGE.INVALID_VALUE,
          totalIndex
        )
      );
      return false;
    }

    return true;
  });
};
