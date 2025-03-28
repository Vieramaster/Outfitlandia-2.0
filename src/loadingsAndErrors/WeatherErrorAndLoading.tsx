import { WeatherStatsContainer } from "../components/containers/WeatherStatsContainer";

interface WeatherErrorAndLoadingProps {
  children: React.ReactNode;
  count?: number;
  label: string;
}

export const WeatherErrorAndLoading = ({
  children,
  count = 3,
  label,
}: WeatherErrorAndLoadingProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <WeatherStatsContainer key={index} label={label}>
          <div className="text-red-500">{children}</div>
        </WeatherStatsContainer>
      ))}
    </>
  );
};
