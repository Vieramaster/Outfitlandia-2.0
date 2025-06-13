import { ReactNode } from "react";

interface WeatherStatsContainerProps {
  label: string;
  children: ReactNode;
}

export const WeatherStatsContainer = ({
  label,
  children,
}: WeatherStatsContainerProps) => (
  <div
    aria-label={label}
    className="size-14 lg:size-18 2xl:size-22 bg-amber-400 flex flex-col gap-2 items-center justify-center"
  >
    {children}
  </div>
);
