import { ClothesType } from "./ClothesTypes";

export type ValidationIssue = {
  index: number;
  field: keyof ClothesType[] | "root";
  message: string;
};
export type ValidationResult<T> =
  | { valid: true; value: T }
  | { valid: false; issues: ValidationIssue[]; raw: unknown };

export enum ERROR_MESSAGE {
  INVALID_ARRAY = "The  array is null, undefined, or invalid:",
  INVALID_KEYS_VALUE = "One or more keys contain invalid or undefined values:",
  INVALID_OBJECT = "The  object is incomplete or missing a required key:",
}

export enum ERROR_MESSAGES_OUTFIT {
  MISSING_DATA = "some type of main data is missing",
  NO_COLOR_DATA = "There is no data on the color date",
  MAX_ATTEMPTS_REACHED = "Reached maximum attempts",
  MISSING_COLORNAME = "colorName is not in the colors array",
}
