interface WindCardProps {
  children: React.ReactNode;
  size: "icon" | "speed";
}

const cardHeight = {
  icon: "h-3/5",
  speed: "h-2/5",
};
export const WindCard = ({ size, children }: WindCardProps) => (
  <div
    className={`${cardHeight[size]} w-full  flex justify-center items-center`}
  >
    {children}
  </div>
);
