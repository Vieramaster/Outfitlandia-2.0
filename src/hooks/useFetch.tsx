import { useEffect, useState, useMemo } from "react";
import { ClothesProps, CombineColorsProps } from "../data/types";

type FetchDataProps<T extends "clothes" | "colors"> = T extends "clothes"
  ? ClothesProps
  : CombineColorsProps;

interface FetchState<T> {
  data: T[] | undefined;
  loading: boolean;
  error: Error | null;
}

export const useFetch = <T extends "clothes" | "colors">(
  product: T
): FetchState<FetchDataProps<T>> => {
  const [data, setData] = useState<FetchDataProps<T>[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!product) return;
    const controller = new AbortController();
    const { signal } = controller;
    setLoading(true);

    fetch(product === "clothes" ? "/garmentData.json" : "/combineColors.json", {
      signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        return response.json();
      })
      .then((jsonData: FetchDataProps<T>[]) => {
        setData(jsonData);
      })
      .catch((error: Error) => {
        if (error.name !== "AbortError") {
          setError(error);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [product]);

  return useMemo(
    () => ({ data, loading, error } as const),
    [data, error, loading]
  );
};
