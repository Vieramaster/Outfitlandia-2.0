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

enum ERROR_MESSAGE {
  BROWSER_SECURITY = "We couldn't access your location. You may have denied the permission request, or your browser might have a high privacy/security level that blocks geolocation features. Please check your browser's settings and allow location access.",
  DENIED_LOCATION = "You denied location access. Please enable it in your browser settings.",
}

/** Fallback coordinates if the user hasn’t granted geolocation yet */
const DEFAULT_COORDINATES: Coordinates = {
  latitude: -64.233,
  longitude: -56.633,
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
      const msg = "Geolocation is not supported by your browser.";
      setError(msg);
      alert(msg);
      return;
    }

    setLoading(true);

    let didRespond = false;

    const timeout = setTimeout(() => {
      if (!didRespond) {
        const msg = ERROR_MESSAGE.BROWSER_SECURITY;
        setError(msg);
        alert(msg);
        setLoading(false);
      }
    }, 4000); // 4 segundos de espera

    navigator.geolocation.getCurrentPosition(
      (position) => {
        didRespond = true;
        clearTimeout(timeout);
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setError(null);
        setLoading(false);
      },
      (positionError) => {
        didRespond = true;
        clearTimeout(timeout);
        const msg =
          positionError.code === positionError.PERMISSION_DENIED
            ? ERROR_MESSAGE.DENIED_LOCATION
            : ERROR_MESSAGE.BROWSER_SECURITY;
        setError(msg);
        alert(msg);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
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
