import { ReactNode } from "react";

export const WeatherSectionContainer = ({
  children,
}: {
  children: ReactNode;
}) => (
  <section className="bg-violet-600 w-full flex gap-5 justify-center items-center h-22 lg:w-1/12 lg:h-full lg:flex-col">
    {children}
  </section>
);
