import { PropsWithChildren } from "react";

type WeatherSectionContainerProps = PropsWithChildren<{}>;

export const WeatherSectionContainer = ({
  children,
}: WeatherSectionContainerProps) => (
  <section
    role="region"
    aria-label="Weather information section"
    className="bg-violet-600 w-full flex gap-5 justify-center items-center h-22 lg:w-1/12 lg:h-full lg:flex-col"
  >
    {children}
  </section>
);
