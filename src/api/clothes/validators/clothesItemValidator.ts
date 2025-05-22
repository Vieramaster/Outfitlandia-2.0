//TYPES
import {
  ClothesType,
  ColorClothesType,
} from "../../../shared/types/clothes/clothes.types";
import { ValidationIssue } from "../../../shared/types/validationApi.types";
//MESSAGES
import { ERROR_MESSAGE } from "../../../shared/messages/estructureMessage";
//ARRAY_VALIDATORS
import {
  requiredMainKeys,
  colorRequiredKeys,
} from "../../../shared/types/clothes/arrayTypes";
import {
  CLOTHES_SCHEMA,
  CLOTHES_COLOR_SCHEMA,
} from "../schemas/clothes.schema";
//FUNCTIONS
import { createIssue } from "../../validators/utils_validations/validationUtils";
import { isPlainObject } from "../../../shared/validators/isPlainObject";
import { validateSchemaKeys } from "../../validators/object_validations/validateSchemaKeys";

export const clothesItemValidator = (
  objectItem: unknown,
  mainIndex: number,
  issues: ValidationIssue[]
): objectItem is ClothesType => {
  if (!isPlainObject(objectItem)) {
    issues.push(
      createIssue("object", ERROR_MESSAGE.INVALID_OBJECT, [mainIndex])
    );
    return false;
  }

  const validKeys = validateSchemaKeys<ClothesType>(
    objectItem,
    requiredMainKeys,
    CLOTHES_SCHEMA,
    issues,
    [mainIndex]
  );

  if (!validKeys) return false;

  const allColorsValid = objectItem.colors.filter((item, colorIndex) => {
    if (!isPlainObject(item)) {
      issues.push(
        createIssue("object color", ERROR_MESSAGE.INVALID_OBJECT, [
          mainIndex,
          colorIndex,
        ])
      );
    }
    validateSchemaKeys<ColorClothesType>(
      item,
      colorRequiredKeys,
      CLOTHES_COLOR_SCHEMA,
      issues,
      [mainIndex, colorIndex]
    );
  });

  if (!allColorsValid) return false;
  return true;
};
