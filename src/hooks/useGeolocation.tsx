// hooks/useGeolocation.ts
import { useState, useCallback } from "react";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface UseGeolocationResult {
  coordinates: Coordinates | null;
  error: string | null;
  getCurrentPosition: () => void;
}

export const useGeolocation = (): UseGeolocationResult => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getCurrentPosition = useCallback((): void => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ latitude, longitude });
        setError(null);
      },
      (error: GeolocationPositionError) => setError(error.message)
    );
  }, []);

  return { coordinates, error, getCurrentPosition };
};
