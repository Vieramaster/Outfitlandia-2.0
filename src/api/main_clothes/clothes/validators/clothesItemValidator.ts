//TYPES
import {
  ClothesType,
  ClothesShallow,
  ColorClothesType,
} from "../../../../shared/types/clothes/clothes.types";

import { ValidationIssue } from "../../../../shared/types/validationApi.types";
//MESSAGES
import {
  ERROR_MESSAGE,
  ERROR_MESSAGE_API,
} from "../../../../shared/messages/estructureMessage";
//SCHEMAS
import {
  CLOTHES_SCHEMA,
  CLOTHES_COLOR_SCHEMA,
} from "../schemas/clothes.schema";
//FUNCTIONS
import { createIssue } from "../../../validators/utils_validations/validationUtils";
import { isPlainObject } from "../../../../shared/validators/isPlainObject";
import { validateSchemaKeys } from "../../../validators/object_validations/validateSchemaKeys";

export const clothesItemValidator = (
  objectItem: unknown,
  mainIndex: number,
  issues: ValidationIssue[]
): objectItem is ClothesType => {
  if (!isPlainObject(objectItem)) {
    issues.push(
      createIssue(ERROR_MESSAGE_API.CLOTHES, ERROR_MESSAGE.INVALID_OBJECT, [
        mainIndex,
      ])
    );
    return false;
  }
  const validateClothesKeys = validateSchemaKeys<ClothesShallow>(
    objectItem,
    CLOTHES_SCHEMA,
    issues,
    [mainIndex],
    ERROR_MESSAGE_API.CLOTHES
  );
  if (!validateClothesKeys) return false;

  const allColorsValid = objectItem.colors.every((item, colorIndex) => {
    if (!isPlainObject(item)) {
      issues.push(
        createIssue(ERROR_MESSAGE_API.CLOTHES, ERROR_MESSAGE.INVALID_OBJECT, [
          mainIndex,
          colorIndex,
        ])
      );
    }
    return validateSchemaKeys<ColorClothesType>(
      item,
      CLOTHES_COLOR_SCHEMA,
      issues,
      [mainIndex, colorIndex],
      ERROR_MESSAGE_API.CLOTHES + ERROR_MESSAGE_API.COMBINE_COLORS
    );
  });

  if (!allColorsValid) return false;
  return true;
};
