import { ReactNode } from "react";

export const WeatherStatsContainer = ({ children }: { children: ReactNode }) => (
  <div className="size-14 lg:size-18 2xl:size-22 bg-amber-400 flex items-center justify-center">
    {children}
  </div>
);
