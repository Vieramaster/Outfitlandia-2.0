// TYPES & MESSAGES
import { ClothesType } from "../../data/types/ClothesTypes";
import {
  ValidationResult,
  ValidationIssue,
  ERROR_MESSAGE,
} from "../../data/types/ValidatorResultType";

// VALIDATORS
import { isNonEmptyArray } from "../genericValidators/isNonEmptyArray";
//FUNCTIONS
import { createIssue, dataValidationResult } from "../errorManagment";
import { validateClothesItems } from "./validateClothesItems";

export const validateClothesApiResponse = (
  data: unknown
): ValidationResult<ClothesType[]> => {
  const issues: ValidationIssue[] = [];

  if (!isNonEmptyArray(data)) {
    issues.push(createIssue("root", ERROR_MESSAGE.INVALID_ARRAY));
    return dataValidationResult(data, issues);
  }

  const validItems = data.filter((item, index) => {
    validateClothesItems(item, index, issues);
  });

  return issues.length > 0
    ? dataValidationResult(data, issues)
    : { valid: true, value: validItems };
};
