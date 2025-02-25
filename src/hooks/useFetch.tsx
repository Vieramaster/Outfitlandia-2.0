import { useEffect, useState } from "react";
import { productProps } from "../data/types";

export const UseFetch = (
  product: "clothes" | "colors",
  garment: "top" | "coat" | "pants" | null
) => {
  const [data, setData] = useState<productProps[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!product) return; 
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
        if (product === "clothes" && garment) {
          setData(
            jsonData.filter((item: productProps) => item.garment === garment)
          );
        } else {
          setData(jsonData);
        }
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
