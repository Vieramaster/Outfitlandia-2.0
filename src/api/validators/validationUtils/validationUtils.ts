//TYPES
import {
  ValidationIssue,
  ValidationResult,
} from "../../../shared/types/apiValidationTypes";

export const createIssue = (
  field: ValidationIssue["field"],
  message: string,
  index?: number
): ValidationIssue => ({
  field,
  message,
  index: index ?? -1,
});

export const dataValidationResult = (
  raw: unknown,
  issues: ValidationIssue[]
): ValidationResult<never> => ({
  valid: false,
  issues,
  raw,
});
