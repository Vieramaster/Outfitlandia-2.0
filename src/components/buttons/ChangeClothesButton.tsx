export const ChangeClothesButton = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"button">) => {
  return (
    <button
      className={` bg-green-800 active:bg-yellow-200  w-1/2 h-full  cursor-pointer `}
      {...props}
    >
      {children}
    </button>
  );
};
