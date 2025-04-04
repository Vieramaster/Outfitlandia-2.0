export const GeolocationButton = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"button">) => {
  return (
    <button
      className="size-14 lg:size-18 2xl:size-22 bg-amber-400 grid place-items-center"
      {...props}
    >
      {children}
    </button>
  );
};
