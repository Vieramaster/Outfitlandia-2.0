//TYPES
import {
  ValidationIssue,
  ValidationResult,
} from "../../../types/validationApi.types";

export const createIssue = (
  field: ValidationIssue["field"],
  message: string,
  index: number[] = [-1]
): ValidationIssue => ({
  field,
  message,
  index,
});

export const dataValidationResult = (
  raw: unknown,
  issues: ValidationIssue[]
): ValidationResult<never> => ({
  valid: false,
  issues,
  raw,
});
