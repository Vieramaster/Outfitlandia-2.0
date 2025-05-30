//TYPES
import { CombineColorsType } from "../../../../shared/types/clothes/combineColors.types";
import { ValidationIssue } from "../../../../shared/types/validationApi.types";
//SCHEMAS
import {
  COMBINE_COLOR_SCHEMA,
  COMBINE_COLORS_CLOTHES_SCHEMA,
} from "../schema/combineColors.schema";
//MESSAGES
import { ERROR_MESSAGE } from "../../../../shared/messages/estructureMessage";
//FUNCTIONS
import { validateSchemaKeys } from "../../../validators/object_validations/validateSchemaKeys";
import { isPlainObject } from "../../../../shared/validators/isPlainObject";
import { createIssue } from "../../../validators/utils_validations/validationUtils";

export const combineColorsItemValidator = (
  objectItem: unknown,
  mainIndex: number,
  issues: ValidationIssue[]
): objectItem is CombineColorsType => {
  if (!isPlainObject(objectItem)) {
    issues.push(
      createIssue("object", ERROR_MESSAGE.INVALID_OBJECT, [mainIndex])
    );
    return false;
  }

  const validKeys = validateSchemaKeys<CombineColorsType>(
    objectItem,
    ["clothes", "shoes"],
    COMBINE_COLOR_SCHEMA,
    issues,
    [mainIndex]
  );

  if (!validKeys) return false;

  const validClothes = validateSchemaKeys<CombineColorsType>(
    objectItem,
    ["top", "coat", "pants"],
    COMBINE_COLORS_CLOTHES_SCHEMA,
    issues,
    [mainIndex]
  );

  if (!validClothes) return false;

  return true;
};
