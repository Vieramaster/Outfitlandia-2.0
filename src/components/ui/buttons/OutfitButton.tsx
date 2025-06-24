interface OutfitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const OutfitButton = ({ children, ...props }: OutfitButtonProps) => (
  <button className=" bg-detail w-1/2 h-full rounded-lg" {...props}>
    {children}
  </button>
);
