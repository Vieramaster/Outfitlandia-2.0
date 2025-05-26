//TYPE
import { DataResultType } from "../shared/types/validationApi.types";
import { ValidationResult } from "../shared/types/validationApi.types";
//HOOK
import { useFetch } from "./useFetch";
//FUNCTIONS
import { clothesApiValidator } from "../api/main_clothes/clothes/validators/clothesApiValidator";
import { weatherApiValidator } from "../api/weather/validators/weatherApiValidator";

// 1. Definir tipo para los validadores
type ApiValidator<T> = {
  API: "clothes" | "weather";
  validator: (data: unknown) => ValidationResult<T[]>;
};

// 2. Lista de validadores con tipo explícito
const VALIDATORS: ApiValidator<any>[] = [
  {
    API: "clothes",
    validator: clothesApiValidator,
  },
  {
    API: "weather",
    validator: weatherApiValidator,
  },
];

export const useApiData = <T>(
  URL: string,
  chosenAPI: "clothes" | "weather" | "combineColors"
): DataResultType<T[]> => {
  // 3. Tipo genérico para array
  const { data, loading, error } = useFetch(URL);

  // 4. Buscar validador de forma segura
  const selectedAPI = VALIDATORS.find((v) => v.API === chosenAPI);

  // Manejo de estados base
  if (error) {
    console.error("Fetch error:", error);
    return { loading: false, error, validatedData: undefined };
  }

  if (loading || !data) {
    return { loading: true, error: null, validatedData: undefined };
  }

  // 5. Validar existencia del validador
  if (!selectedAPI) {
    const errorMsg = `Validator not found for API: ${chosenAPI}`;
    console.error(errorMsg);
    return {
      loading: false,
      error: new Error(errorMsg),
      validatedData: undefined,
    };
  }

  // 6. Ejecutar validación
  const validationResult = selectedAPI.validator(data);

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

  // 7. Retornar datos tipados correctamente
  return {
    loading: false,
    error: null,
    validatedData: validationResult.value as T[],
  };
};
