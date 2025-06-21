export const OutfitButton = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className="

        bg-detail 
        w-1/2 h-full 
        rounded-lg "
    {...props}
  >
    {children}
  </button>
);
