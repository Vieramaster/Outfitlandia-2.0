interface StandardButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: "outfitButton" | "geoLocation";
  isEnabled: boolean;
}

const classStyle = {
  outfitButton: "w-1/2 h-full",
  geoLocation: "size-full md:size-14 lg:size-16  ",
};

const isActive =
  "cursor-pointer hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]";

const isNotActive = "cursor-not-allowed bg-transparent border border-b-[0px]";

export const StandardButton = ({
  variant,
  isEnabled = true,
  children,
  ...props
}: StandardButtonProps) => (
  <button
    disabled={!isEnabled}
    className={`
    ${classStyle[variant]}
    ${isEnabled ? isActive : isNotActive}
    bg-detail 
    border-detail-active border-b-[4px]
    rounded-lg 
    px-4
    transition-all  
    duration-200
    flex
    justify-center
    items-center
`}
    {...props}
  >
    {children}
  </button>
);
