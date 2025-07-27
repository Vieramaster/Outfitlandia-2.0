interface WeatherCardProps {
  children: React.ReactNode;
  column?: boolean;
}

export const WeatherCard = ({ column = false, children }: WeatherCardProps) => (
  <li
    className={` bg-background rounded-lg overflow-hidden flex items-center justify-center  h-12 w-16 md:h-14 md:w-20 lg:h-16 lg:w-28 border border-detail  select-none
      ${column ? "flex-col" : "flex-row"}`}
  >
    {children}
  </li>
);
