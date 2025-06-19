//TYPE
import { DataResultType } from "../types/validationApi.types";
import { ValidationResult } from "../types/validationApi.types";
//HOOK
import { useFetch } from "../hooks/useFetch";
//FUNCTIONS

export const consumeAPI = <T>(
  URL: string,
  validator: (arg0: unknown) => ValidationResult<T[]>
): DataResultType<T[]> => {
  const { data, loading, error } = useFetch(URL);

  if (error) {
    console.error("Fetch error:", error);
    return { loading: false, error, validatedData: undefined };
  }

  if (loading || !data) {
    return { loading: true, error: null, validatedData: undefined };
  }

  const validationResult = validator(data);

  if (!validationResult.valid) {
    console.error("Validation failed:", validationResult.issues);
    return {
      loading: false,
      error: new Error(
        "validation error: " + validationResult.issues.join(", ")
      ),
      validatedData: undefined,
    };
  }

  return {
    loading: false,
    error: null,
    validatedData: validationResult.value as T[],
  };
};
