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
  ERROR_MESSAGE_API,
} from "../../../../shared/messages/estructureMessage";

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
      createIssue(
        ERROR_MESSAGE_API.COMBINE_COLORS,
        ERROR_MESSAGE.INVALID_OBJECT,
        [mainIndex]
      )
    );
    return false;
  }

  if (
    !validateSchemaKeys<CombineColorsType>(
      objectItem,
      COMBINE_COLOR_SCHEMA,
      issues,
      [mainIndex],
      ERROR_MESSAGE_API.COMBINE_COLORS
    )
  )
    return false;

  if (
    !validateSchemaKeys<CombineColorsType>(
      objectItem.clothes,
      COMBINE_COLORS_CLOTHES_SCHEMA,
      issues,
      [mainIndex],
      ERROR_MESSAGE_API.COMBINE_COLORS
    )
  )
    return false;
  return true;
};
