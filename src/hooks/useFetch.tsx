import { useEffect, useState, useMemo } from "react";

type FetchType = {
  data: unknown;
  loading: boolean;
  error: Error | null;
};

export const useFetch = (URL: string | null): FetchType => {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!URL) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
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

    fetchData();

    return () => {
      controller.abort();
    };
  }, [URL]);

  return useMemo(() => ({ data, loading, error }), [data, loading, error]);
};


