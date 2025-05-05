// hooks/useGeolocation.ts
import { useState, useCallback } from "react";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface GeolocationResult {
  /** The last known coordinates, or defaults if none fetched yet */
  coordinates: Coordinates;
  /** Any error message from the geolocation API, or null if no error */
  error: string | null;
  /** True while a position request is in progress */
  loading: boolean;
  /** Trigger a new geolocation lookup */
  getCurrentPosition: () => void;
}

/** Fallback coordinates if the user hasn’t granted geolocation yet */
const DEFAULT_COORDINATES: Coordinates = {
  latitude: -35.96667,
  longitude: -62.7,
};

/**
 * Custom React hook for accessing the browser’s geolocation API.
 *
 * @returns An object with:
 *   - `coordinates`: the current or default lat/lng
 *   - `error`: any error message encountered
 *   - `loading`: whether a lookup is in progress
 *   - `getCurrentPosition`: function to re‑fetch the position
 */
export const useGeolocation = (): GeolocationResult => {
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
      (position: GeolocationPosition) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setError(null);
        setLoading(false);
      },
      (positionError: GeolocationPositionError) => {
        setError(positionError.message);
        setLoading(false);
      }
    );
  }, []);

  return {
    coordinates,
    error,
    loading,
    getCurrentPosition,
  };
};
