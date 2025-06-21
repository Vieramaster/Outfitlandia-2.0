interface SmallCardProps {
  children: React.ReactNode;
  arial?: string;
  container: boolean;
}
export const SmallCard = ({
  arial,
  container = false,
  children,
}: SmallCardProps) => (
  <div
    className={`${
      container ? "border border-line" : ""
    }w-full h-1/2 flex gap-2 place-content-center items-center`}
    aria-label={arial}
  >
    {children}
  </div>
);
