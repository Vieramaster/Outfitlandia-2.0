import { useFetch } from "./useFetch";
import { isValidClothesApiResponse } from "../validators/garmentsValidators/isValidClothesApiResponse";
import { RawClothes } from "../data/types/ClothesTypes";

type UseClothesDataResult = {
  loading: boolean;
  error: Error | null;
  clothes: RawClothes[] | undefined;
};

export const useClothesData = (): UseClothesDataResult => {
  const {
    data: clothesData,
    loading,
    error: fetchError,
  } = useFetch("/garmentData.json");

  // 1) Handle fetch errors first
  if (fetchError) {
    console.error("Fetch error:", fetchError);
    return { loading: false, error: fetchError, clothes: undefined };
  }

  // 2) Loading or no data yet
  if (loading || clothesData === undefined) {
    return { loading, error: null, clothes: undefined };
  }

  // 3) Validate data structure
  const validationResult = isValidClothesApiResponse(clothesData);

  if (!validationResult.valid) {
    console.error(
      "Validation failed:",
      validationResult.error,
      validationResult.raw
    );
    return {
      loading: false,
      error: new Error(validationResult.error),
      clothes: undefined,
    };
  }

  // 4) Success
  return { loading: false, error: null, clothes: validationResult.value };
};
