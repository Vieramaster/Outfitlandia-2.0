interface WeatherCardProps {
  children: React.ReactNode;
}

export const WeatherCard = ({ children }: WeatherCardProps) => (
  <li className="bg-background rounded-lg h-12 w-16 md:h-14 md:w-20 lg:h-14 lg:w-28 border border-detail">
    {children}
  </li>
);
