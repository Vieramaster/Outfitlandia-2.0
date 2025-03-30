// hooks/useGeolocation.ts
import { useState, useCallback } from "react";

interface Coordinates {
  latitude: number;
  longitude: number;
}
interface UseGeolocationResult {
  coordinates: Coordinates;
  error: string | null;
  loading: boolean;
  getCurrentPosition: () => void;
}
const DEFAULT_COORDINATES = {
  latitude: -35.96667,
  longitude: -62.7,
};

export const useGeolocation = (): UseGeolocationResult => {
  const [coordinates, setCoordinates] =
    useState<Coordinates>(DEFAULT_COORDINATES);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getCurrentPosition = useCallback((): void => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }: GeolocationPosition) => {
        setCoordinates({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
        setError(null);
      },
      (error: GeolocationPositionError) => setError(error.message)
    );
    setLoading(false);
  }, []);

  return { coordinates, error, loading, getCurrentPosition };
};
