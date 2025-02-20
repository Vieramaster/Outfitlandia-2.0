import { useEffect, useState } from "react";
import { Product } from "../data/types";

export const useFetch = (
  product: "clothes" | "colors",
  garment: "top" | "coat" | "pants" | undefined
) => {
  const [data, setData] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!garment) return;
    
    const controller = new AbortController();
    const { signal } = controller;
    setLoading(true);

    const url =
      product === "clothes" ? "/garmentData.json" : "/combineColors.json";

    fetch(url, { signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        return response.json();
      })
      .then((jsonData) => {
        if (garment !== undefined) {
          const filteredData = jsonData.filter(
            (item: Product) => item.garment === garment
          );
          setData(filteredData);
        } else setData(jsonData);
      })
      .catch((error) => {
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
  }, [product, garment]);

  return { data, loading, error };
};
