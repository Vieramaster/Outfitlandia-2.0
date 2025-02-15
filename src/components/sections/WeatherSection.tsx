interface Weather {
  isHidden: boolean;
}

export const WeatherSection = ({ isHidden }: Weather) => {
  return (
    <section
      className={`${
        isHidden ? "hidden" : "block"
      }order-3 w-screen h-32 lg:w-32 lg:h-screen lg:order-2 bg-orange-800`}
    ></section>
  );
};
