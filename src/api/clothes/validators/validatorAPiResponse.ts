//TYPES
import { ClothesType, ColorClothesType } from "../../../shared/types/clothes/clothes.types";
import {
  ValidationIssue,
  ValidationResult,
} from "../../../shared/types/validationApi.types";
//MESSAGES
import { ERROR_MESSAGE } from "../../../shared/messages/estructureMessage";
//ARRAY_VALIDATORS
import { requiredMainKeys, colorNameKeys } from "../../../shared/types/clothes/arrayTypes";
import { CLOTHES_SCHEMA, COLOR_SCHEMA } from "../schemas/clothesSchemas";
//FUNCTIONS
import { isNonEmptyArray } from "../../../shared/validators/isNonEmplyArray";
import { createIssue } from "../../validators/utils_validations/validationUtils";
import { dataValidationResult } from "../../validators/utils_validations/validationUtils";
import { isPlainObject } from "../../../shared/validators/isPlainObject";
import { validateSchemaKeys } from "../../validators/object_validations/validateSchemaKeys";

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

export const clothesItemValidator = (
  objectItem: unknown,
  index: number,
  issues: ValidationIssue[]
): objectItem is ClothesType => {
  if (!isPlainObject(objectItem)) {
    issues.push(createIssue("object", ERROR_MESSAGE.INVALID_OBJECT, index));
    return false;
  }

  const validKeys = validateSchemaKeys<ClothesType>(
    objectItem,
    requiredMainKeys,
    CLOTHES_SCHEMA,
    issues,
    index
  );

  if (!validKeys) return false;

  const allColorsValid = objectItem.colors.every((item, index) => {
    validateSchemaKeys<ColorClothesType>(
      item,
      colorNameKeys,
      COLOR_SCHEMA,
      issues,
      index
    );
  });

  if (!allColorsValid) return false;

  return true;
};
