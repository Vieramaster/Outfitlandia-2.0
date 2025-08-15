import { WeatherCard } from "../ui/cards/WeatherCard";

interface LoadingAndErrorFooterProps {
  component: React.ReactNode;
}
export const LoadingAndErrorFooter = ({
  component,
}: LoadingAndErrorFooterProps) => (
  <>
    {Array.from({ length: 3 }, (_, index) => (
      <WeatherCard key={index} description="loading">
        {component}
      </WeatherCard>
    ))}
  </>
);
