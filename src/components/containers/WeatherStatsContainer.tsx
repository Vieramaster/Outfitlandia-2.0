import { ReactNode } from "react";

interface WeatherStatsContainerProps {
  children: ReactNode;
  label: string;
}
export const WeatherStatsContainer = ({
  label,
  children,
}: WeatherStatsContainerProps) => (
  <div
    className="size-14 lg:size-18 2xl:size-22 bg-amber-400 flex flex-col gap-2 items-center justify-center"
    aria-label={label}
  >
    {children}
  </div>
);
