import { ClothesType, ColorClothesType } from "./ClothesTypes";

export type ValidationIssue = {
  index: number;
  field: keyof ClothesType | keyof ColorClothesType | "root" | "object";
  message: string;
};
export type ValidationResult<T> =
  | { valid: true; value: T }
  | { valid: false; issues: ValidationIssue[]; raw: unknown };

export enum ERROR_MESSAGE {
  INVALID_ARRAY = "The  array is null, undefined, or invalid:",
  INVALID_OBJECT = "the object does not exist or is undefined",
  INVALID_KEYS = "The key is undefined, misspelled, or has a different name than that agreed upon with its validator array..",
  INVALID_VALUE = "The value is undefined, misspelled, or has a different value than that agreed upon with its validator array.",
  INVALID_ARRAY_COLOR = "The  array color is null, undefined, or invalid:",
}

export enum ERROR_MESSAGES_OUTFIT {
  MISSING_DATA = "some type of main data is missing",
  NO_COLOR_DATA = "There is no data on the color date",
  MAX_ATTEMPTS_REACHED = "Reached maximum attempts",
  MISSING_COLORNAME = "colorName is not in the colors array",
}
