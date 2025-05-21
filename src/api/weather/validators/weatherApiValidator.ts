import { ERROR_MESSAGE } from "../../../shared/messages/estructureMessage";
import { WeatherType } from "../../../shared/types/clothes/clothes.types"
import { ValidationResult, ValidationIssue } from "../../../shared/types/validationApi.types"
import { isNonEmptyArray } from "../../../shared/validators/isNonEmplyArray"
import { createIssue, dataValidationResult } from "../../validators/utils_validations/validationUtils";

export const weatherApiValidator = ( data : unknown) : ValidationResult<WeatherType[]>=>{

const issues: ValidationIssue[] = [];

    if(!isNonEmptyArray(data)){
        issues.push(createIssue("root", ERROR_MESSAGE.INVALID_ARRAY))
        return dataValidationResult(data, issues)
    }

    const validObjects = data.filter((item, index) => )
}   

