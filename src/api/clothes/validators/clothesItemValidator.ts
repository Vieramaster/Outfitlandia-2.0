//TYPES
import { ClothesType, ColorClothesType } from "../../../shared/types/clothes/clothes.types";
import { ValidationIssue } from "../../../shared/types/validationApi.types";
//MESSAGES
import { ERROR_MESSAGE } from "../../../shared/messages/estructureMessage";
//ARRAY_VALIDATORS
import { requiredMainKeys, colorNameKeys } from "../../../shared/types/clothes/arrayTypes";
import { CLOTHES_SCHEMA, COLOR_SCHEMA } from "../schemas/clothes.schema";
//FUNCTIONS
import { createIssue } from "../../validators/utils_validations/validationUtils";
import { isPlainObject } from "../../../shared/validators/isPlainObject";
import { validateSchemaKeys } from "../../validators/object_validations/validateSchemaKeys";


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
