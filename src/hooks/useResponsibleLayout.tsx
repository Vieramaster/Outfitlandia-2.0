import { useState, useEffect } from "react";

interface ResponsiveLayoutResult {
  /** True when viewport width is below the mobile breakpoint */
  isMobile: boolean;
}

/**
 * Custom React hook to track whether the current viewport matches a mobile layout.
 *
 * Listens for window resize events and updates `isMobile` whenever
 * the viewport width crosses the defined MOBILE_BREAKPOINT.
 *
 * @returns An object with:
 *   - `isMobile`: boolean flag, true if window.innerWidth < MOBILE_BREAKPOINT

/** Default breakpoint (in pixels) below which we consider the layout “mobile” */
const MOBILE_BREAKPOINT = 1024;

export const useResponsiveLayout = (): ResponsiveLayoutResult => {
  const [isMobile, setIsMobile] = useState(() => {
    // initialize lazily, avoids SSR window errors
    return (
      typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT
    );
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    window.addEventListener("resize", handleResize);
    // run once in case initial render happened before effect
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isMobile };
};
