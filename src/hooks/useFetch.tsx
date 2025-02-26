import { useEffect, useState, useMemo } from "react";
import { ClothesProps, CombineColorsProps, WeatherProps } from "../data/types";

type FetchDataProps<T extends "clothes" | "colors" | "weather"> =
  T extends "clothes"
    ? ClothesProps
    : T extends "colors"
    ? CombineColorsProps
    : WeatherProps;

interface FetchState<T> {
  data: T[] | undefined;
  loading: boolean;
  error: Error | null;
}

export const useFetch = <T extends "clothes" | "colors" | "weather">(
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

    const url =
      product === "clothes"
        ? "/garmentData.json"
        : product === "colors"
        ? "/combineColors.json"
        : "/weather.json"; // New API

    fetch(url, { signal })
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
