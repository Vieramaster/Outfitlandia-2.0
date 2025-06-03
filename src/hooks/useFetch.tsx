import { useEffect, useState, useMemo } from "react";

export const useFetch = (URL: string | null) => {
  const [data, setData] = useState<unknown>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  if (!URL) return;
  const controller = new AbortController();
  const signal = controller.signal;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(URL, { signal });
      if (!response.ok) {
        throw new Error(
          `Fetch error: ${response.status} ${response.statusText}`
        );
      }
      const jsonData: unknown = await response.json();
      setData(jsonData);
    } catch (err) {
      if ((err as any).name !== "AbortError") {
        setError(err as Error);
      }
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();

    return () => {
      controller.abort();
    };
  }, [URL]);

  return useMemo(
    () => ({ data, loading, error } as const),
    [data, loading, error]
  );
};
