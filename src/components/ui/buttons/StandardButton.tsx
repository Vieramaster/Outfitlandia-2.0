interface StandardButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: "outfitButton" | "geoLocation";
}

const classStyle = {
  outfitButton: "w-1/2 h-full",
  geoLocation: "size-full",
};

export const StandardButton = ({
  variant,
  children,
  ...props
}: StandardButtonProps) => (
  <button
    className={`
    ${classStyle[variant]}
    bg-detail 
    border-detail-active border-b-[4px]
    rounded-lg cursor-pointer 
    px-4
    transition-all  
    hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
    active:border-b-[2px] active:brightness-90 active:translate-y-[2px]`}
    {...props}
  >
    {children}
  </button>
);
