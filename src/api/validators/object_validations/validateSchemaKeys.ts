//TYPES
import { ArraySChemaType } from "../../../shared/types/validationApi.types";
import { ValidationIssue } from "../../../shared/types/validationApi.types";
//FUNCTIONS
import { isObjectWithRequiredKeys } from "./isObjectWithRequiredKeys";
import { createIssue } from "../utils_validations/validationUtils";
//MESSAGE
import { ERROR_MESSAGE } from "../../../shared/messages/estructureMessage";

export const validateSchemaKeys = <T extends Record<string, unknown>>(
  objectItem: Record<string, unknown>,
  arrayKeys: readonly string[],
  schema: ArraySChemaType[],
  issues: ValidationIssue[],
  itemIndex: number
): objectItem is T =>
  schema.every(({ field, validate }): boolean => {
    if (!isObjectWithRequiredKeys(objectItem, field, arrayKeys)) {
      issues.push(createIssue(field, ERROR_MESSAGE.INVALID_KEYS, itemIndex));
      return false;
    }
    if (!validate(objectItem[field])) {
      issues.push(createIssue(field, ERROR_MESSAGE.INVALID_VALUE, itemIndex));
    }
    return true;
  });
