//TYPES
import { CombineColorsType } from "../../../../shared/types/clothes/combineColors.types";
import { ValidationIssue } from "../../../../shared/types/validationApi.types";
//SCHEMAS
import {
  COMBINE_COLOR_SCHEMA,
  COMBINE_COLORS_CLOTHES_SCHEMA,
} from "../schema/combineColors.schema";
//MESSAGES
import {
  ERROR_MESSAGE,
  ERROR_MESSAGE_COMBINE_COLORS,
} from "../../../../shared/messages/estructureMessage";
//ARRAYKEYS
import { colorNameKeys } from "../../../../shared/types/clothes/arrayTypes";
//FUNCTIONS
import { validateSchemaKeys } from "../../../validators/object_validations/validateSchemaKeys";
import { validateStringArray } from "../../../validators/object_validations/validateStringArray";
import { isPlainObject } from "../../../../shared/validators/isPlainObject";
import { createIssue } from "../../../validators/utils_validations/validationUtils";

export const combineColorsItemValidator = (
  objectItem: unknown,
  mainIndex: number,
  issues: ValidationIssue[]
): objectItem is CombineColorsType => {
  if (!isPlainObject(objectItem)) {
    issues.push(
      createIssue(
        ERROR_MESSAGE_COMBINE_COLORS.COMBINE_OBJECT,
        ERROR_MESSAGE.INVALID_OBJECT,
        [mainIndex]
      )
    );
    return false;
  }

  const validKeys = validateSchemaKeys<CombineColorsType>(
    objectItem,
    ["clothes", "shoes", "id"],
    COMBINE_COLOR_SCHEMA,
    issues,
    [mainIndex],
    ERROR_MESSAGE_COMBINE_COLORS.COMBINE_OBJECT_KEYS
  );

  if (!validKeys) return false;

  const validateShoes = validateStringArray(objectItem.shoes, colorNameKeys);

  if (!validateShoes) {
    issues.push(
      createIssue(
        "shoes",
        ERROR_MESSAGE_COMBINE_COLORS.SHOES + ERROR_MESSAGE.INVALID_KEYS,
        [mainIndex]
      )
    );
    return false;
  }

  return true;
};

/**
 * 
  const validClothes = validateSchemaKeys<CombineColorsType>(
    objectItem,
    ["top", "coat", "pants"],
    COMBINE_COLORS_CLOTHES_SCHEMA,
    issues,
    [mainIndex],
    ERROR_MESSAGE_COMBINE_COLORS.CLOTHES
  );

  if (!validClothes) return false;
 */
