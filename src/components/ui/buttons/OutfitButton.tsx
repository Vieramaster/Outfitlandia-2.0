export const OutfitButton = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className="bg-violet-800 w-1/2 h-full rounded-xl " {...props}>
    {children}
  </button>
);
