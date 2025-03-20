import { useEffect, useState, useMemo } from "react";

export const useFetch = <T,>(URL: string) => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!URL) return;
    const controller = new AbortController();
    const { signal } = controller;
    setLoading(true);

    fetch(URL, { signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("data not found");
        }
        return response.json();
      })
      .then((jsonData: T) => {
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
  }, [URL]);

  return useMemo(
    () => ({ data, loading, error } as const),
    [data, error, loading]
  );
};
