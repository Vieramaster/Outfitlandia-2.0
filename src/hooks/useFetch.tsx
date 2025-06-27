import { useEffect, useState, useMemo } from "react";

type FetchType = {
  data: unknown;
  loading: boolean;
  error: Error | null;
};

export const useFetch = (URL: string | null): FetchType => {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!URL) return;

    const controller = new AbortController();
    const signal = controller.signal;

    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(URL, { signal });
        if (!response.ok)
          throw new Error(`${response.status} ${response.statusText}`);

        const jsonData = await response.json();
        if (isMounted) setData(jsonData);
      } catch (err) {
        if ((err as any).name !== "AbortError" && isMounted) {
          setError(err as Error);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [URL]);

  return useMemo(() => ({ data, loading, error }), [data, loading, error]);
};
